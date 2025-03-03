---
id: features
title: Features (Searching & Manual Refresh)
sidebar_position: 5
---

# Features

## Searching For Cryptocurrencies
The state management for displaying certain crypto currencies is handled on the client side using the useState hook. Cryptocurrencies appear based on the user's input in the search bar. 

*/src/app/components/Hero.tsx*
```
const Hero = () => {
    const [search,setSearch] = useState<string>("")

    const filteredCoins = coinData.data?.filter((coin:ICoinData)=> {
            return search.toLowerCase().includes(coin.name.toLowerCase())
        })
    ...
    <input
    className="rounded-2xl border-white border-2 p-2 w-3/4 md:w-1/2 text-center "
    type="text" 
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search for cryptos!" />  
    ...
}
```
The client side state is set to contain the values entered by the user, upon which the filteredCoins function checks if that entered string includes any of the coin names fetched from CoinGecko's API. Each coin is then mapped to a coin component to show the user.

*/src/app/components/Hero.tsx*
```
const CoinComponent = ({coin}:{coin:ICoinData}) => {
    //format to usd 
    const usdPrice = new Intl.NumberFormat("en-US", {
        style:"currency",
        currency: "USD"
    }).format(coin.current_price)

    return (
        <div className="flex flex-col items-center justify-center gap-4  p-4">
            <div className="object-contain flex items-center justify-center">
                <Image className="w-full max-w-3/4 h-auto" width={150} height={150} src={coin.image} alt={`image of cryptocurrency ${coin.name}`}/>
            </div>
            <h3 >{coin.name}</h3>
            <p>{usdPrice}</p>
        </div>
    )
}


const Hero = () => {
    ...
    {
        filteredCoins?.map((coin:ICoinData,i:number) => {
                return <CoinComponent key={i} coin={coin}/>
        })
    }
    ...   
}
```

## Manual Refresh
Manually refreshing data is handled by **Tanstack React Query**. Utilizing the ```refetch()``` function provided by the coinData object, any time a user clicks the button the data will be refetched.

```
const Hero = () => {
    ...
    <button className="cursor-pointer bg-gradient-to-tr from-vibrant-blue to-vibrant-pink p-4 rounded-2xl " 
        onClick={()=> coinData.refetch()}>
            Refresh
    </button>
    ...   
}
```


