import { request } from "http";
import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router, query } from "express";
import { checkPostCount } from "../middlewares/checkPostCount.middleware";
import DataService from "../modules/services/data.service"
import Joi from "joi";
import { text } from "body-parser";
import { error } from "console";


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

        /* Extra options */
        this.router.post(`${this.path}/comment/:id`, this.addComent);
        this.router.get(`${this.path}/comments/:id`, this.getCommentsByPostId);
    }


    /* Post methods */
    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { title, text, image } = request.body;

        const schema = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            image: Joi.string().uri().required(),
            createdAt: Joi.date().default(Date.now),
            likes: Joi.array().items(Joi.string()).default([]),
            comments: Joi.array().items(Joi.object({
                userId: Joi.string().required,
                text: Joi.string().required,
                createdAt: Joi.date().default(Date.now)
            })).default([])
        });

        try {
            const validateData = await schema.validateAsync({title, text, image});
            await this.dataService.createPost(validateData);
            response.status(200).json(validateData);
        } catch (error) {
            console.error(`Validation Error: ${error}`);
            response.status(400).json({error: 'Invalida input data!'});
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

    private addComent = async (request: Request, respose: Response, next: NextFunction) => {
        const { id } = request.params;
        const { userId, text } = request.body;
        
        const schema = Joi.object({
            userId: Joi.string().required(),
            text: Joi.string().required(),
            createdAt: Joi.date().default(Date.now)
        });

        try {
            const validateData = await schema.validateAsync({ userId, text });
            const post = await this.dataService.addComent(id, validateData);
            respose.status(200).json(post);
        } catch (error) {
            respose.status(400).json({ error: 'Invalid input data!' });
        }
    }

    private getCommentsByPostId = async (request: Request, response: Response, newxt: NextFunction) => {
        const { id } = request.params;
        try {
            const post = await this.dataService.getPostById(id);

            if (!post) {
                return response.status(404).json({ error: 'Post not found!' });
            }

            response.status(200).json(post.comments);
        } catch (error) {
            response.status(500).json({ error: 'An error occured while fetching comments!'});
        }
    }    
}

export default PostController;