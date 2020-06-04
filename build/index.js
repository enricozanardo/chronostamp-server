"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(routes_1.default);
const port = config_1.PORT || 12844;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
