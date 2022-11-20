import request from 'supertest';
import {app} from "../../src";

describe('/blogs', () => {
    beforeAll(async () => {
        await request(app).delete('/testing/all-data');
    });

    it('should return an empty array', async () => {
         await request(app)
             .get('/blogs')
             .expect(200,[]);
    });

    let createdBlog = null;
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
    })
});