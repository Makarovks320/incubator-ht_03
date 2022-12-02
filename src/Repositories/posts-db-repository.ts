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
        const post: post | null = await postsCollection.findOne({id});
        return post ? post : null;
    },
    async deleteAllPosts(): Promise<void> {
        await postsCollection.deleteMany({});
    },
    async createNewPost(p: post): Promise<post> {
        const newPost: post = {
            id: (new Date().valueOf()).toString(),
            title: p.title || 'mock',
            shortDescription: p.shortDescription || 'mock',
            content: p.content || 'mock',
            blogId: p.blogId || 'mock',
            blogName: p.blogName || 'mock',
            createdAt: (new Date()).toISOString()
        };
        const result = await postsCollection.insertOne({...newPost});
        return newPost;
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
