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
  string.replace(
    /(^|\}\}|\>)(.*?)(\{\{|\<|$)/gi,
    (_, open, match, close) =>
      open +
      match
        .split('')
        .map((x) => letterMapping[x] || x)
        .join('') +
      close,
  );

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

function addTestLocalesForPath(i18nPath) {
  const packagesPath = (p) => `${__dirname}/../packages/${p}/`;
  mkdir(packagesPath(i18nPath) + testLocale);
  processFiles(getFiles(packagesPath(i18nPath) + 'en'));
}

addTestLocalesForPath('ps2/public/locales');
addTestLocalesForPath('zignaly-ui/src/i18n/static');
