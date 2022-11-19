import {Request, Response, Router} from "express";
import {blogsRepository} from "../Repositories/blogs-repository";


export const blogsRouter = Router();

blogsRouter.get('/', ((req: Request, res: Response) => {
    const blogs = blogsRepository.getAllBlogs();
    res.send(blogs);
}));

blogsRouter.delete('/', ((req: Request, res: Response) => {
    blogsRepository.deleteAllBlogs();
    res.send(204);
}));

blogsRouter.get('/:id', ((req: Request, res: Response) => {
    const blog = blogsRepository.findBlogsById(req.params.id);
    res.send(blog);
}));