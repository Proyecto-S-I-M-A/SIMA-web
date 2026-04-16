import bcrypt from 'bcrypt';

export default function PasswordVerification(encodedPassword: string, password: string): boolean {
    if(bcrypt.compareSync(password, encodedPassword))
        return true;
    return false;
}