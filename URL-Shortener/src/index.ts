require('dotenv').config();

import { URLController } from './controller/URLController';
import express, { Request, Response } from 'express';
import { MongoConnections } from './database/MongoConnections';

const api = express();
api.use(express.json());

const database = new MongoConnections();
database.connect();

const urlController = new URLController();
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);

api.listen(5000, () => console.log('Express Listening'));