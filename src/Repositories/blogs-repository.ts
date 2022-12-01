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
    async getAllBlogs(): Promise<blog[]>{
        return blogs;
    },
    async findBlogById(id: string): Promise<blog | null>{
        const blog = blogs.filter(b => b.id === id);
        return blog ? blog[0] : null;
    },
    async deleteAllBlogs(): Promise<void> {
        blogs = [];
    },
    async createNewBlog(b: blog): Promise<blog> {
        const newBlog = {
            id: (new Date().valueOf()).toString(),
            name: b.name || 'mock',
            description: b.description || 'mock',
            websiteUrl: b.websiteUrl || 'mock'
        };
        blogs.push(newBlog);
        return newBlog;
    },
    async updateBlogById(id: string, b: blog): Promise<blog | null> {
        const blogToUpdate = await this.findBlogById(id);
        if (!blogToUpdate) {
            return null;
        }
        updateBlog(blogToUpdate, b);
        return blogToUpdate;
    },
    async deleteBlogById(id: string): Promise<true | null> {
        const blogToDelete = await this.findBlogById(id);
        if (!blogToDelete) return null;
        blogs = blogs.filter(b => b.id !== id);
        return true;
    }
};

function updateBlog(blog: blog, newData: blog): void {
    newData.name ? blog.name = newData.name : null;
    newData.description ? blog.description = newData.description : null;
    newData.websiteUrl ? blog.websiteUrl = newData.websiteUrl : null;
}