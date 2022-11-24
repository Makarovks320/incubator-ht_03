import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {blogsRepository} from "../Repositories/blogs-repository";
import {inputValidator} from "../middlewares/inputValidator";

export const blogsRouter = Router();

blogsRouter.get('/', ((req: Request, res: Response) => {
    const blogs = blogsRepository.getAllBlogs();
    res.send(blogs);
}));

blogsRouter.delete('/', ((req: Request, res: Response) => {
    blogsRepository.deleteAllBlogs();
    res.send(204);
}));

blogsRouter.get('/:id',
    // param('id').isString()
    //     .withMessage('should be string'),
    // inputValidator,
    ((req: Request, res: Response) => {
    const blog = blogsRepository.findBlogById(req.params.id);
    blog ? res.send(blog) : res.status(404).send();
}));

blogsRouter.post('/',
    body('name').notEmpty()
        .withMessage('is empty'),
    body('name').isString()
        .withMessage('should be string'),
    body('name').isLength({ min: 3, max: 50 })
        .withMessage('min: 3, max: 50'),
    inputValidator,
    ((req: Request, res: Response) => {
    const blog = req.body;
    const newBlog = blogsRepository.createNewBlog(blog);
    res.status(201).send(newBlog);
}));

blogsRouter.put('/:id',
    body('name').isString()
        .withMessage('should be string'),
    body('name').isLength({ min: 3, max: 50 })
        .withMessage('min: 3, max: 50'),
    // todo: как убедиться, что параметр :id передан?
    // param().notEmpty().withMessage('param id is required')
    inputValidator,
    (req: Request, res: Response) => {
    const updatedBlog = blogsRepository.updateBlogById(req.params.id, req.body);
    updatedBlog ? res.status(204).send() : res.status(404).send();
    });

blogsRouter.delete('/:id',
    ((req: Request, res: Response) => {
        const blog = blogsRepository.deleteBlogById(req.params.id);
        blog ? res.status(204).send() : res.status(404).send();
    }));