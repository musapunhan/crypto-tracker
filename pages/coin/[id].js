// import {getServerSideProps} from "../index";
import Head from "next/head";

const Coin = ({coin}) => {
    console.log(coin)
    const {name, symbol, market_data, image} = coin
    const {
        current_price,
        ath,
        market_cap,
        total_volume,
        price_change_percentage_24h,
        price_change_percentage_7d,
        price_change_percentage_30d,
        price_change_percentage_1y
    } = market_data

    return (
        <>
        <div>
            <Head>
                <title>{name} | qriptique</title>
            </Head>
        </div>
        <div className="mx-4 md:mx-auto md:w-1/2 font-body bg-white dark:bg-gray-800 dark:border-opacity-0 overflow-hidden rounded-2xl shadow-lg">
            <section className="p-8 flex justify-center items-center flex-col lg:flex-row">
                    <img className="h-12" src={image.large} alt={name}/>
                    <div className="px-6 py-4 flex items-center">
                        <h1 className="font-semibold text-xl">{name}</h1>
                        <h2 className="text-xl text-gray-400 ml-4">{symbol.toUpperCase()}</h2>
                    </div>
            </section>
            <section className="xl:flex text-md">
                    <div className="xl:w-1/2 bg-yellow-300 dark:bg-yellow-600 p-8">
                        <div className="flex">
                            <div className="w-1/2 font-semibold text-md">Price: </div>
                            <div className="w-1/2 text-right">${current_price.usd.toLocaleString()}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-semibold text-md">ATH: </div>
                            <div className="w-1/2 text-right">${ath.usd.toLocaleString()}</div>
                        </div>
                        <div className="flex ">
                            <div className="w-1/2 font-semibold text-md">Market cap:</div>
                            <div className="w-1/2 text-right">${market_cap.usd.toLocaleString()}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-semibold text-md">Volume:</div>
                            <div className="w-1/2 text-right">${total_volume.usd.toLocaleString()}</div>
                        </div>
                </div>
                <div className="xl:w-1/2 p-8 bg-gray-200 dark:bg-gray-500">
                        <div className="flex">
                            <div className="w-1/2 font-semibold text-md">Change 24H: </div>
                            <div className="w-1/2 text-right">{price_change_percentage_24h < 0 ? (
                                <p className="text-red-600 dark:text-red-400">
                                    {price_change_percentage_24h.toFixed(2)}%
                                </p>
                            ) : (
                                <p className="text-green-600 dark:text-green-400">
                                    {price_change_percentage_24h.toFixed(2)}%
                                </p>
                            )}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-semibold text-md">Change 7d: </div>
                            <div className="w-1/2 text-right">{price_change_percentage_7d < 0 ? (
                            <p className="text-red-600 dark:text-red-400">
                                {price_change_percentage_7d.toFixed(2)}%
                            </p>
                        ) : (
                            <p className="text-green-600 dark:text-green-400">
                                {price_change_percentage_7d.toFixed(2)}%
                            </p>
                        )}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 font-semibold text-md">Change 30d: </div>
                            <div className="w-1/2 text-right">
                                {price_change_percentage_30d < 0 ? (
                                    <p className="text-red-600 dark:text-red-400">
                                        {price_change_percentage_30d.toFixed(2)}%
                                    </p>
                                ) : (
                                    <p className="text-green-600 dark:text-green-400">
                                        {price_change_percentage_30d.toFixed(2)}%
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex">
                                <div className="w-1/2 font-semibold text-md">Change 1 year: </div>
                                <div className="w-1/2 text-right">
                                    {price_change_percentage_1y < 0 ? (
                                <p className="text-red-600 dark:text-red-400">
                                    {price_change_percentage_1y.toFixed(2)}%
                                </p>
                            ) : (
                                <p className="text-green-600 dark:text-green-400">
                                    {price_change_percentage_1y.toFixed(2)}%
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export async function getServerSideProps(context) {
    const {id} = context.query;

    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

    const data = await res.json();

    return {
        props: {
            coin: data
        }
    };
}

export default Coin;