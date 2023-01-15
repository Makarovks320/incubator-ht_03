//import {NextFunction, Request, Response} from "express";
import {blogsRepository} from "../Repositories/blogs-repository";
import {CustomValidator} from "express-validator";

// export function checkBlogIdExists(req: Request, res: Response, next: NextFunction) {
//     const blogId = req.body.blogId;
//     blogsRepository.findBlogById(blogId);
//     blogId ? next() :
//         res.status(404).send();
// }

export const checkBlogIdExists: CustomValidator = async (value, { req }) => {
    const blog = await blogsRepository.findBlogById(value);
    if (!blog) {
        throw new Error('Incorrect blog id: blog is not found');
    }
    // сразу добавляем в реквест имя блога, чтобы потом не обращаться за ним лишний раз в БД
    req.body.blogName = blog.name;
    return true;
};