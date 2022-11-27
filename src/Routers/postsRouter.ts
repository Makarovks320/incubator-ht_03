import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {postsRepository} from "../Repositories/posts-repository";
import {inputValidator} from "../middlewares/inputValidator";
import {authorization} from "../middlewares/authorization";
import {checkBlogIdExists} from "../middlewares/checkBlogIdExists";


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
    post ? res.send(post) :
        res.status(404).send();
}));

postsRouter.post('/',
    authorization,
    body('title').trim().isLength({max: 30}).withMessage('should be string').not().isEmpty(),
    body('shortDescription').trim().isLength({max: 100}).withMessage('should be string').not().isEmpty(),
    body('content').trim().isLength({max: 1000}).withMessage('should be string').not().isEmpty(),
    body('blogId').trim().isString().custom(checkBlogIdExists).withMessage('should be string'),
    inputValidator,
    // проверка на существование blogId
    // checkBlogIdExists,
    ((req: Request, res: Response) => {
        const post = req.body;
        const newPost = postsRepository.createNewPost(post);
        res.status(201).send(newPost);
    }));

postsRouter.put('/:id',
    authorization,
    body('title').trim().isLength({max: 30}).withMessage('should be string').not().isEmpty(),
    body('shortDescription').trim().isLength({max: 100}).withMessage('should be string').not().isEmpty(),
    body('content').trim().isLength({max: 1000}).withMessage('should be string').not().isEmpty(),
    body('blogId').trim().isString().custom(checkBlogIdExists).withMessage('should be string'),
    inputValidator,
    (req: Request, res: Response) => {
        const updatedPost = postsRepository.updatePostById(req.params.id, req.body);
        updatedPost ? res.status(204).send() : res.status(404).send();
    });

postsRouter.delete('/:id',
    authorization,
    ((req: Request, res: Response) => {
        const post = postsRepository.deletePostById(req.params.id);
        post ? res.status(204).send() : res.status(404).send();
    }));