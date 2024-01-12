import express from 'express';
import 'express-async-errors';
import * as expVaildator    from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import * as tweetValidator  from '../middleware/validator.js'
import * as jwtVerify       from '../middleware/auth.js';

const router = express.Router();

// 유효성 검사 - INSERT ( validator && Sanitization)
const vaildateTweetInsert = [
  expVaildator.body('text')
    .trim()
    .isLength({min: 3})
    .withMessage('text should be at least 3 characters !!'),
    tweetValidator.validator,
];

// 유효성 검사 - UPDATE( validator && Sanitization)
const vaildateTweetUpdate = [
  expVaildator.body('text')
    .trim()
    .isLength({min: 3})
    .withMessage('text should be at least 3 characters !!'),
    tweetValidator.validator,
];

// GET /tweets 또는 GET /tweets?username=:username
router.get('/', jwtVerify.isAuth, tweetController.getTweets);

//GET /tweets/:id
router.get('/:id', jwtVerify.isAuth, tweetController.getTweet);

// POST /tweets
router.post('/', jwtVerify.isAuth, vaildateTweetInsert, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', jwtVerify.isAuth, vaildateTweetUpdate, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', jwtVerify.isAuth, tweetController.removeTweet);


export default router;