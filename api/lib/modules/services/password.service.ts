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

    public async authorize(userId: string, password: string): Promise<boolean> {
        try {
            const passwordData = await PasswordModel.findOne({ userId: userId });
            if (!passwordData) {
                return false;
            }

            const isPasswordCorrect = await bcrypt.compare(password, passwordData.password);
            return isPasswordCorrect;
        } catch (error) {
            console.log('Authorization error! Wrong password!');
            throw new Error('Authorization error! Wrong password!');
        }
    }

    async hashPassword(password: string): Promise<string> {
        const salrRounds = 10;
        const hashPassword = await bcrypt.hash(password, salrRounds);
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