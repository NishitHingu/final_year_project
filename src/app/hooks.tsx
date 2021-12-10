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

export const getHistoricalClosePriceData = () => {
    const data = useAppSelector(state => state.stock.historicalData);
    let formattedData: number[][] | undefined = data?.map(item => {
        let date = new Date(item.date).getTime();
        let price = item.close;
        return [date, price];
    });
    return formattedData;
}