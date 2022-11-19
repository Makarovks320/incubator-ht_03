import express, {Request, Response} from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
const jsonParser = express.json();

app.use(jsonParser);

app.get('/', (req: Request, res: Response) => {
    res.send('HELLO!')
    }
);

app.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`);
});