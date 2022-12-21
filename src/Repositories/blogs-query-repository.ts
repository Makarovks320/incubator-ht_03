import {blogCollection} from "./db";
import {blog, DEFAULT_PROJECTION} from "./blogs-repository";

export type queryParamsType = {
    searchNameTerm: string | null,
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: 'asc' | 'desc'
}

export const blogsQueryRepository = {
    async getBlogs(queryParams: queryParamsType): Promise<blog[]> {

        const filter: any = {};
        if (queryParams.searchNameTerm) {
            filter.name = {$regex: queryParams.searchNameTerm};
        }

        const sort = {};
        if (queryParams.sortBy) {
            sort[queryParams.sortBy] = queryParams.sortDirection === 'asc' ? 1 : -1;
        }

        // todo почему работает без эвэйта?
        return blogCollection.find(filter, { projection: DEFAULT_PROJECTION})
            .sort(sort)
            .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
            .limit(queryParams.pageSize)
            .toArray();
    }
};