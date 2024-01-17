'use strict';

import * as userRepository from './auth.js';

let tweets = [
  {
    id       : '1',
    text     : '드림코더분들 화이팅!',
    createdAt: new Date().toString(),
    userId   : '1000001',
  },
  {
    id       : '2',
    text     : '안뇽!',
    createdAt: new Date().toString(),
    userId   : '1000001',
  },
];

/**
 * 모든 Tweet 데이터를 조회하고, Tweet.userId에 해당하는 작성자 정보 포함 return
 */
export async function getAll() {
  const allTweets = tweets.map(async (tweet) => {
    const { username, name, photo } = await userRepository.getById(tweet.userId);
    return { ...tweet, username, name, photo};
  });
  //console.log('allTweets:', allTweets);

  return Promise.all(allTweets);
}

/**
 * 모든 Tweet 데이터중, username에 해당하는 tweets return
 */
export async function getAllByUsername(username) {
  console.log('getAllByUsername-username:', username);

  const userTweets = getAll().then ((tweets) => {
    return tweets.filter((tweet) => tweet.username === username);
  });
  console.log('userTweets:', userTweets);

  return userTweets;
}

/**
 * Tweet id에 해당하는 Tweet 데이터를 조회하고, Tweet.userId에 해당하는 작성자 정보 포함 return
 */
export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  console.log('found:', found);
  
  if (!found) return null;
  const {username, name, photo } = await userRepository.getById(found.userId);

  return { ...found, username, name, photo };
}

/**
 * Tweet 데이터를 기존 Tweets 앞에 추가해주고, 추가된 데이터를 다시 조회해서 return
 */
export async function create(text, userId) {
  const tweet = {
    id       : Date.now().toString(),
    text     : text                 ,
    createdAt: new Date().toString(),
    userId   : userId               ,
  };
  console.log('tweet:', tweet);

  //tweets.push(tweet);  // 뒤에 추가
  tweets = [tweet, ...tweets];  // 앞에 추가

  return getById(tweet.id);
}

/**
 * Tweet.id에 해당하는 tweet.text 수정후 결과 조회 return
 */
export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }

  return getById(tweet.id);
}

/**
 * Tweet.id에 해당하는 tweet데이터 삭제 return void
 */
export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}