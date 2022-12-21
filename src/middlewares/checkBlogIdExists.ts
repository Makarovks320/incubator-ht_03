//import {NextFunction, Request, Response} from "express";
import {blogsRepository} from "../Repositories/blogs-repository";

// export function checkBlogIdExists(req: Request, res: Response, next: NextFunction) {
//     const blogId = req.body.blogId;
//     blogsRepository.findBlogById(blogId);
//     blogId ? next() :
//         res.status(404).send();
// }

export async function checkBlogIdExists(value) {
    const existId = await blogsRepository.findBlogById(value);
    if (!existId) {
        throw new Error('blog Id not found');
    }

    return true;
}