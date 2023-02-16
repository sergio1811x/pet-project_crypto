import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const cryptoNewsHeaders = {
//   'X-BingApis-SDK': 'true',
//   'X-RapidAPI-Key': '37df9f891fmshd52cb97324c15b6p102306jsn4a88c1a6868a',
//   'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
// };
//
// const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news';
//
// const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

//https://newsapi.org/v2/everything?q=${newsCategory}&sortBy=publishedAt&apiKey=a52763cd0c1b4a459f65835210cdd173


const baseUrl = 'https://gnews.io/api/v4';

const createRequest = (url: string) => ({ url});

export const newsApi = createApi({
  reducerPath: 'cryptoNews',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder: any) => ({
    getNews: builder.query({
      query: ({ newsCategory, count }: { newsCategory: string; count: string }) =>
        createRequest(
          `search?q=${newsCategory}&apikey=fc87d5d4b5d6580dc22ea74120a68e55`,
        ),
    }),
  }),
});
export const { useGetNewsQuery } = newsApi;




