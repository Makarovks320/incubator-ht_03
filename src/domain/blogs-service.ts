import {blogsRepository} from "../Repositories/blogs-repository";

export type blog = { // todo хранить тип здесь или лучше в db?
    id?: string,
    name?: string,
    description?: string,
    websiteUrl?: string,
    createdAt?: string
}

export const blogsService = {
    async findBlogById(id: string): Promise<blog | null>{
        return await blogsRepository.findBlogById(id);
    },
    async deleteAllBlogs(): Promise<void> {
        return await blogsRepository.deleteAllBlogs();
    },
    async createNewBlog(b: blog): Promise<blog> {
        const newBlog: blog = {
            id: (new Date().valueOf()).toString(),
            name: b.name || 'mock',
            description: b.description || 'mock',
            websiteUrl: b.websiteUrl || 'mock',
            createdAt: (new Date()).toISOString()
        };
        return await blogsRepository.createNewBlog(newBlog);
    },
    async updateBlogById(id: string, b: blog): Promise<boolean> {
        return await blogsRepository.updateBlogById(id, b);
    },
    async deleteBlogById(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogById(id);
    }
};
