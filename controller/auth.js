'use strict';

import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';


// TODO: Make it secure!
const jwtSecureKey     ='bt@V&fn4WC^GJSPZ8vmquP^VTZPmWM3Q';
const jwtExpiresInDay  = '2d';
const bcryptSaltRounds = 12;

/**
 * User(사용자) 정보 등록
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export async function createUser(req, res, next) {
  console.log('=========================================================================');

  const { username, password, name, email, image } = req.body;

  // 이미 등록된 User가 있는지 확인
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists`});
  }
  
  // 비밀번호 암호화
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  console.log(`hashed:[${hashed}]`);

  // 사용자 등록 - 암호화 비밀번호 적용
  const userId = await userRepository.createUser(username, hashed, name, email, image);
  console.log('userId:', userId);

  const token = createJwtToken(userId)
  res.status(200).json({token, username});
}

/**
 * Login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export async function login(req, res, next) {
  console.log('=========================================================================');
  
  const { username, password } = req.body;

  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password.'});
  }

  const isValid = await bcrypt.compare(password, user.password);
  console.log(`password: [${password}], isValid:[${isValid}]`);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid user or password.'});
  }

  const token = createJwtToken(user.id)
  res.status(200).json({token, username});
}

/**
 * me의 username 조회
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export async function me(req, res, next) {
  console.log('=========================================================================');

  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

/**
 * Token 생성
 * @param {*} id 
 * @returns 
 */
function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecureKey, { expiresIn: jwtExpiresInDay });
}