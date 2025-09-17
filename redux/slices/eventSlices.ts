import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: '/events/event',
        method: 'POST',
        body: eventData,
      }),
    }),
  })
});

export const { useCreateEventMutation } = eventApi;
