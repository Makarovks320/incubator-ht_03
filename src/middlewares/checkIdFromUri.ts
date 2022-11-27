import {NextFunction, Request, Response} from "express";
import {postsRepository} from "../Repositories/posts-repository";

export function checkIdFromUri (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const exist = postsRepository.findPostById(id);
    exist ? next() :
        res.status(404).send();
}