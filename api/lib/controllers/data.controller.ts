import { request } from "http";
import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from "express";
import { checkPostCount } from "../middlewares/checkPostCount.middleware";
import DataService from "../modules/services/data.service"


class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    private dataService = new DataService;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /* Dodawanie */
        this.router.post(`${this.path}`, this.addData);

        /* Pobieranie */
        this.router.get(`${this.path}s`, this.getPosts);
        this.router.get(`${this.path}/:id`, this.getElementById);
        this.router.post(`${this.path}s/:limit`, checkPostCount, this.getSeveralPosts);

        /* Usuwanie */
        this.router.delete(`${this.path}/:id`, this.removePost);
        this.router.delete(`${this.path}s`, this.removePosts);
    }


    /* Post methods */
    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { title, text, image } = request.body;

        const readingData = {
            title,
            text,
            image
        };

        try {
            await this.dataService.createPost(readingData);
            response.status(200).json(readingData);
        } catch (error) {
            console.log('Wystąpił błąd poczas tworzenia postu: ', error);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.getPost({ _id: id });
        response.status(200).json(allData);
    }

    private getPosts = async (request: Request, response: Response, next: NextFunction) => {
        const posts = await this.dataService.getPosts();
        response.status(200).json(posts);
    }

    private getSeveralPosts = async (request: Request, response: Response, next: NextFunction) => {
        const { limit } = request.params;
        const posts = await this.dataService.getSeveralPosts(limit);
        response.status(200).json(posts);
    }

    private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deletePost({ _id: id });
        response.status(200).json({message: "Post removed."});
    }

    private removePosts = async (request: Request, response: Response, next: NextFunction) => {
        await this.dataService.deletePosts();
        response.status(200).json({message: "Posts removed."});
    }
}

export default PostController;