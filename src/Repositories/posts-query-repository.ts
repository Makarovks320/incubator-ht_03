import {postsCollection} from "./db";
import {DEFAULT_PROJECTION} from "./blogs-repository";
import {post} from "./posts-repository";

export type postQueryParamsType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: 'asc' | 'desc'
}

type postsOutput = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: post[]
}
export const postsQueryRepository = {
    async getPosts(queryParams: postQueryParamsType, blogId?): Promise<postsOutput> {

        const sort = {};
        if (queryParams.sortBy) {
            sort[queryParams.sortBy] = queryParams.sortDirection === 'asc' ? 1 : -1;
        }

        const filter = {};
        if (blogId) {
            filter['blogId'] = blogId;
        }
        // todo почему работает без эвэйта?
        const res = await postsCollection.find({}, { projection: DEFAULT_PROJECTION})
            .sort(sort)
            .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
            .limit(queryParams.pageSize)
            .toArray();

        const totalCount = await postsCollection.find(filter).count();
        return {
            pagesCount: Math.ceil(totalCount / queryParams.pageSize),
            page: queryParams.pageNumber,
            pageSize: queryParams.pageSize,
            totalCount: totalCount,
            items: res
        }
    }
};