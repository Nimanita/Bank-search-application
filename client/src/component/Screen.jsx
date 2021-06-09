import React from 'react';
import {useEffect,useState} from 'react';
import {useSelector , useDispatch } from 'react-redux';
import  Searchdata  from './redux/bankdata/Searching';
import  FavSearchdata  from './redux/bankdata/FavSearching';
import Favdata from './redux/bankdata/Favdata';
import axios from 'axios';
import './App.css';
import Menubar from './Menubar';
import Tables from './Tables';
function Screen() {
  const dispatch = useDispatch();
 
const[p,setp] = useState(0);

  async function fetchdata() {
    var count =1;
    var jd = 2;
    localStorage.setItem("fetch", JSON.stringify(jd));
   const data1 = await axios.get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI").then((res) => {
     const data = res.data;
      console.log("fetchdata");
      {(data && data.map((data,index) => (
        data.key=index
    )))}
    dispatch(Searchdata(data));
    console.log("data");
    localStorage.setItem("bankdata", JSON.stringify(data));
    var name = [];
    name[0]="uah";
    localStorage.setItem("favourites", JSON.stringify(name));
    });
    setp(1);
         //data.key=count;
        
         
        //localStorage.setItem("bankdata", JSON.stringify(data));
    
    

 // var storedNames = JSON.parse(localStorage.getItem("bankdata"));
    //console.log(storedNames[2]);
  }
useEffect(async ()=>{
  const data2 = await axios.get("http://localhost:4000/banks").then((res) => {
    const data = res.data;
     console.log("fetchdata reducer menubar",data);
    /* {(data && data.map((data,index) => (
       data.key=index
 

   )))}*/
   dispatch(FavSearchdata(data));
   dispatch(Favdata(data));
   });
   //console.log("useeffect fav" , data2);
});

if(JSON.parse(localStorage.getItem("bankdata")) === null  )
{
  fetchdata();
  
  console.log("ishhd" ,JSON.parse(localStorage.getItem("favourites")) );
  return (
    <div className="screen">
       Please wait!!!
    </div>
  );

}
return (
  <div className="screen">
    <Menubar/>
    <Tables/>
  </div>
);
}

export default Screen;
