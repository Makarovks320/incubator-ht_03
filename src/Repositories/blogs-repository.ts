export type blog = {
    id?: string,
    name?: string,
    description?: string,
    websiteUrl?: string
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
    findBlogById(id: string): blog | null{
        const blog = blogs.filter(b => b.id === id);
        return blog ? blog[0] : null;
    },
    deleteAllBlogs(): void {
        blogs = [];
    },
    createNewBlog(b: blog): blog {
        const newBlog = {
            id: (new Date().valueOf()).toString(),
            name: b.name || 'mock',
            description: b.description || 'mock',
            websiteUrl: b.websiteUrl || 'mock'
        };
        blogs.push(newBlog);
        return newBlog;
    },
// @ts-ignore todo why????
    updateBlogById(id: string, b: blog): blog | null {
        const blogToUpdate = this.findBlogById(id);
        if (!blogToUpdate) {
            return null;
        }
        updateBlog(blogToUpdate, b);
        return blogToUpdate;
    },
    deleteBlogById(id: string): null | void {
        const blogToDelete = this.findBlogById(id);
        if (!blogToDelete) return null;
        blogs = blogs.filter(b => b.id !== id);
    }
};

function updateBlog(blog: blog, newData: blog): void {
    newData.name ? blog.name = newData.name : null;
    newData.description ? blog.description = newData.description : null;
    newData.websiteUrl ? blog.websiteUrl = newData.websiteUrl : null;
}