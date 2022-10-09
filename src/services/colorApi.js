import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const colorApi = createApi({
    reducerPath: 'colorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://reqres.in/api/"
    }),
    // create tag, bisa buat banyak tag karena merupakan array
    // misal dalam 1 endpont ada banyak resources (/color, /shape, /pantone, etc)
    tagTypes: ['Color'],
    endpoints: (builder) => ({
        getColors: builder.query({
            query: () => "colors",
            // beritahu di endpoint ini, tag apa yang terkait
            // nantinya jika tag ini di invalidate, maka query akan di trigger ulang
            providesTags: ['Color']
        }),
        getColorById: builder.query({
            query: (id) => `colors/${id}`
        }),
        addColor: builder.mutation({
            query: (color) => ({
                url: "colors",
                method: "POST",
                body: color
            }),
            // lakukan invalidate tag jika mutation ini terjadi
            // jadinya dia memberitahu kalau tag ini sudah invalid
            // tolong semua yang terkait di fetch ulang
            invalidatesTags: ['Color']
        }),
        updateColor: builder.mutation({
            query: ({ id, color }) => ({
                url: `colors/${id}`,
                method: "PUT",
                body: color
            }),
            invalidatesTags: ['Color']
        }),
        deleteColor: builder.mutation({
            query: (id) => ({
                url: `colors/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Color']
        })
    })
});

export const {
    useGetColorsQuery,
    useGetColorByIdQuery, 
    useAddColorMutation, 
    useUpdateColorMutation, 
    useDeleteColorMutation
} = colorApi;