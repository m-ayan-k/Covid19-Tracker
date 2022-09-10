import React,{useState,useEffect} from "react";
import { fetchDailyData } from "../../api";
import {Line,Bar} from 'react-chartjs-2';

import styles from './Graph.module.css';

// below 3 line are addded because of error to know error remove below lines
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);



const Graph=({data :{ confirmed, recovered, deaths },country})=>{
    const [dailyData,setdailydata]=useState([]);

    useEffect(()=>{
        const fetchAPI= async ()=>{
            // const dailyData=await fetchDailyData(); 
            setdailydata(await fetchDailyData());
        }
        fetchAPI();

    },[]);
    // console.log(data);
    const lineChart=(
        dailyData.length!==0
        ?(
            <Line
            data={{
                labels:dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                datasets:[{
                    data:dailyData.map((data) => data.confirmed),
                    label:'Infected',
                    borderColor:'#3333ff',
                    fill:true
                },{
                    data:dailyData.map((data) => data.deaths),
                    label:'Deaths',
                    borderColor:'red',
                    backgroundColor:'rgba(255,0,0,0.5)',
                    fill:true
                }]
            }}
            />
        ):null
        
    );

    const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 255, 0.8)','rgba(0, 255, 0, 0.8)','rgba(255, 0, 0, 0.8)'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` },
            }}
          />
        ) : null
      );
    return(
        <div className={styles.container}>
            {country? barChart : lineChart}
        </div>
    )
}

export default Graph;