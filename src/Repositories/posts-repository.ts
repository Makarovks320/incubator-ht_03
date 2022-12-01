type post = {
    id?: string,
    title?: string,
    shortDescription?: string,
    content?: string,
    blogId?: string,
    blogName?: string
}
let posts: post[] = [
    {
        id: "1",
        title: "title1",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string"
    },
    {
        id: "2",
        title: "title2",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string"
    }
];

export const postsRepository = {
    async getAllPosts(): Promise<post[]>{
        return posts;
    },
    async findPostById(id: string): Promise<post | null>{
        const post = posts.filter(b => b.id === id);
        return post ? post[0] : null;
    },
    async deleteAllPosts(): Promise<void> {
        posts = [];
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
        posts.push(newPost);
        return newPost;
    },
    async updatePostById(id: string, p: post): Promise<post | null> {
        const postToUpdate = await this.findPostById(id);
        if (!postToUpdate) {
            return null;
        }
        updatePost(postToUpdate, p);
        return postToUpdate;
    },
    async deletePostById(id: string): Promise<null | true> {
        const postToDelete = await this.findPostById(id);
        if (!postToDelete) return null;
        posts = posts.filter(b => b.id !== id);
        return true;
    }
};

function updatePost(post: post, newData: post): void {
    newData.title ? post.title = newData.title : null;
    newData.shortDescription ? post.shortDescription = newData.shortDescription : null;
    newData.content ? post.content = newData.content : null;
    newData.blogId ? post.blogId = newData.blogId : null;
    newData.blogName ? post.blogName = newData.blogName : null;
}