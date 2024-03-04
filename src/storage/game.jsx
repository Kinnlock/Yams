import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const gameApi = createApi({
    reducerPath: 'gameApi',
    // connexion à l'API url de base
    baseQuery: fetchBaseQuery({baseUrl : 'http://localhost:3001'}),
    endpoints : (builder) => ({
        getPastries : builder.query({
            query : () => `game/pastries`
        }),

        
    })
})

// hook qui permet d'utiliser l'API de createApi
export const { useGetPastriesQuery } = gameApi 


