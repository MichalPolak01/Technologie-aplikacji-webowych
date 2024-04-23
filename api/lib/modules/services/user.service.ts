import { IUser } from "../models/user.model";
import UserModel from "../schemas/user.schema"

class UserService {
    public async createNewOrUpdate(user: IUser) {
        console.log(user);

        try {
            if (!user._id) {
                const dataModel = new UserModel(user);
                return await dataModel.save();
            } else {
                return await UserModel.findByIdAndUpdate(user._id, { $set: user }, { new: true });
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych: ', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych!');
        }
    }

    public async getByEmailOrName (name: string) {
        try {
            const result = await UserModel.findOne({ $or: [{ email: name}, { name: name }] });
            if (result) {
                return result;
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas pobierania danych: ', error);
            throw new Error('Wystąpił błąd podczas pobierania danych!');
        }
    }

    public async getAllUsers(): Promise<IUser[]> {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            console.error('Error while fetching all users:', error);
            throw new Error('Error while fetching all users');
        }
    }

    public async deleteUserById(userId: string): Promise<void> {
        try {
            const result = await UserModel.deleteOne({ _id: userId });
            if (result.deletedCount === 0) {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error while deleting user:', error);
            throw new Error('Error while deleting user');
        }
    }
}

export default UserService;