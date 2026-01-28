import { configureStore } from "@reduxjs/toolkit";
import teaminforeducer from "./teaminfoslice"
const appStore=configureStore({
    reducer:{
        Info:teaminforeducer
    }
});
export default appStore;