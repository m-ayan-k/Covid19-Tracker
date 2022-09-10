import React from "react";

// import Cards from './components/Cards/Cards.jsx';
// import Graph from './components/Graph/Graph.jsx'; not good way to import components
// import CountryPicker from './components/Countrytopick/CountryPicker.jsx';

import {Cards,Graph,CountryPicker} from './components';/*it directly search for index.js
 so we dont write it.*/

import style from './App.module.css';/* module use so that this file does not interfer with other and 
for more infromation refer to google. */

import {fetchData} from './api/index.js'; 

import coronaimage from './image/image.png';

class App extends React.Component{
  state = {
    data:{},
    country:'',
  }
  async componentDidMount(){
    const fetcheddata= await fetchData();// we use await beacuse it asycn function
    this.setState({data:fetcheddata});
  }
  CountryChange = async (country)=>{
    const fetcheddata= await fetchData(country);
    // console.log(fetcheddata);
    this.setState({data:fetcheddata,country:country});  
  }
  render(){
    // const { data, country} =this.state;
    return(
      <div className={style.container}>{/* u should always use this style to give classname[style.classname or id] */}
        <img className={style.image} src={coronaimage} alt="COVID-19 IMAGE" />
        <Cards data={this.state.data}/>
        <CountryPicker CountryChange={this.CountryChange}/>
        <Graph data={this.state.data} country={this.state.country}/>
      </div>
    )
  }
}

export default App;