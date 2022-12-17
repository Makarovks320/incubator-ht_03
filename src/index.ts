import express, {Request, Response} from 'express';
import {blogsRouter} from "./Routers/blogsRouter";
import {postsRouter} from "./Routers/postsRouter";
import {blogsRepository} from "./Repositories/blogs-db-repository";
import {postsRepository} from "./Repositories/posts-db-repository";
import {runDb} from "./Repositories/db";

export const app = express();
const PORT = process.env.PORT || 3000;
const jsonParser = express.json();
app.use(jsonParser);

app.get('/', (req: Request, res: Response) => {
    res.send('HELLO! ht_02-04');
    }
);
app.delete('/testing/all-data', async (req, res) => {
    await Promise.all([blogsRepository.deleteAllBlogs(), postsRepository.deleteAllPosts()]);
    res.sendStatus(204);
});
app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);

async function startApp () {
    await runDb();
    app.listen(PORT, () => {
        console.log(`app is running at port ${PORT}`);
    });
}
startApp();