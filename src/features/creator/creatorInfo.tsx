import { createSlice } from "@reduxjs/toolkit";
import Nishit from "../../media/creator_photos/Nishit.jpg";
import Sainikhil from "../../media/creator_photos/Sainikhil.jpg";

export interface creatorInfo {
    name: string,
    desciption: string,
    role: string,
    img: any,
    link: {
        mail?: string,
        youtube?: string,
        linkedIn?: string,
        github?: string,
        twitter?: string,
        instagram?: string,
    }
}

const initialState: creatorInfo[] = [
    {
        name: "Gaurang Raje",
        desciption: "",
        role: "Machince Learning",
        img: "",
        link: {
            mail: "gaurang1105@gmail.com",
            youtube: "https://www.youtube.com/channel/UC0ZH4wmkg7Zj86pegggpQ1A",
            linkedIn: "https://www.linkedin.com/in/gaurang-raje-840a1a194/",
            github: "https://github.com/GaurangRaje",
        }
    },
    {
        name: "Nishit Hingu",
        desciption: "",
        role: "Web Developer",
        img: Nishit,
        link: {
            mail: "mailto:nishithingu@gmail.com",
            youtube: "",
            linkedIn: "https://www.linkedin.com/in/nishit-hingu-4b4892194/",
            github: "https://github.com/NishitHingu",
            instagram: "",
        }
    },
    {
        name: "Sainikhil Pati",
        desciption: "",
        role: "Data Analysist",
        img: "Sainikhil",
        link: {
            mail: "mailto:gaurang1105@gmail.com",
            youtube: "https://www.youtube.com/channel/UC2bnLwDZw6TjuyVVg-6HXow",
            linkedIn: "https://www.linkedin.com/in/sainikhil-reddy-0b2990216/",
            github: "https://github.com/sainikhil-10",
            twitter: "https://mobile.twitter.com/tw3taboutit",
        }
    },
]

const creatorInfo = createSlice({
    name: "creatorInfo",
    initialState,
    reducers: {},
});

export default creatorInfo.reducer;