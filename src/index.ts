import * as path from 'path';
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

import apiRouter from './routes';
import { PORT } from './config';

const app = express();
// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use(apiRouter);

const port = PORT || 12844;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
