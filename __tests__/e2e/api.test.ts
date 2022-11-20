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
    })
});