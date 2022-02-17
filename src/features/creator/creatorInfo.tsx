import { createSlice } from "@reduxjs/toolkit";

export interface creatorInfo {
    name: string,
    desciption: string,
    img: string,
}

const initialState: creatorInfo[] = [
    {
        name: "Nishit",
        desciption: "",
        img: "",
    },
    {
        name: "Sainikhil",
        desciption: "",
        img: "",
    },
    {
        name: "Bobby",
        desciption: "",
        img: "",
    }

]

const creatorInfo = createSlice({
    name: "creatorInfo",
    initialState,
    reducers: {},
});

export default creatorInfo.reducer;