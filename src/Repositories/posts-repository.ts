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
    getAllPosts(): post[]{
        return posts;
    },
    findPostById(id: string): post | null{
        const post = posts.filter(b => b.id === id);
        return post ? post[0] : null;
    },
    deleteAllPosts(): void {
        posts = [];
    },
    createNewPost(p: post): post {
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
    updatePostById(id: string, p: post): post | null {
        const postToUpdate = this.findPostById(id);
        if (!postToUpdate) {
            return null;
        }
        updatePost(postToUpdate, p);
        return postToUpdate;
    },
    deletePostById(id: string): null | true {
        const postToDelete = this.findPostById(id);
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