import bcrypt from 'bcrypt';
import Salt from './Salt.js';

export default function encodePassword(password: string): string {
    return bcrypt.hashSync(password, Salt());
}