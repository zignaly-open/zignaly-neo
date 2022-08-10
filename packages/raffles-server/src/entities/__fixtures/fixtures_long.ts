import initDB from './init';

(async () => {
  await initDB('sample-data-long-expiry.json');
})();
