import cron from 'node-cron';
import TokenService from '../services/token.service';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

class TokenMonitor {
    private tokenService = new TokenService();

    constructor() {
        cron.schedule('*/1 * * * *', async () => {
            try {
                await this.checkTokenValidity();
                console.log('Token validity check completed.');
            } catch (error) {
                console.error('Error while checking token validity:', error);
            }
        });
    }

    private async checkTokenValidity() {
        const allTokens = await this.tokenService.getAllTokens();

        for (const token of allTokens) {
            if (this.isTokenExpired(token.value)) {
                await this.tokenService.deleteTokenById(token._id);
                console.log(`Expired token removed: ${token._id}`);
            }
        }
    }

    private isTokenExpired(token: string): boolean {
        try {
            const decodedToken: any = jwt.verify(token, config.JwtSecret);
            if (decodedToken.exp && typeof decodedToken.exp === 'number') {
                const expiryDate = new Date(decodedToken.exp * 1000);
                return expiryDate < new Date();
            } else {
                console.error('Brak lub nieprawidłowa wartość pola w tokenie JWT.');
                return true;
            }
        } catch (error) {
            console.error('Błąd podczas weryfikacji tokenu JWT.');
            return true; // Jak nie może zostać zweryfikownay to czas został przekroczony
        }
    }
}

export default TokenMonitor;