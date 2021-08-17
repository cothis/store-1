/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */
const charsLength = 52;

/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
const getAlphabeticChar = (code: number) => String.fromCharCode(code + (code > 25 ? 39 : 97));

/* input a number, usually a hash and convert it to base-52 */
function makeHashNameGenerator() {
  let sequence = 1;

  return function () {
    let name = '';
    let x;

    const code = sequence << 27;
    sequence++;

    /* get a char and divide by alphabet-length */
    for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
      name = getAlphabeticChar(x % charsLength) + name;
    }

    return name;
  };
}

export const generatorHashName = makeHashNameGenerator();
