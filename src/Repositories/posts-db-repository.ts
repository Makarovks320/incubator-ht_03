import {client} from "./db";
import {blog} from "./blogs-db-repository";

type post = {
    id?: string,
    title?: string,
    shortDescription?: string,
    content?: string,
    blogId?: string,
    blogName?: string
}
const COLLECTION = "posts";

export const postsRepository = {
    async getAllPosts(): Promise<post[]>{
        return client.db("ht_03").collection<blog>(COLLECTION).find({}).toArray();
    },
    async findPostById(id: string): Promise<post | null>{
        const post: post | null = await client.db("ht_03").collection<blog>(COLLECTION).findOne({id});
        return post ? post[0] : null;
    },
    async deleteAllPosts(): Promise<void> {
        await client.db("ht_03").collection<blog>(COLLECTION).deleteMany({});
    },
    async createNewPost(p: post): Promise<post> {
        const newPost = {
            id: (new Date().valueOf()).toString(),
            title: p.title || 'mock',
            shortDescription: p.shortDescription || 'mock',
            content: p.content || 'mock',
            blogId: p.blogId || 'mock',
            blogName: p.blogName || 'mock',

        };
        const result = await client.db("ht_03").collection<blog>(COLLECTION).insertOne(newPost);
        return newPost;
    },
    async updatePostById(id: string, p: post): Promise<boolean> {
        const result = await client.db("ht_03").collection<blog>(COLLECTION).updateOne({id},{$set: {...p}});
        return result.matchedCount === 1
    },
    async deletePostById(id: string): Promise<boolean> {
        const result = await client.db("ht_03").collection<blog>(COLLECTION).deleteOne({id});
        return result.deletedCount === 1
    }
};
