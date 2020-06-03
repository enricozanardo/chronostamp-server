import * as path from 'path';
const express = require('express');

import apiRouter from './routes';

const app = express();

app.use(express.json());
app.use(apiRouter);

const port = 8181;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
