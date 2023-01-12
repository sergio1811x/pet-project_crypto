import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  'X-RapidAPI-Key': '37df9f891fmshd52cb97324c15b6p102306jsn4a88c1a6868a',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news';

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const newsApi = createApi({
  reducerPath: 'cryptoNews',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder: any) => ({
    getNews: builder.query({
      query: ({ newsCategory, count }: { newsCategory: string; count: string }) =>
        createRequest(
          `/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
        ),
    }),
  }),
});
export const { useGetNewsQuery } = newsApi;
