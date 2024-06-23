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

    public async getPostById(postId: string): Promise<IPost | null> {
        try {
            const post = await PostModel.findById(postId);
            return post;
        } catch (error) {
            throw new Error(`Failed to get post by id ${error}`);
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

    public async likePost(postId: string, userId: string) {
        try {
            const post = await PostModel.findByIdAndUpdate(
                postId,
                { $addToSet: { likes: userId } },
                { new: true }
            ).exec();
            return post;
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania like:', error);
            throw new Error('Wystąpił błąd podczas dodawania like!');
        }
    }

    public async unlikePost(postId: string, userId: string) {
        try {
            const post = await PostModel.findByIdAndUpdate(
                postId,
                { $pull: { likes: userId } },
                { new: true }
            ).exec();
            return post;
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania like:', error);
            throw new Error('Wystąpił błąd podczas usuwania like!');
        }
    }

    public async addComent(postId: string, coment: any) {
        try {
            const post = await PostModel.findByIdAndUpdate(
                postId,
                { $push: { comments: coment } },
                { new: true }
            ).exec();
            return post;
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania komentarza:', error);
            throw new Error('Wystąpił błąd podczas dodawania komentarza!');
        }
    }
}

export default DataService;