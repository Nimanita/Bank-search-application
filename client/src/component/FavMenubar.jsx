import React from 'react';
import {useState} from 'react';
import {useSelector , useDispatch } from 'react-redux';
import {useHistory } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import  Pagenumber  from './redux/bankdata/Paging';
import  FavSearchdata  from './redux/bankdata/FavSearching';
import {connect} from "react-redux";
function FavMenubar(props) {
  let history = useHistory();
  const dispatch = useDispatch();
 // var data = JSON.parse(localStorage.getItem("bankdata"));
  const[pagenumber,setpage] = useState(5);
  /*const data = axios.get("http://localhost:4000/banks").then((res) => {
     const data = res.data;
      console.log("fetchdata menubar",data);
     /* {(data && data.map((data,index) => (
        data.key=index
    )))}*/
   
    //});
  //  console.log("favpgsbs",props.pages);
function search(x){
 // console.log(x.toLowerCase())
  const searchData = props.data.map((data) => {
    if  ((data.Ifsc.toLowerCase().indexOf(x.toLowerCase()) >= 0)  || (data.Name.toLowerCase().indexOf(x.toLowerCase()) >= 0) || 
    (data.address.toLowerCase().indexOf(x.toLowerCase()) >= 0) || (data.branch.toLowerCase().indexOf(x.toLowerCase()) >= 0) ||
   (data.state.toLowerCase().indexOf(x.toLowerCase()) >= 0) )
             //console.log(data.ifsc) ;
        return data;
    return null;
});
var searchfilter = searchData.filter(x => x !== null);
//console.log("reqire",search);
dispatch(FavSearchdata(searchfilter));
localStorage.setItem("searchdata", JSON.stringify(searchData));
}
function handleChange(e){
  console.log(e.target.value);
  search(e.target.value)
}
function pagechosen(n){
  console.log(n);
  setpage(n);
  console.log("pagenumber",n);

  dispatch(Pagenumber(n));
}
function allbankclicked(){
  history.push('/');
}

  return (
    <div className="menubar">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <a class="navbar-brand" href="#">BANKS</a>
   
    <form class="form-inline my-2 my-lg-0 search ">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"  onChange={handleChange}/>
      <button class="btn btn-outline-success searchbtn my-2 my-sm-0" type="submit">Search</button>
    </form>
   
    <ul class=" listclass navbar-nav mr-auto mt-2 mt-lg-0">
    <li class="nav-item active">
        <a class="nav-link " href="#"  >Pages </a>
      </li>
    <li class="nav-item dropdown favo">
         
        <button class="nav-link dropdown-toggle drop" href="#" type="button" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         {props.page}
        </button>
        <div class="dropdown-menu drop" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item" href="#" value="5" onClick={()=>pagechosen(5)}>5</a>
    <a class="dropdown-item" href="#" onClick={()=>pagechosen(10)}>10</a>
    <a class="dropdown-item" href="#" onClick={()=>pagechosen(20)}>20</a>
    <a class="dropdown-item" href="#" onClick={()=>pagechosen(50)}>50</a>
        </div>
      </li>
      <li class="nav-item active favo1 ">
      <button type="button" class="btn btn-dark" onClick={()=>allbankclicked()}>All Banks</button>
      

      </li>
     
    </ul>
    </div>
 
</nav>
      { /* <div class="row">
            <div class="col1">
             Search
            <input placeholder="Search" onChange={handleChange}/>
            </div>
            <div class="col2">
            <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {pagenumber}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#" value="5" onClick={()=>pagechosen(5)}>5</a>
    <a class="dropdown-item" href="#" onClick={()=>pagechosen(10)}>10</a>
    <a class="dropdown-item" href="#" onClick={()=>pagechosen(20)}>20</a>
    <a class="dropdown-item" href="#" onClick={()=>pagechosen(50)}>50</a>
  </div>
</div>
            </div>
            <div class="col">
              <a onClick={()=>Favourite()}>My Favourite</a>
            </div>
  </div>*/}
         
    </div>
  );
}


FavMenubar = connect(mapStateToProps)(FavMenubar);
function mapStateToProps(state){
  
  return {
   
      data: state.favdata,
      page : state.page
  }
}
export default FavMenubar;