interface seeds {
  'xoroshiro64+': [ number, number ];
  'xoroshiro64**': [ number, number ];
  'xoroshiro64*': [ number, number ];
  'xoshiro128+': [ number, number, number, number ];
  'xoshiro128**': [ number, number, number, number ];
  'sfc32': [ number, number, number, number ];
  'gjrand32': [ number, number, number, number ];
  'jsf32': [ number, number, number, number ];
  'jsf32b': [ number, number, number, number ];
  'tyche': [ number, number, number, number ];
  'tychei': [ number, number, number, number ];
  'xorshift128': [ number, number, number, number ];
  'xorshift32': [ number ];
  'lcg_v1': [ number ];
  'lcg_v2': [ number ];
  'mulberry32': [ number ];
  'splitmix32': [ number ];
}

type algorithm = (
  [ 'xoroshiro64+', ...seeds['xoroshiro64+'] ] |
  [ 'xoroshiro64**', ...seeds['xoroshiro64**'] ] |
  [ 'xoroshiro64*', ...seeds['xoroshiro64*'] ] |
  [ 'xoshiro128+', ...seeds['xoshiro128+'] ] |
  [ 'xoshiro128**', ...seeds['xoshiro128**'] ] |
  [ 'sfc32', ...seeds['xoshiro128**'] ] |
  [ 'gjrand32', ...seeds['gjrand32'] ] |
  [ 'jsf32', ...seeds['jsf32'] ] |
  [ 'jsf32b', ...seeds['jsf32b'] ] |
  [ 'tyche', ...seeds['tyche'] ] |
  [ 'tychei', ...seeds['tychei'] ] |
  [ 'xorshift128', ...seeds['xorshift128'] ] |
  [ 'xorshift32', ...seeds['xorshift32'] ] |
  [ 'lcg_v1', ...seeds['lcg_v1'] ] |
  [ 'lcg_v2', ...seeds['lcg_v2'] ] |
  [ 'mulberry32', ...seeds['mulberry32'] ] |
  [ 'splitmix32', ...seeds['splitmix32'] ]
);

export class PRNG {
  public static createGenerator(...args: algorithm): Generator<number> {
    return PRNG.generators[args.shift()](args);
  }

  public static createCallback(...args: algorithm): () => number {
    const generator = PRNG.generators[args.shift()](args);
    return () => generator.next().value;
  }

