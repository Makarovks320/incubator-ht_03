import {blogCollection} from "./db";
import {blog, DEFAULT_PROJECTION} from "./blogs-repository";

export type blogsQueryParamsType = {
    searchNameTerm: string | null,
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: 'asc' | 'desc'
}

type blogsOutput = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: blog[]
}

export const blogsQueryRepository = {
    async getBlogs(queryParams: blogsQueryParamsType): Promise<blogsOutput> {

        const filter: any = {};
        if (queryParams.searchNameTerm) {
            filter.name = {$regex: queryParams.searchNameTerm, $options: 'i'};
        }

        const sort = {};
        if (queryParams.sortBy) {
            sort[queryParams.sortBy] = queryParams.sortDirection === 'asc' ? 1 : -1;
        }

        // todo почему работает без эвэйта?
        const res = await blogCollection.find(filter, { projection: DEFAULT_PROJECTION})
            .sort(sort)
            .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
            .limit(queryParams.pageSize)
            .toArray();
        const totalCount = await blogCollection.find(filter).count();
        return {
            pagesCount: Math.ceil(totalCount / queryParams.pageSize),
            page: queryParams.pageNumber,
            pageSize: queryParams.pageSize,
            totalCount: totalCount,
            items: res
        }
    }
};