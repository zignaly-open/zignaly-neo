import jwt from 'jsonwebtoken';
import { algorithm, secret } from '../../config';

export function getUserIdFromToken(jwtToken: string): null | number {
  let decodedToken: jwt.Jwt;

  try {
    decodedToken = jwt.decode(jwtToken, { complete: true });
  } catch (err) {
    return null;
  }

  const key = secret as jwt.Secret;

  try {
    jwt.verify(jwtToken, key, {
      algorithms: [algorithm],
    });
  } catch (err) {
    return null;
  }
  if (
    decodedToken.payload &&
    typeof decodedToken.payload === 'object' &&
    'payload' in decodedToken.payload
  ) {
    return decodedToken.payload.payload.id || null;
  }
  return null;
}
