import PasswordModel from "../schemas/password.schema";
import bcrypt from 'bcrypt';

class PasswordService {
    public async createOrUpdate(data: any) {
        const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, { $set: {password: data.password }}, { new: true } );
        if (!result) {
            const dataModel = new PasswordModel( { userId: data.userId, password: data.password} );
            return await dataModel.save();
        }
        return result;
    }

    public async authorize(userId: string, password: string) {
        try {
            const result = await PasswordModel.findOne( { userId: userId, password: password } );
            if (result) {
                return true;
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas autoryzacji: ', error);
            throw new Error('Wystąpił błąd podczas autoryzacji!');
        }
    }

    async hashPassword(password: string): Promise<string> {
        const salrRounds = 10;
        const hashPassword = await bcrypt.hash(password, salrRounds);
        // console.log('hash', hashPassword);
        return hashPassword;
    }

    public generateRandomPassword(length: number = 10): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }
        return password;
    }
}

export default PasswordService;