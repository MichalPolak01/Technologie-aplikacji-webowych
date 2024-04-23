import jwt from 'jsonwebtoken';
import TokenModel from '../schemas/token.schema';
import { config } from '../../config';
import { IToken } from 'modules/models/token.model';

class TokenService {
    public async create(user: any) {
        const access = 'auth';
        const userData = {
            userId: user.id,
            name: user.email,
            role: user.role,
            isAdmin: user.isAdmin,
            access: access,
        };

        const value = jwt.sign(
            userData,
            config.JwtSecret,
            {
                expiresIn: '3h'
            }
        );

        try {
            const result = await new TokenModel ( { userId: user.id, type: 'authorization', value, createDate: new Date().getTime() }).save();
            if (result) {
                return result;
            }
        } catch (error) {
            console.error('Występił błąd podczas tworzenia tokena: ', error);
            throw new Error('Występił błąd podczas tworzenia tokena!');
        }
    }

    public getToken(token: any) {
        return {token: token.value};
    }

    public async remove(userId: string) {
        try {
            const result = await TokenModel.deleteOne( {userId: userId} );
            console.log(result);
            if (result.deletedCount === 0) {
                throw new Error('Występił błąd podczas usuwania tokena!');
            }
            return result;
        } catch (error) {
            console.error('Error while removing token: ', error);
            throw new Error('Error while removeing token!');
        }
    }

    public async getAllTokens(): Promise<IToken[]> {
        try {
            const tokens = await TokenModel.find();
            return tokens;
        } catch (error) {
            console.error('Error while fetching all tokens:', error);
            throw new Error('Error while fetching all tokens');
        }
    }

    public async deleteTokenById(tokenId: string): Promise<void> {
        try {
            const result = await TokenModel.deleteOne({ _id: tokenId });
            if (result.deletedCount === 0) {
                throw new Error('Token not found');
            }
        } catch (error) {
            console.error('Error while deleting token:', error);
            throw new Error('Error while deleting token');
        }
    }
}

export default TokenService;