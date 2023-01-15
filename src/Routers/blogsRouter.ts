import {Request, Response, Router} from "express";
import {param} from "express-validator";
import {inputValidator} from "../middlewares/inputValidator";
import {authorization} from "../middlewares/authorization";
import {blogsService} from "../domain/blogs-service"
import {blogsQueryRepository, blogsQueryParamsType} from "../Repositories/blogs-query-repository";
import {postQueryParamsType, postsQueryRepository} from "../Repositories/posts-query-repository";
import {postsService} from "../domain/posts-service";
import {checkBlogIdExists} from "../middlewares/checkBlogIdExists";
import {blogExistingValidator} from "../middlewares/blogExistingValidator";
import {
    contentValidation,
    nameValidation,
    shortDescriptionValidation,
    titleValidation,
    websiteUrlValidation
} from "../middlewares/validations";

export const blogsRouter = Router();

blogsRouter.get('/', async (req: Request, res: Response) => {
    const queryParams: blogsQueryParamsType = {
        searchNameTerm: req.query.searchNameTerm?.toString() || null,
        pageNumber: parseInt(req.query.pageNumber as string) || 1,//todo норм? и из чего происходит преобразование?
        pageSize: parseInt(req.query.pageSize as string) || 10,
        sortBy: req.query.sortBy?.toString() || 'createdAt',
        sortDirection: req.query.sortDirection === 'asc' ? 'asc' : 'desc'
    };
    const blogs = await blogsQueryRepository.getBlogs(queryParams);
    res.send(blogs);
});

blogsRouter.delete('/', async (req: Request, res: Response) => {
    await blogsService.deleteAllBlogs();
    res.sendStatus(204);
});

blogsRouter.get('/:id/posts', async (req: Request, res: Response) => {
    const queryParams: postQueryParamsType = {
        pageNumber: parseInt(req.query.pageNumber as string) || 1,
        pageSize: parseInt(req.query.pageSize as string) || 10,
        sortBy: req.query.sortBy?.toString() || 'createdAt',
        sortDirection: req.query.sortDirection === 'asc' ? 'asc' : 'desc'
    };
    const blog = await blogsService.findBlogById(req.params.id);
    if (blog) {
        const posts = await postsQueryRepository.getPosts(queryParams, req.params.id);
        res.send(posts);
    } else {
        res.status(404).send();
    }
});
// interface FieldWithBlogName {
//     blogName: string
// }
blogsRouter.post('/:id/posts', [
    authorization,
    param('id').custom(checkBlogIdExists).withMessage('blog is not found'),
    blogExistingValidator,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidator,
    // todo: если в миддлваре сохранить переменную не в body, то как согласовать типы?
    // async (req: Request & FieldWithBlogName, res: Response) => {
    async (req: Request, res: Response) => {
        const post = req.body;
        const blogData = {
            blogId: req.params.id,
            blogName: req.body.blogName
        };
        const newPost = await postsService.createNewPost(post, blogData);
        res.status(201).send(newPost);
    }
]);

blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const blog = await blogsService.findBlogById(req.params.id);
    blog ? res.send(blog) : res.status(404).send();
});

blogsRouter.post('/', [
    authorization,
    nameValidation,
    websiteUrlValidation,
    inputValidator,
    async (req: Request, res: Response) => {
        const blog = req.body;
        const newBlog = await blogsService.createNewBlog(blog);
        res.status(201).send(newBlog);
    }
]);

blogsRouter.put('/:id', [
    authorization,
    nameValidation,
    websiteUrlValidation,
    inputValidator,
    async (req: Request, res: Response) => {
        const updatedBlog = await blogsService.updateBlogById(req.params.id, req.body);
        updatedBlog ? res.status(204).send() : res.status(404).send();
    }
]);

blogsRouter.delete('/:id', [
    authorization,
    async (req: Request, res: Response) => {
        const blog = await blogsService.deleteBlogById(req.params.id);
        blog ? res.status(204).send() : res.status(404).send();
    }
]);