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
    const blog = blogsRepository.findBlogById(req.params.id);
    res.send(blog);
}));

blogsRouter.post('/', ((req: Request, res: Response) => {
    const blog = req.body;
    const newBlog = blogsRepository.createNewBlog(blog);
    res.status(201).send(newBlog);
}));