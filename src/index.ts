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
    res.send('HELLO! ht_02');
    }
);
app.delete('/testing/all-data', async (req, res) => {
    await blogsRepository.deleteAllBlogs(); // todo спросить нужно ли два эвэйта
    await postsRepository.deleteAllPosts();
    res.send(204);
});
app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`);
});