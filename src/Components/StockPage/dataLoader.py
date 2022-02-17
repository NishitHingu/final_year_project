return_data = {"high": {predicted: float[], actual: float[]},
                "low": {predicted: float[], actual: float[]},
                "open": {predicted: float[], actual: float[]},
                "close": {predicted: float[], actual: float[]}}

handle_stock(stock_name: str) -> typeof return_data:
    """ -first we need to get the data from the yahoo finacne api
        -then use the function ditto as made by gaurang
        -format the ouput/predicted data as specified by return_datax"""