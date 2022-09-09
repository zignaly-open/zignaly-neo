const fs = require('fs');
const path = require('path');

const testLocale = 'ch';

function getFiles(dir) {
  return fs.readdirSync(dir).map((x) => path.join(dir, x));
}

function recursivelyReplace(v) {
  if (typeof v === 'object') {
    return Object.keys(v).reduce(
      (memo, k) => ({ ...memo, [k]: recursivelyReplace(v[k]) }),
      {},
    );
  } else {
    return 'CH' + v;
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
