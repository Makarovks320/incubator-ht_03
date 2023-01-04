import {postsRepository} from "../Repositories/posts-repository";

type post = {
    id?: string,
    title?: string,
    shortDescription?: string,
    content?: string,
    blogId?: string,
    blogName?: string,
    createdAt?: string
}

export const postsService = {
    async getAllPosts(): Promise<post[]>{
        return postsRepository.getAllPosts();
    },
    async findPostById(id: string): Promise<post | null>{
        return postsRepository.findPostById(id);
    },
    async deleteAllPosts(): Promise<void> {
        await postsRepository.deleteAllPosts();
    },
    async createNewPost(p: post, blogId?, blogName?): Promise<post> {
        const newPost: post = {
            id: (new Date().valueOf()).toString(),
            title: p.title,
            shortDescription: p.shortDescription,
            content: p.content,
            blogId: blogId ? blogId : p.blogId,
            blogName: blogName ? blogName : p.blogName,
            createdAt: (new Date()).toISOString()
        };
        return await postsRepository.createNewPost(newPost);
    },
    async updatePostById(id: string, p: post): Promise<boolean> {
        return postsRepository.updatePostById(id, p);
    },
    async deletePostById(id: string): Promise<boolean> {
        return postsRepository.deletePostById(id);
    }
};
