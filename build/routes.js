"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const stripeLoader = require('stripe');
const config_1 = require("./config");
const apiRouter = express.Router();
apiRouter.get('/api/hello', (req, res, next) => {
    res.json('world');
});
const stripe = new stripeLoader(config_1.STRIPE_PRIV_KEY);
const CURRENCY = 'eur';
const charge = (token, amount, chronoStampID) => {
    let new_amount = parseInt(amount) * 100;
    return stripe.charges.create({
        amount: new_amount,
        currency: CURRENCY,
        source: token,
        description: `Package One ordered. ${chronoStampID}`,
    });
};
apiRouter.post('/api/payment', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.chronoStampID);
    console.log(req.body.token);
    try {
        let data = yield charge(req.body.token.id, req.body.amount, req.body.chronoStampID);
        console.log(data);
        res.send('Charged');
    }
    catch (err) {
        console.log(`It was not possible to connect to Stripe. ${err}`);
        res.status(500);
    }
}));
exports.default = apiRouter;
