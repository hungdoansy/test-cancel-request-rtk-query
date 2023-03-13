import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cancelApi = createApi({
    reducerPath: "cancelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://deelay.me/5000",
    }),
    endpoints: (builder) => ({
        getInfo: builder.query<any, undefined>({
            query: () => ({
                url: "https://hub.dummyapis.com/delay?seconds=2",
            }),
        }),
    }),
})

export default cancelApi
