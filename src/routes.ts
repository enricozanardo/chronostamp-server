const express = require('express');
const stripeLoader = require('stripe');
const _ = require('lodash');

import { STRIPE_PRIV_KEY } from './config';

const apiRouter = express.Router();

enum Amount {
  'Package1' = '5.00',
  'Package2' = '10.00',
  'Package3' = '50.00',
}

export enum TabsType {
  wallet = 'WALLET',
  assets = 'ASSETS',
  search = 'SEARCH',
}

export type Profile = {
  chronoStampID: string;
  email: string;
  account: string;
  balance: number;
  fullName?: string;
  picture?: string;
  sub?: string;
  tab: TabsType;
};

const fakeUser: Profile = {
  chronoStampID: '',
  email: '',
  account: '',
  balance: 0,
  tab: TabsType.wallet,
};

apiRouter.get('/api/hello', (req: any, res: any, next: any) => {
  res.json(fakeUser);
});

apiRouter.post('/api/profile', (req: any, res: any, next: any) => {
  console.log(req.body);

  fakeUser.chronoStampID = req.body.chronoStampID;
  fakeUser.email = req.body.email;
  fakeUser.fullName = req.body.fullName;
  fakeUser.picture = req.body.picture;
  fakeUser.sub = req.body.sub;
  fakeUser.tab = req.body.tab;

  res.status(200).send(fakeUser);
  // res.json(fakeUser);
});

apiRouter.post('/api/account', (req: any, res: any, next: any) => {
  console.log(req.body);

  // TODO: based on the ID check and do the operations
  // fakeUser.chronoStampID = req.body.chronoStampID;

  if (fakeUser.account === '') {
    fakeUser.account = 'TBMXSZXAEK7X6JC4XB7R5Y4JGPWNBALTBTYV4KAK';
  }

  res.status(200).send(fakeUser);
});

apiRouter.post('/api/asset', async (req: any, res: any, next: any) => {
  try {
    if (!req.files) {
      return res.status(500).send({ msg: 'file is not found' });
    }
    // accessing the file
    let myFile = req.files.asset;
    let originalTitle = myFile.name;
    let size = myFile.size;
    console.log(originalTitle);
    console.log(size);

    await myFile.mv(`../uploaded/${originalTitle}`);

    // TODO: based on the ID check and do the operations
    // fakeUser.chronoStampID = req.body.chronoStampID;

    res.status(200).send(fakeUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.post('/api/update', (req: any, res: any, next: any) => {
  console.log(req.body);
  fakeUser.account = req.body.account;
  fakeUser.balance = req.body.balance;
  fakeUser.chronoStampID = req.body.chronoStampID;

  res.status(200).send(true);
});

const stripe = new stripeLoader(STRIPE_PRIV_KEY);
const CURRENCY = 'eur';

const charge = (token: string, amount: string, chronoStampID: string) => {
  let new_amount = parseInt(amount) * 100;

  return stripe.charges.create({
    amount: new_amount,
    currency: CURRENCY,
    source: token,
    description: `Package ordered. ${chronoStampID}`,
  });
};

apiRouter.post('/api/payment', async (req: any, res: any, next: any) => {
  console.log(req.body.chronoStampID);
  console.log(req.body.token);

  try {
    let data = await charge(
      req.body.token.id,
      req.body.amount,
      req.body.profile.chronoStampID
    );

    res.send('Charged');
  } catch (err) {
    console.log(`It was not possible to connect to Stripe. ${err}`);
    res.status(500);
  }
});

export default apiRouter;
