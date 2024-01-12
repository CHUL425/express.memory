import express from 'express';
import cors    from 'cors'   ;
import morgan  from 'morgan' ;
import helmet  from 'helmet' ;
import 'express-async-errors';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';

const app = express();

app.use(express.json());
app.use(helmet()      );
app.use(cors()        );
app.use(morgan('tiny'));

// Router
app.use('/tweets', tweetsRouter);
app.use('/auth'  , authRouter  );

// Not Found.
app.use((req, res) => {
  console.log('Not Found !!!');
  res.sendStatus(404);
});

// Error 처리
app.use((error, req, res) => {
  console.log(error);
  res.sendStatus(500);
});

app.listen(8080);