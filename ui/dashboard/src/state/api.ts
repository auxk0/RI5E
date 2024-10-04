import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse, GetTradesResponse } from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000'}),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products", "Transactions", "Trades"],
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: () => "kpi/kpis/",
          providesTags: ["Kpis"]  
        }),
        getProducts: build.query<Array<GetProductsResponse>, void>({
            query: () => "product/products/",
          providesTags: ["Products"]  
        }),
        getTransactions: build.query<Array<GetTransactionsResponse>, void>({
            query: () => "transaction/transactions/",
          providesTags: ["Transactions"]  
        }),
        getTrade: build.query<Array<GetTradesResponse>, void>({
            query: () => "trade/trade/",
          providesTags: ["Trades"]  
        })
    })
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery, useGetTradeQuery } = api;