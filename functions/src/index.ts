import * as functions from 'firebase-functions';
import * as express from 'express';
import  { addTravel } from './TravelController';

const app = express();

app.get('/', (req, res) => res.status(200).send('Hey there!'));
app.post('/travel', addTravel)

exports.app = functions.https.onRequest(app);
