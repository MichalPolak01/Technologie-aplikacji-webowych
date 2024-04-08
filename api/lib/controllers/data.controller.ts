import { request } from "http";
import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from "express";

let testArray = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getAll);
        this.router.post(`${this.path}/:id`, this.addData);

        this.router.get(`${this.path}/:id`, this.getOnePost);
        this.router.post(`${this.path}`, this.addNewPost);
        this.router.delete(`${this.path}/:id`, this.deleteOnePost);
        this.router.post(`${this.path}s/:num`, this.getNumPosts);
        this.router.get(`${this.path}s`, this.getAllPosts);
        this.router.delete(`${this.path}s`, this.deleteAllPosts);
    }

    private getAll = async (request: Request, response: Response, next: NextFunction ) => {
        response.status(200).json(testArray);
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;

        testArray.push(elem);

        response.status(200).json(testArray);
    };

    /* Post methods */
    private getOnePost = async (requsest: Request, response: Response) => {
        const { id } = requsest.params;

        if (! Number.isInteger(Number(id)) || Number(id) >= testArray.length || Number(id) < 0) {
            return response.status(404).json({ error: "Post not found." });
        }
        
        response.status(200).json(testArray[Number(id)]);
    }

    private addNewPost = async (request: Request, response: Response) => {
        const { elem } = request.body;

        testArray.push(elem);

        response.status(201).json(testArray);
    };

    private deleteOnePost = (request: Request, response: Response) => {
        const { id } = request.params;

        if (! Number.isInteger(Number(id)) || Number(id) >= testArray.length || Number(id) < 0) {
            return response.status(404).json({ error: "Post not found." });
        }

        testArray.splice(Number(id), 1);

        response.status(200).json(testArray);
    };

    private getNumPosts (request: Request, response: Response) {
        const { num } = request.params;

        let posts = [...testArray].splice(0, Number(num));

        response.status(200).json(posts);
    }

    private getAllPosts = async (request: Request, response: Response ) => {
        response.status(200).json(testArray);
    };

    private deleteAllPosts = async (request: Request, response: Response) => {
        testArray.length = 0;

        response.status(200).json(testArray);
    };
}

export default PostController;