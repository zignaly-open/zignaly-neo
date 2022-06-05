// TODO: put in README
import { Algorithm } from 'jsonwebtoken';

export const algorithm = (process.env.ALGORITHM || 'HS256') as Algorithm;
export const secret = process.env.ALGORITHM || 'razrazrazetohardbass';
