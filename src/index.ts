import * as path from 'path';
const express = require('express');
const cors = require('cors');

import apiRouter from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(apiRouter);

const port = 8181;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
