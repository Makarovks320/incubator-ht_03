import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidator} from "../middlewares/inputValidator";
import {authorization} from "../middlewares/authorization";
import {checkBlogIdExists} from "../middlewares/checkBlogIdExists";
import {checkIdFromUri} from "../middlewares/checkIdFromUri";
import {postsService} from "../domain/posts-service";


export const postsRouter = Router();

postsRouter.get('/', async (req: Request, res: Response) => {
    const posts = await postsService.getAllPosts();
    res.send(posts);
});

postsRouter.delete('/', async (req: Request, res: Response) => {
    await postsService.deleteAllPosts();
    res.sendStatus(204);
});

postsRouter.get('/:id', async (req: Request, res: Response) => {
    const post = await postsService.findPostById(req.params.id);
    post ? res.send(post) :
        res.status(404).send();
});

postsRouter.post('/',
    authorization,
    body('title').trim().isLength({max: 30}).withMessage('max length: 30').not().isEmpty(),
    body('shortDescription').trim().isLength({max: 100}).withMessage('max length: 100').not().isEmpty(),
    body('content').trim().isLength({max: 1000}).withMessage('max length: 1000').not().isEmpty(),
    body('blogId').trim()
        .isString().withMessage('should be string')
        .custom(checkBlogIdExists).withMessage('blog Id not found'),
    inputValidator,
    // проверка на существование blogId
    // checkBlogIdExists,
    async (req: Request, res: Response) => {
        const post = req.body;
        const newPost = await postsService.createNewPost(post);
        res.status(201).send(newPost);
    });

postsRouter.put('/:id',
    authorization,
    checkIdFromUri,
    body('title').trim().isLength({max: 30}).withMessage('max: 30').not().isEmpty(),
    body('shortDescription').trim().isLength({max: 100}).withMessage('max: 100').not().isEmpty(),
    body('content').trim().isLength({max: 1000}).withMessage('max: 1000').not().isEmpty(),
    body('blogId').trim().isString().custom(checkBlogIdExists).withMessage('blog Id not found'),
    inputValidator,
    async (req: Request, res: Response) => {
        const updatedPost = await postsService.updatePostById(req.params.id, req.body);
        updatedPost ? res.status(204).send() : res.status(404).send();
    });

postsRouter.delete('/:id',
    authorization,
    async (req: Request, res: Response) => {
        const post = await postsService.deletePostById(req.params.id);
        post ? res.status(204).send() : res.status(404).send();
    });