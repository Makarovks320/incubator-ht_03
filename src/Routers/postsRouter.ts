import {Request, Response, Router} from "express";
import {postsRepository} from "../Repositories/posts-repository";


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
    const blog = postsRepository.findPostById(req.params.id);
    res.send(blog);
}));