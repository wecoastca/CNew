import express from 'express';
import bodyParser  from 'body-parser';
import logger from 'morgan';
import mongoose from '../libs/db/db';

const PORT = 8080;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(logger('dev'));

app.route('/api/v1/')
  .get((req:express.Request, res:express.Response) => {
    res.json({message: 'Entry in api'})
  });

app.route('/api/v1/flowers')
  .get((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/flowers/:id')
  .get((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/flowers/:id')
  .post((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/flowers/:id')
  .delete((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

  app.route('/api/v1/bouqutes')
  .get((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/bouqutes/:id')
  .get((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/bouqutes/:id')
  .post((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/bouqutes/:id')
  .delete((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/users/')
  .get((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/users/:id')
  .get((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/users/:id')
  .post((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/users/:id')
  .put((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.route('/api/v1/users/:id')
  .delete((req:express.Request, res:express.Response) => {
    res.send('Not implemented')
  });

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
