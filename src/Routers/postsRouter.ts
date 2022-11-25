import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {postsRepository} from "../Repositories/posts-repository";
import {inputValidator} from "../middlewares/inputValidator";


export const postsRouter = Router();

postsRouter.get('/', ((req: Request, res: Response) => {
    const posts = postsRepository.getAllPosts();
    res.send(posts);
}));

postsRouter.delete('/', ((req: Request, res: Response) => {
    postsRepository.deleteAllPosts();
    res.send(204);
}));

postsRouter.get('/:id', ((req: Request, res: Response) => {
    const post = postsRepository.findPostById(req.params.id);
    res.send(post);
}));

postsRouter.post('/',
    body('title').isString().withMessage('should be string'),
    body('shortDescription').isString().withMessage('should be string'),
    body('content').isString().withMessage('should be string'),
    body('blogId').isString().withMessage('should be string'),
    body('blogName').isString().withMessage('should be string'),
    inputValidator,
    ((req: Request, res: Response) => {
        const post = req.body;
        const newPost = postsRepository.createNewPost(post);
        res.status(201).send(newPost);
    }));

postsRouter.put('/:id',
    body('title').isString().withMessage('should be string'),
    inputValidator,
    (req: Request, res: Response) => {
        const updatedPost = postsRepository.updatePostById(req.params.id, req.body);
        updatedPost ? res.status(204).send() : res.status(404).send();
    });

postsRouter.delete('/:id',
    ((req: Request, res: Response) => {
        const post = postsRepository.deletePostById(req.params.id);
        post ? res.status(204).send() : res.status(404).send();
    }));