  private static generators = {
    ['xoroshiro64+']: function * (seeds: seeds['xoroshiro64+']): Generator<number> {
      let [ a, b ]: seeds['xoroshiro64+'] = seeds;

      while (true) {
        var r = a + b;
        b = b ^ a; a = b ^ (a << 26 | a >>> 6) ^ b << 9;
        b = b << 13 | b >>> 19;
        yield (r >>> 0) / 4294967296;
      }
    },
    ['xoroshiro64**']: function * (seeds: seeds['xoroshiro64**']): Generator<number> {
      let [ a, b ]: seeds['xoroshiro64**'] = seeds;

      while (true) {
        var r = Math.imul(a, 0x9E3779BB); r = (r << 5 | r >>> 27) * 5;
        b = b ^ a; a = b ^ (a << 26 | a >>> 6) ^ b << 9;
        b = b << 13 | b >>> 19;
        yield (r >>> 0) / 4294967296;
      }
    },
    ['xoroshiro64*']: function * (seeds: seeds['xoroshiro64*']): Generator<number> {
      let [ a, b ]: seeds['xoroshiro64*'] = seeds;

      while (true) {
        var r = Math.imul(a, 0x9E3779BB);
        b = b ^ a; a = b ^ (a << 26 | a >>> 6) ^ b << 9;
        b = b << 13 | b >>> 19;
        yield (r >>> 0) / 4294967296;
      }
    },
    ['xoshiro128+']: function * (seeds: seeds['xoshiro128+']): Generator<number> {
      let [ a, b, c, d ]: seeds['xoshiro128+'] = seeds;

      while (true) {
        var t = b << 9, r = a + d;
        c = c ^ a; d = d ^ b; b = b ^ c; a = a ^ d; c = c ^ t;
        d = d << 11 | d >>> 21;
        yield (r >>> 0) / 4294967296;
      }
    },
    ['xoshiro128**']: function * (seeds: seeds['xoshiro128**']): Generator<number> {
      let [ a, b, c, d ]: seeds['xoshiro128**'] = seeds;

      while (true) {
        var t = b << 9, r = a * 5; r = (r << 7 | r >>> 25) * 9;
        c = c ^ a; d = d ^ b; b = b ^ c; a = a ^ d; c = c ^ t;
        d = d << 11 | d >>> 21;
        yield (r >>> 0) / 4294967296;
      }
    },
    ['sfc32']: function * (seeds: seeds['sfc32']): Generator<number> {
      let [ a, b, c, d ]: seeds['sfc32'] = seeds;

      while (true) {
        a |= 0; b |= 0; c |= 0; d |= 0; 
        var t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = c << 21 | c >>> 11;
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
      }
    },
    ['gjrand32']: function * (seeds: seeds['gjrand32']): Generator<number> {
      let [ a, b, c, d ]: seeds['gjrand32'] = seeds;

      while (true) {
        a |= 0; b |= 0; c |= 0; d |= 0;
        a = a << 16 | a >>> 16;
        b = b + c | 0;
        a = a + b | 0;
        c = c ^ b;
        c = c << 11 | c >>> 21;
        b = b ^ a;
        a = a + c | 0;
        b = c << 19 | c >>> 13;
        c = c + a | 0;
        d = d + 0x96a5 | 0;
        b = b + d | 0;
        yield (a >>> 0) / 4294967296;
      }
    },
    ['jsf32']: function * (seeds: seeds['jsf32']): Generator<number> {
      let [ a, b, c, d ]: seeds['jsf32'] = seeds;

      while (true) {
        a |= 0; b |= 0; c |= 0; d |= 0;
        var t = a - (b << 27 | b >>> 5) | 0;
        a = b ^ (c << 17 | c >>> 15);
        b = c + d | 0;
        c = d + t | 0;
        d = a + t | 0;
        yield (d >>> 0) / 4294967296;
      }
    },
    ['jsf32b']: function * (seeds: seeds['jsf32b']): Generator<number> {
      let [ a, b, c, d ]: seeds['jsf32b'] = seeds;

      while (true) {
        a |= 0; b |= 0; c |= 0; d |= 0;
        var t = a - (b << 23 | b >>> 9) | 0;
        a = b ^ (c << 16 | c >>> 16) | 0;
        b = c + (d << 11 | d >>> 21) | 0;
        b = c + d | 0;
        c = d + t | 0;
        d = a + t | 0;
        yield (d >>> 0) / 4294967296;
      }
    },
    ['tyche']: function * (seeds: seeds['tyche']): Generator<number> {
      let [ a, b, c, d ]: seeds['tyche'] = seeds;

      while (true) {
        a |= 0; b |= 0; c |= 0; d |= 0;
        a = a + b | 0; d = d ^ a; d = d << 16 | d >>> 16;
        c = c + d | 0; b = b ^ c; b = b << 12 | b >>> 20;
        a = a + b | 0; d = d ^ a; d = d << 8  | d >>> 24;
        c = c + d | 0; b = b ^ c; b = b << 7  | b >>> 25;
        yield (b >>> 0) / 4294967296;
      }
    },
    ['tychei']: function * (seeds: seeds['tychei']): Generator<number> {
      let [ a, b, c, d ]: seeds['tychei'] = seeds;

      while (true) {
        a |= 0; b |= 0; c |= 0; d |= 0;
        b = (b << 25 | b >>> 7)  ^ c; c = c - d | 0;
        d = (d << 24 | d >>> 8)  ^ a; a = a - b | 0;
        b = (b << 20 | b >>> 12) ^ c; c = c - d | 0;
        d = (d << 16 | d >>> 16) ^ a; a = a - b | 0;
        yield (a >>> 0) / 4294967296;
      }
    },
    ['xorshift128']: function * (seeds: seeds['xorshift128']): Generator<number> {
      let [ a, b, c, d ]: seeds['xorshift128'] = seeds;

      while (true) {
        var t = a ^ a << 11;
        a = b, b = c, c = d;
        d = (d ^ d >>> 19) ^ (t ^ t >>> 8);
        yield (d >>> 0) / 4294967296;
      }
    },
    ['xorshift32']: function * (seeds: seeds['xorshift32']): Generator<number> {
      let [ a ]: seeds['xorshift32'] = seeds;

      while (true) {
        a ^= a << 13; a ^= a >>> 17; a ^= a << 5;
        yield (a >>> 0) / 4294967296;
      }
    },
    ['lcg_v1']: function * (seeds: seeds['lcg_v1']): Generator<number> {
      let [ a ]: seeds['lcg_v1'] = seeds;

      while (true) {
        yield a = a * 48271 % 2147483647;
      }
    },
    ['lcg_v2']: function * (seeds: seeds['lcg_v2']): Generator<number> {
      let [ a ]: seeds['lcg_v2'] = seeds;

      while (true) {
        a = Math.imul(48271, a) | 0 % 2147483647;
        yield (a & 2147483647) / 2147483648;
      }
    },
    ['mulberry32']: function * (seeds: seeds['mulberry32']): Generator<number> {
      let [ a ]: seeds['mulberry32'] = seeds;

      while (true) {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        var t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        yield ((t ^ t >>> 14) >>> 0) / 4294967296;
      }
    },
    ['splitmix32']: function * (seeds: seeds['splitmix32']): Generator<number> {
      let [ a ]: seeds['splitmix32'] = seeds;

      while (true) {
        a |= 0; a = a + 0x9e3779b9 | 0;
        var t = a ^ a >>> 15; t = Math.imul(t, 0x85ebca6b);
        t = t ^ t >>> 13; t = Math.imul(t, 0xc2b2ae35);
        yield ((t = t ^ t >>> 16) >>> 0) / 4294967296;
      }
    }
  }
}
