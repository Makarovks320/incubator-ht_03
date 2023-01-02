import {postsCollection} from "./db";
import {blog, DEFAULT_PROJECTION} from "./blogs-repository";

export type postQueryParamsType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: 'asc' | 'desc'
}

export const postsQueryRepository = {
    async getPosts(queryParams: postQueryParamsType, blogId?): Promise<blog[]> {

        const sort = {};
        if (queryParams.sortBy) {
            sort[queryParams.sortBy] = queryParams.sortDirection === 'asc' ? 1 : -1;
        }

        const filter = {};
        if (blogId) {
            filter['blogId'] = blogId;
        }
        // todo почему работает без эвэйта?
        return postsCollection.find({}, { projection: DEFAULT_PROJECTION})
            .sort(sort)
            .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
            .limit(queryParams.pageSize)
            .toArray();
    }
};