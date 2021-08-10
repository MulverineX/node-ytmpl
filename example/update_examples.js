const ytmpl = require('../');
const FS = require('fs');
const UTIL = require('util');

const main = async() => {
  let saveString;

  // Save playlist
  const search = await ytmpl('PL3dGPfkLzu7zHzMkfQNn8UvEHj_74G8vs', { limit: Infinity });
  saveString = UTIL.inspect(search, { depth: Infinity });
  FS.writeFileSync('./example_output.txt', saveString);
};
main();
