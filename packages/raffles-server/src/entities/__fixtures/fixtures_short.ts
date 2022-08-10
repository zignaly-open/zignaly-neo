import initDB from './init';

(async () => {
  await initDB('sample-data-short-expiry.json');
})();
