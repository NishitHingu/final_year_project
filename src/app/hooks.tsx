/* eslint-disable react-hooks/rules-of-hooks */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getStockList = () => useAppSelector(state => state.stock.stockList);
export const getStockInfo = () => useAppSelector(state => state.stock.stockInfo);
export const getStockInfoStatus = () => useAppSelector(state => state.stock.stockInfoStatus);
export const getHistoricalStockData = () => useAppSelector(state => state.stock.historicalData);
export const getHistoricalStockDataStatus = () => useAppSelector(state => state.stock.historicalDataStatus);
export const getStockNews = () => useAppSelector(state => state.stock.stockNews);
export const getStockNewsStatus = () => useAppSelector(state => state.stock.stockNewsStatus);

export const getHistoricalClosePriceData = () => {
    // const data = useAppSelector(state => state.stock.historicalData);
    // let formattedData: number[][] | undefined = data?.map(item => {
    //     let date = new Date(item.date).getTime();
    //     let price = item.close;
    //     return [date, price];
    // });
    // return formattedData;

    // For getting data from python API
    const data = useAppSelector(state => state.stock.historicalData);
    let formattedData: number[][] | undefined = data?.map(item => {
        let date = new Date(item.x).getTime();
        let price = item.y[3];
        return [date, price];
    });
    return formattedData;
}

export const getCandleStickData = () => {
    const data = useAppSelector(state => state.stock.historicalData);
    // let formattedData: {x: Date, y: number[]}[] | undefined = data?.map(item => {
    //     let date = new Date(item.date);
    //     let price = [item.open, item.high, item.low, item.close];
    //     return { x: date, y: price }
    // });
    // console.log(formattedData);
    // return formattedData;
    return data;
}

export const getCreatorInfo = () => useAppSelector(state => state.creatorInfo);
