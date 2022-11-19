type blog = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}
let blogs: blog[] = [
    {
        id: "1",
        name: "name",
        description: "description",
        websiteUrl: "websiteUrl"
    },
    {
        id: "2",
        name: "name",
        description: "description",
        websiteUrl: "websiteUrl"
    }
];

export const blogsRepository = {
    getAllBlogs(): blog[]{
        return blogs;
    },
    findBlogsById(id: string): blog{
        const blog = blogs.filter(b => b.id === id);
        return blog[0];
    },
    deleteAllBlogs(): void {
        blogs = [];
    }
};