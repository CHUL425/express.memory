import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR   = { massge: 'Authentication Error'};

// TODO: Make it secure!
const jwtSecureKey ='bt@V&fn4WC^GJSPZ8vmquP^VTZPmWM3Q';

/**
 * 로그인 사용자인지 확인 - Authentication
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const isAuth = async (req, res, next) => {
  console.log('=========================================================================');

  const authHeader = req.get('Authorization');
  // console.log(`authHeader: [${authHeader}]`);
  // console.log(`authHeader.startsWith('Bearer'): [${authHeader.startsWith('Bearer')}]`);

  if (!(authHeader && authHeader.startsWith('Bearer'))) {
    return res.status(401).json(AUTH_ERROR);
  }
  // console.log(`통과 1`);

  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    jwtSecureKey,
    async (error, decoded) => {
      // console.log(`jwt.verify error:[${error}]`);

      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      // console.log(`통과 2`);

      const user = await userRepository.findById(decoded.id)
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      // console.log(`통과 3`);

      req.userId = user.id; // req.customData

      // console.log(`통과 4`);
      next();
    }
  );
  
}