const fs = require('fs');
const path = require('path');

const testLocale = 'ch';

function getFiles(dir) {
  return fs.readdirSync(dir).map((x) => path.join(dir, x));
}

let letterMapping = {
  a: 'á',
  c: 'ĉ',
  d: 'ḋ',
  e: 'ë',
  f: 'ḟ',
  g: 'ĝ',
  h: 'ĥ',
  i: 'ï',
  m: 'ṁ',
  n: 'ń',
  o: 'ö',
  p: 'ṗ',
  q: '',
  r: 'ѓ',
  s: 'ŝ',
  t: 'ṫ',
  u: 'ü',
  z: 'ž',
};

letterMapping = {
  ...letterMapping,
  ...Object.fromEntries(
    Object.entries(letterMapping).map((x) =>
      x.map((x) => x.toLocaleUpperCase()),
    ),
  ),
};

const messWithString = (string) =>
  string
    .split('')
    .map((x) => letterMapping[x] || x)
    .join('');

function recursivelyReplace(v) {
  if (typeof v === 'object') {
    return Object.keys(v).reduce(
      (memo, k) => ({ ...memo, [k]: recursivelyReplace(v[k]) }),
      {},
    );
  } else {
    return 'CH-' + messWithString(v);
  }
}

function processFiles(files) {
  for (let f of files) {
    fs.writeFileSync(
      f.replace(/\/en\//, `/${testLocale}/`),
      JSON.stringify(
        recursivelyReplace(JSON.parse(fs.readFileSync(f).toString())),
        null,
        2,
      ),
    );
  }
}

function mkdir(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
}

(async () => {
  const packagesPath = (p) => `${__dirname}/../packages/${p}/public/locales/`;
  mkdir(packagesPath('ps2') + testLocale);
  mkdir(packagesPath('raffles-client') + testLocale);
  processFiles(getFiles(packagesPath('ps2') + 'en'));
  processFiles(getFiles(packagesPath('raffles-client') + 'en'));
})();
