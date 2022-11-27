import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {blogsRepository} from "../Repositories/blogs-repository";
import {inputValidator} from "../middlewares/inputValidator";
import {authorization} from "../middlewares/authorization";
// import {checkIdParam} from "../middlewares/checkIdParam";

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
    ((req: Request, res: Response) => {
        const blog = blogsRepository.findBlogById(req.params.id);
        blog ? res.send(blog) : res.status(404).send();
    }));

blogsRouter.post('/',
    authorization,
    body('websiteUrl').isURL(),
    body('name').isLength({max: 15}).withMessage('should be string').not().isEmpty(),
    inputValidator,
    ((req: Request, res: Response) => {
        const blog = req.body;
        const newBlog = blogsRepository.createNewBlog(blog);
        res.status(201).send(newBlog);
    }));

blogsRouter.put('/:id',
    authorization,
    body('name').isLength({max: 15}).withMessage('should be string').not().isEmpty(),
    body('websiteUrl').isURL(),
    // todo: как убедиться, что параметр :id передан?
    // param().notEmpty().withMessage('param id is required')
    // checkIdParam, todo: сделал проверку, но она не работает - почему?
    inputValidator,
    (req: Request, res: Response) => {
        const updatedBlog = blogsRepository.updateBlogById(req.params.id, req.body);
        updatedBlog ? res.status(204).send() : res.status(404).send();
    });

blogsRouter.delete('/:id',
    authorization,
    ((req: Request, res: Response) => {
        const blog = blogsRepository.deleteBlogById(req.params.id);
        blog ? res.status(204).send() : res.status(404).send();
    }));