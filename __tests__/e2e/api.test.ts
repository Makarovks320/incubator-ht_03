import request from 'supertest';
import {app} from "../../src";
import {blog} from "../../src/Repositories/blogs-repository";

describe('/blogs', () => {
    beforeAll(async () => {
        await request(app).delete('/testing/all-data');
    });

    it('should return an empty array', async () => {
         await request(app)
             .get('/blogs')
             .expect(200,[]);
    });

    let createdBlog: blog | null = null;
    it('should create new blog', async () => {
        const response = await request(app)
            .post('/blogs')
            .send({
                name: "name test",
                description: "description test",
                websiteUrl: "websiteUrl test"
            })
            .expect(201);
        createdBlog = response.body;
        expect(createdBlog).toEqual({
            id: expect.any(String),
            name: "name test",
            description: "description test",
            websiteUrl: "websiteUrl test"
        });

        await request(app)
            .get('/blogs')
            .expect(200,[createdBlog]);
    });

    it('should return correct blog by id', async () => {
        await request(app)
            .get('/blogs/' + createdBlog?.id)
            .expect(200,createdBlog);
    });


    it('should return 404', async () => {
        await request(app)
            .get('/blogs/' + 5)
            .expect(404);
    });
});