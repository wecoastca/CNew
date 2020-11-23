import * as express from 'express';
import User from '../model/user';
import db from '../db/db';
import logger from '../log';

const router = express.Router();

router.get('/info', (req: express.Request, res: express.Response) => {
    return res.send('NOT IMPLEMENTED');
});