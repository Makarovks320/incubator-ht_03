type post = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
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
    findPostById(id: string): post{
        const post = posts.filter(b => b.id === id);
        return post[0];
    },
    deleteAllPosts(): void {
        posts = [];
    }
};