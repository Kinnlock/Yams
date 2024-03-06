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
        getAdminPastries : builder.query({
            query : () => '/api/pastries'
        })
    })
})

// hook qui permet d'utiliser l'API de createApi
export const { useGetPastriesQuery, useGetWinQuery, useGetAdminPastriesQuery } = gameApi