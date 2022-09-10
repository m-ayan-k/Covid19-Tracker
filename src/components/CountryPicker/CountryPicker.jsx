import React,{useState,useEffect} from "react";
import { NativeSelect,FormControl} from "@material-ui/core";
import {fetchCountries} from '../../api';
import styles from './CountryPicker.module.css';
const Countrypicker=({CountryChange})=>{
    const [fetchedCountries, setfetchedCountries]=useState([]);

    useEffect(()=>{
        const fetcAPI= async ()=>{
            setfetchedCountries(await fetchCountries());
        }
        fetcAPI();
    },[]);
    //because of [setfetchedCountries]  it will run only once ot it will run endlessly 
    return(
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e)=> CountryChange(e.target.value)}>
                <option value=''>Global</option>
                {fetchedCountries.map((country,i)=><option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default Countrypicker;