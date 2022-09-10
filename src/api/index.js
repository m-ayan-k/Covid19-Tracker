import axios from "axios";

const url='https://covid19.mathdro.id/api';

/* by adding async befor any function means it will return Promise(object) and by adding await makes
 JavaScript wait until that promise settles and returns its result */
export const fetchData=async (country)=>{
    let changeableurl=url;
    if(country){
        changeableurl=`${url}/countries/${country}`;
    }
    try {
        const {data:{confirmed,recovered,deaths,lastUpdate}}=await axios.get(changeableurl);
        return {confirmed,recovered,deaths,lastUpdate};

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData=async ()=>{
    try {
        const {data}= await axios.get(`${url}/daily`);
        const modifieddata=data.map((dailydata)=>({
            confirmed:dailydata.confirmed.total,
            deaths:dailydata.deaths.total,
            date:dailydata.reportDate,
        }));
        return modifieddata;
    } catch (error) {
        console.log(error);  
    }
}
export const fetchCountries= async ()=>{
    try {
        const {data:{countries}} =await axios.get(`${url}/countries`);
        return countries.map((country)=>country.name);
    } catch (error) {
        console.log(error);
    }
}