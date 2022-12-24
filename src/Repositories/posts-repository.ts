import {postsCollection} from "./db";

type post = {
    id?: string,
    title?: string,
    shortDescription?: string,
    content?: string,
    blogId?: string,
    blogName?: string,
    createdAt?: string
}
const DEFAULT_PROJECTION = { _id: false };

export const postsRepository = {
    async getAllPosts(): Promise<post[]>{
        return postsCollection.find({}, { projection: DEFAULT_PROJECTION}).toArray();
    },
    async findPostById(id: string): Promise<post | null>{
        return await postsCollection.findOne({id},{ projection: DEFAULT_PROJECTION});
    },
    async deleteAllPosts(): Promise<void> {
        await postsCollection.deleteMany({});
    },
    async createNewPost(p: post): Promise<post> {
        await postsCollection.insertOne({...p});
        return p;// todo здесь мы можем получить ошибку из БД? мб стоит возвращать результат из БД?
    },
    async updatePostById(id: string, p: post): Promise<boolean> {
        const result = await postsCollection.updateOne({id},{$set: {...p}});
        return result.matchedCount === 1
    },
    async deletePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id});
        return result.deletedCount === 1
    }
};
