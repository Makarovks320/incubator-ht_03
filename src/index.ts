import express, {Request, Response} from 'express';
import {blogsRouter} from "./Routers/blogsRouter";
import {postsRouter} from "./Routers/postsRouter";
import {blogsRepository} from "./Repositories/blogs-repository";
import {postsRepository} from "./Repositories/posts-repository";

export const app = express();
const PORT = process.env.PORT || 3000;
const jsonParser = express.json();
app.use(jsonParser);

app.get('/', (req: Request, res: Response) => {
    res.send('HELLO lolo!');
    }
);
app.delete('/testing/all-data', ((req, res) => {
    blogsRepository.deleteAllBlogs();
    postsRepository.deleteAllPosts();
    res.send(204);
}));
app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`);
});