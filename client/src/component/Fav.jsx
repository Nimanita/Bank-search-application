import React from 'react';
import {useState , useEffect} from 'react';
import {useSelector , useDispatch } from 'react-redux';
import {useHistory } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import {connect} from "react-redux";
import './App.css';
import FavMenubar from './FavMenubar';
import FavTable from './FavTable';
import { Table } from 'react-bootstrap';
//import {useSelector , useDispatch } from 'react-redux';
import  FavSearchdata  from './redux/bankdata/FavSearching';
import  Favdata  from './redux/bankdata/Favdata';
function Fav(props) {
    /*var f= JSON.parse(localStorage.getItem("favourites"));
    var l =f.length;
    f = f.slice(1,l);
    useEffect()*/
    const [flag,setflag] = useState(0);
    const dispatch = useDispatch();
    useEffect(async ()=>{
      if(flag === 0)
      {
      const data2 = await axios.get("http://localhost:4000/banks").then((res) => {
        const data = res.data;
         console.log("fetchdata reducer menubar",data);
        /* {(data && data.map((data,index) => (
           data.key=index
     
    
       )))}*/
         dispatch(FavSearchdata(data));
         dispatch(Favdata(data));
         });
         setflag(1);
      } //console.log("useeffect fav" , data2);
    });
if(flag === 1)
{
  return (
    <div className="screen">
    <FavMenubar/>
    <FavTable/>
  </div>
  );
  }
  return(null);
}
Fav = connect(mapStateToProps)(Fav);
function mapStateToProps(state){
  
  return {
   
      searchd: state.favdata,
      page : state.favpage
  }
}

export default Fav;
