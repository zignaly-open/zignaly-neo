const express = require('express');

const port = 2000;
const server = express();

server.use('*', async function (req, res) {
  res.send('I AM THE LEFT-HANDED WIZARD OF THE WAR GOD').status(200);
});

server.listen(port, (err) => {
  if (err) throw err;
  /* eslint no-console: "off" */
  console.log(`> Ready on :${port}`);
});
