import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Express } from 'express';

const init = (app:Express) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet()); 
    app.use(compression());
    if (app.get('env') === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('common'));
    }
}

export default init;