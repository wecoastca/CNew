import express from 'express';
import bodyParser  from 'body-parser';
import logger from 'morgan';

const PORT = 8080;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(logger('dev'));

app.use(app.router);

app.get('/api/v1/', (req:express.Request, res:express.Response) => res.json({message: 'Entry in api'}));

app.get('/api/v1/flowers',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.get('/api/v1/flowers/:id',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.post('/api/v1/flowers/:id',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.put('/api/v1/flowers/:id',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.delete('/api/v1/flowers',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.get('/api/v1/bouqutes',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.get('/api/v1/bouqutes/:id',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.post('/api/v1/bouqutes/:id',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.delete('/api/v1/bouqutes/:id',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.get('/api/v1/users/',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.get('/api/v1/users/:id',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.post('/api/v1/users/:id',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.put('/api/v1/users/:id',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.delete('/api/v1/users/:id',(req:express.Request, res:express.Response) => res.send('Not implemented'));

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
