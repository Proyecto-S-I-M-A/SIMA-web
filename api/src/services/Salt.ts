import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "");
export default function Salt(): string {
    return bcrypt.genSaltSync(SALT_ROUNDS);
}