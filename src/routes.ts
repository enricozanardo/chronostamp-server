const express = require('express');
import * as stripeLoader from 'stripe';

const apiRouter = express.Router();

apiRouter.get('/api/hello', (req: any, res: any, next: any) => {
  res.json('world');
});

const stripe = apiRouter.post(
  '/api/payment',
  (req: any, res: any, next: any) => {
    try {
    } catch (err) {
      console.log(`It was not possible to connect to Stripe. ${err}`);
      res.status(500);
    }
  }
);

export default apiRouter;
