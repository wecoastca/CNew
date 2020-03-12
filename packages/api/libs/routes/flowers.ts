import * as express from 'express';
import Flower from '../model/flower';
import logger from '../log';

export const router = express.Router();

router.get('/',(req: express.Request, res: express.Response)=>{
    Flower.find((err, docs)=>{
        if(!err){
            return res.json(docs);
        }
        else{
            res.statusCode = 500;
            logger.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Internal server Error',
                status : res.statusCode
            })
        }
    })
})

router.post('/', (req:express.Request, res:express.Response) => {
    let flower = new Flower({
        id: req.params.id,
        name: req.params.name,
        source: req.params.source
    });

    flower.save((err)=>{
        if(!err){
            logger.info('New flower was created with id: %n', flower.id);
            return res.json(
                {
                    status: 'OK',
                    flower: flower
                }
            );
        }
        else{
            res.statusCode = 500;
            logger.error('Internal program error (%d): %s',res.statusCode,err.message);

            res.json({
                error: 'Internal server error'
            })

        }
    })
})

router.get('/:id', (req:express.Request, res: express.Response)=>{
    Flower.findById(req.params.id,(err,docs)=>{

        if(!docs){
            res.statusCode = 404;
            logger.error('%d: flower was not found in mongo', res.statusCode);
            return res.json({
                error: 'Not Found',
                status: res.statusCode
            })
        }

        if(!err){
            return res.json({
                status: 'Ok',
                flower: docs
            });
        }
        else{
            res.statusCode = 500;
            logger.error('Internal program error (%d): %s',res.statusCode,err.message);

            return res.json({
                error: err.message,
                status: res.statusCode
            })
        }
    })
})

router.put('/:id', (req:express.Request, res: express.Response) => {
    Flower.findByIdAndUpdate(req.params.id,{name:req.params.name, source: req.params.source}, (err, docs)=>{
        if(!docs){
            res.statusCode = 404;
            logger.error('%d: flower was not found in mongo', res.statusCode);
            return res.json({
                error: 'Not Found',
                status: res.statusCode
            })
        }

        docs.save((err)=>{
            if(!err){
                logger.info('Flower with id -  %n - was updated', docs.id);
                return res.json(
                    {
                        status: 'OK',
                        flower: docs
                    }
                );
            }
            else{
                res.statusCode = 500;
                logger.error('Internal program error (%d): %s',res.statusCode,err.message);
    
                res.json({
                    error: 'Internal server error'
                })
    
            }
        })
    })
})

router.delete('/:id', (req:express.Request, res: express.Response)=>{
    Flower.findByIdAndDelete(req.params.id, (err, docs)=>{
        if(!docs){
            res.statusCode = 404;
            logger.error('%d: flower was not found in mongo', res.statusCode);
            return res.json({
                error: 'Not Found',
                status: res.statusCode
            })
        }
        //NOTE: возможно недостаточно вызывать метод findByIdAndDelete и нужно будет сделать docs.save

        if(!err){
            return res.json({
                status: 'Ok',
                flower: docs
            });
        }
        else{
            res.statusCode = 500;
            logger.error('Internal program error (%d): %s',res.statusCode,err.message);

            return res.json({
                error: err.message,
                status: res.statusCode
            })
        }
    })
})

