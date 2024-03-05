import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FactTypes } from 'src/FactViewer/FactsTab';
import Fact, { LanguageType } from 'src/models/Fact';

export const FactApi = createApi({
  reducerPath: 'FactApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://uselessfacts.jsph.pl/api/v2/facts/' }),
  endpoints: builder => ({
    getFact: builder.query<Fact, {
      factType: FactTypes,
      language: LanguageType
    }>({
      query: req => {
        let q = req.factType;
        if(req.language)
          q += "?language=" + req.language
        return q;
      }
    }),
  }),
})
export const { useGetFactQuery } = FactApi;
