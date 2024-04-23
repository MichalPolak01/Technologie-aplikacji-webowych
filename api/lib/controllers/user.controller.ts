import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";
import UserService from "../modules/services/user.service";
import EmailService from "../modules/services/email.service";
import { auth } from "../middlewares/auth.middleware";
import { admin } from "../middlewares/admin.middleware";
import TokenMonitor from "../modules/monitors/token.monitor";

class UserController implements Controller {
    public path = '/api/user';
    public router = Router();
    private userService = new UserService();
    private passwordService = new PasswordService();
    private tokenService = new TokenService();
    private emailService = new EmailService();
    private tokenMonitor = new TokenMonitor();

    constructor() {
        this.initializeRoutes();
        this.tokenMonitor;
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createNewOrUpdate);
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.delete(`${this.path}/logout/:userId`, auth, this.removeHashSession);
        this.router.post(`${this.path}/resetPassword`, this.resetPassword);
        this.router.get(`${this.path}/getAllUsers`, admin, this.getAllUsers); // Tylko dla admina
        this.router.delete(`${this.path}/removeUser/:userId`, admin, this.deleteUserById); // Tylko dla admina
        this.router.get(`${this.path}/getAllTokens`, admin, this.getAllTokens); // Tylko dla admina
    }

    private authenticate = async (request: Request, response: Response, next: NextFunction) => {
        const { login, password } = request.body;

        try {
            const user = await this.userService.getByEmailOrName(login);
            if (!user) {
                response.status(401).json( {error: 'Unauthorized'} );
                return;
            }
            await this.passwordService.authorize(user.id, await this.passwordService.hashPassword(password) );
            const token = await this.tokenService.create(user);

            response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Validation Error: ${(error as Error).message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };

    private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashPassword = await this.passwordService.hashPassword(userData.password);
                await this.passwordService.createOrUpdate( { userId: user?._id, password: hashPassword});
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation error ${(error as Error).message}`);
            response.status(400).json( {error: 'Bad request', value: (error as Error).message});
        }
    };

    private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.params;

        try {
            const result = await this.tokenService.remove(userId);
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation error: ${(error as Error).message}`);
            response.status(401).json( { error: 'Unauthorized' });
        }
    };

    private resetPassword = async(request: Request, response: Response, next: NextFunction) => {
        const { name } = request.body;

        try {
            const user = await this.userService.getByEmailOrName(name);
            if (!user) {
                response.status(401).json( {error: 'Unauthorized 1'} );
                return;
            }
            const generatedPassword = await this.passwordService.generateRandomPassword(8);
            const hashPassword = await this.passwordService.hashPassword(generatedPassword);
            await this.passwordService.createOrUpdate( { userId: user?._id, password: hashPassword} );
            await this.emailService.sendEmailWithGeneratedPassword(user.email, generatedPassword);
            response.status(200).json( {message: 'Wygenerowano hasło i przesłano na email.'});
        } catch (error) {
            console.error(`Reset password error: ${(error as Error).message}`);
            response.status(401).json( { error: 'Unauthorized' });
        }
    }

    public getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAllUsers();
            response.status(200).json(users);
        } catch (error) {
            console.error('Error while getting all users:', error);
            response.status(500).json({ error: 'Error while getting all users' });
        }
    };

    public deleteUserById = async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.params;
        try {
            await this.userService.deleteUserById(userId);
            response.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error while deleting user:', error);
            response.status(500).json({ error: 'Error while deleting user' });
        }
    };

    public getAllTokens = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const tokens = await this.tokenService.getAllTokens();
            response.status(200).json(tokens);
        } catch (error) {
            console.error('Error while getting all tokens:', error);
            response.status(500).json({ error: 'Error while getting all tokens' });
        }
    };
}

export default UserController;