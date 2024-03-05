import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const gameApi = createApi({
    reducerPath: 'gameApi',
    // connexion à l'API url de base
    baseQuery: fetchBaseQuery({baseUrl : 'http://localhost:3001'}),
    endpoints : (builder) => ({
        getPastries : builder.query({
            query : () => 'game/pastries'
        }),
        getWin : builder.query({
            query : (count) => `/game/win-pastries/${count}`
        }),
        getLogOut : builder.query({
            query : () => `/logout`
        }),
        postLogin : builder.query({
            query : (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            })
        }),
    })
})

// hook qui permet d'utiliser l'API de createApi
export const { useGetPastriesQuery, useGetWinQuery, useGetLogOutQuery, usePostLoginQuery } = gameApi