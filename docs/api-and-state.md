---
id: api-and-state
title: API & State Management
sidebar_position: 3
---

# API Integration & State Management

## CoinGecko API

*Note: Not entirely sure what CoinGecko's update frequency is.*

Using the **axios** library, a **GET** request is sent to CoinGecko's API endpoint to retrieve cryptocurrency data. The response included unnecessary data, so it was filtered before being sent to the client side. <br></br>

*/src/app/api/getCoinData/route.ts*
```
import axios from "axios"

//"simple" api call doesn't get images, see https://docs.coingecko.com/v3.0.1/reference/simple-price

//btc,eth,solana,polkadot,sui
const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Csolana%2Cpolkadot%2Csui"

const API_KEY = "..."

const getCoinData = async() => {
    const data = (await axios.get(URL,{
        headers: {
            'Content-Type': 'application/json',
            'x-cg-demo-api-key': API_KEY
        }
    })).data
    //remove all extra information
    const filteredData = data.map(({name,image,current_price}:ICoinData)=> ({name,image,current_price}))
    return filteredData
}

export default getCoinData
```
The "simple" option had a low number of permitted requests and did not include images, so I opted to use the "Coins" endpoint (Requires API key).

## State Management

### Query Client Provider
I chose **Tanstack React Query** due to it's seamless integration with Next.js. By wrapping the layout in a Query Client Provider, we are able to manage and cache data throughout the application with ease.

*/src/app/components/QueryProvider.tsx*
```
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";


const QueryProvider = ({children}:{children:React.ReactNode}) => {
    const [queryClient] = useState(()=> new QueryClient())
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
```

*/src/app/layout.tsx*
```
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased  bg-gradient-to-b from-dark-purple to-light-purple text-white`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```
### Fetching & Revalidating Data 
The useQuery hook is utilized to manage the fetching and caching of the cryptocurrency data.

*/src/app/components/Hero.tsx*
```
import { useQuery } from "@tanstack/react-query"
 const coinData  = useQuery({
        queryKey:["coins"],
        queryFn: getCoinData,
        //refetch data every 5 minutes
        refetchInterval: 5 *60* 1e3,
        //cached for 10min if data is unused 
        gcTime: 10 * 60 * 1e3,
        //if component is rerendered data will be refreshed after this duration has passed
        staleTime: 2 * 60 * 1000
    })
```
1. ```refetchInterval``` indicates the timeframe in which the data will automatically be refreshed (regardless of user interaction).
2. ```gcTime``` indicates the timeframe in which data will be kept in memory, despite it not being used by any component.
3. ```staleTime``` indicates the timeframe that data is not considered "old", i.e data will be grabbed from cache. If a component is re-rendered after this duration, then the data will be refetched.

