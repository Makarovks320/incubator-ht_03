import {blogCollection} from "./db";

export type blog = {
    id?: string,
    name?: string,
    description?: string,
    websiteUrl?: string,
    createdAt?: string
}
const DEFAULT_PROJECTION = { _id: false };

export const blogsRepository = {
    async getBlogs(searchNameTerm: string | null | undefined): Promise<blog[]>{//todo почему здесь без эвэйта?
        const filter: any = {};
        if (searchNameTerm) {
            filter.name = {$regex: searchNameTerm};
        }
        return blogCollection.find(filter, { projection: DEFAULT_PROJECTION}).toArray();
    },
    async findBlogById(id: string): Promise<blog | null>{
        return await blogCollection.findOne({id}, { projection: DEFAULT_PROJECTION});
    },
    async deleteAllBlogs(): Promise<void> {
        await blogCollection.deleteMany({});
    },
    async createNewBlog(b: blog): Promise<blog> {
        await blogCollection.insertOne({...b});
        return b;
    },
    async updateBlogById(id: string, b: blog): Promise<boolean> {
        const result = await blogCollection.updateOne({id},{$set: {...b}});
        return result.matchedCount === 1
    },
    async deleteBlogById(id: string): Promise<boolean> {
        const result = await blogCollection.deleteOne({id});
        return result.deletedCount === 1
    }
};
