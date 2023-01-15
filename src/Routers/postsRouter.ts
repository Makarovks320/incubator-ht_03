import {Request, Response, Router} from "express";
import {inputValidator} from "../middlewares/inputValidator";
import {authorization} from "../middlewares/authorization";
import {checkIdFromUri} from "../middlewares/checkIdFromUri";
import {postsService} from "../domain/posts-service";
import {postQueryParamsType, postsQueryRepository} from "../Repositories/posts-query-repository";
import {
    blogIdValidation,
    contentValidation,
    shortDescriptionValidation,
    titleValidation
} from "../middlewares/postsValidations";


export const postsRouter = Router();

postsRouter.get('/', async (req: Request, res: Response) => {
    const queryParams: postQueryParamsType = {
        pageNumber: parseInt(req.query.pageNumber as string) || 1,//todo норм? и из чего происходит преобразование?
        pageSize: parseInt(req.query.pageSize as string) || 10,
        sortBy: req.query.sortBy?.toString() || 'createdAt',
        sortDirection: req.query.sortDirection === 'asc' ? 'asc' : 'desc'
    };
    const posts = await postsQueryRepository.getPosts(queryParams);
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

postsRouter.post('/', [
    authorization,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidator,
    async (req: Request, res: Response) => {
        const post = req.body;
        const blogData = {
            blogId: req.body.blogId,
            blogName: req.body.blogName
        };
        const newPost = await postsService.createNewPost(post, blogData);
        res.status(201).send(newPost);
    }
]);

postsRouter.put('/:id', [
    authorization,
    checkIdFromUri,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidator,
    async (req: Request, res: Response) => {
        const updatedPost = await postsService.updatePostById(req.params.id, req.body);
        updatedPost ? res.status(204).send() : res.status(404).send();
    }
]);

postsRouter.delete('/:id', [
    authorization,
    async (req: Request, res: Response) => {
        const post = await postsService.deletePostById(req.params.id);
        post ? res.status(204).send() : res.status(404).send();
    }
]);