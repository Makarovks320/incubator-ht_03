import express, {Request, Response} from 'express';
import {blogsRouter} from "./Routers/blogsRouter";
import {postsRouter} from "./Routers/postsRouter";

const app = express();
const PORT = process.env.PORT || 3000;
const jsonParser = express.json();
app.use(jsonParser);

app.get('/', (req: Request, res: Response) => {
    res.send('HELLO!');
    }
);
app.delete('/testing/all-data', ((req, res) => {
    res.send(204);
}));
app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`);
});