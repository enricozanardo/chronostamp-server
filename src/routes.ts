const express = require('express');
const stripeLoader = require('stripe');

import { STRIPE_PRIV_KEY } from './config';

const apiRouter = express.Router();

apiRouter.get('/api/hello', (req: any, res: any, next: any) => {
  res.json('world');
});

const stripe = new stripeLoader(STRIPE_PRIV_KEY);
const CURRENCY = 'eur';

const charge = (token: string, amount: string, chronoStampID: string) => {
  let new_amount = parseInt(amount) * 100;

  return stripe.charges.create({
    amount: new_amount,
    currency: CURRENCY,
    source: token,
    description: `Package One ordered. ${chronoStampID}`,
  });
};

apiRouter.post('/api/payment', async (req: any, res: any, next: any) => {
  console.log(req.body.chronoStampID);
  console.log(req.body.token);

  try {
    let data = await charge(
      req.body.token.id,
      req.body.amount,
      req.body.chronoStampID
    );
    console.log(data);
    res.send('Charged');
  } catch (err) {
    console.log(`It was not possible to connect to Stripe. ${err}`);
    res.status(500);
  }
});

export default apiRouter;
