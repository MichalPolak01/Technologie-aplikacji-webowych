import { IPost, Query } from "../models/data.model";
import PostModel from "../schemas/data.schema"

class DataService {
    public async createPost(postParams: IPost) {
        try {
            const dataModel = new PostModel(postParams);
            await dataModel.save();
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych: ', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych!');
        }
    }

    public async getPost(query: Query<number | string | boolean>) {
        try {
            const result = await PostModel.find(query, {__v: 0, _id: 0});
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async getPosts() {
        try {
            const result = await PostModel.find();
            return result;
        } catch (error) {
            console.error('Wystąpił błąd podczas pobierania danych: ', error);
            throw new Error('Wystąpił błąd podczas pobierania danych!');
        }
    }

    public async getSeveralPosts(limitString: string) {
        try {
            const limit = parseInt(limitString);
            const result = await PostModel.find().limit(limit);
            return result;
        } catch (error) {
            console.error('Wystąpił błąd podczas pobierania danych: ', error);
            throw new Error('Wystąpił błąd podczas pobierania danych!');
        }
    }

    public async deletePost(query: Query<number | string | boolean>) {
        try {
            await PostModel.deleteMany(query);
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych: ', error);
            throw new Error('Wystąpił błąd podczas usuwania danych!');
        }
    }

    public async deletePosts() {
        try {
            await PostModel.deleteMany();
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych: ', error);
            throw new Error('Wystąpił błąd podczas usuwania danych!');
        }
    }
}

export default DataService;