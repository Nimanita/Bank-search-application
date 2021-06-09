import React, { useEffect } from 'react';
import {useState} from 'react';
import {useSelector , useDispatch } from 'react-redux';
import {connect} from "react-redux";
import axios from 'axios';
import './App.css';
import { Table } from 'react-bootstrap';
import  FavSearchdata  from './redux/bankdata/FavSearching';
import  Favdata  from './redux/bankdata/Favdata';
function FavTable(props) {
   
    const [editclass , changeeditclass] = useState("fade");
    const [deleteclass , changedeleteclass] = useState("fade");
    const [deleteid,changedeleteid] = useState();
    const [flag,setflag] = useState(1);
    const [editdata,changeeditdata] =useState({
      Name : ' ',
      Ifsc : ' ',
      address : ' ',
      state : ' ',
      branch : ' ',
      Id : ' '
    })
    var page = useSelector(state=>state.page);
     var z = useSelector(state=>state.page);
    console.log("Fvtable",props.searchd);
    // const[flag,setflag] = useState(0);
     const[pagenum,setpage] = useState(1);
     const[olddata,changeold]=useState(props.searchd);
  
    const[curpage,changecur] = useState(1);

   const[indexno,setindexno] = useState(1);
   //console.log(props.page,"props");
    const[x,changex] = useState(0);
    const[y,changey] = useState(useSelector(state=>state.page));

    const[prevpage,changepage] = useState(useSelector(state=>state.page));
    console.log(y,"y",page);
    console.log("curpage prevpage",curpage, prevpage);
    const dispatch = useDispatch()
  console.log(x,"x");
 
  if(prevpage!==page)
  {
     console.log("prevpage",prevpage);
     changey((curpage)*page+1);
     changex((curpage-1)*page + 1)
     changepage(page);
     setindexno((curpage-1)*page + 1);
  
  }
    var length = props.searchd.length; 
function prevbuttonclicked(){
  var y,x;
      if(curpage > 1)  
      {
        if(curpage>2)
        {
           changecur(curpage-1);
            y =  (curpage - 1)*page+1;
            x = y - page;
            changey(y);
            changex(x);
            setindexno(y - page);
           // setdatas(props.searchd.slice(x,y+1));
        }
        else
        {
          changecur(curpage-1);
          y =  (curpage - 1)*page;
          x = y - page - 1;
          changey(y);
          changex(x);
          setindexno(y - page);
        }   //setindex(x);
      }
      
}
function nextbuttonclicked(){

  var y,x;
  console.log("nextbutton clicked")
  
  var r = length%page;
 var q = length/page;
  q = Math.floor(q);
  if(r!==0)
  {
            ++q;
  }
  console.log(q,curpage,"q curpage");
  if(curpage <q )  
  {
       changecur(curpage+1);
        y =  (curpage + 1)*page+1;
        x = (curpage)*page + 1;
        if(y > length)
        {
           y = length;
        }
        console.log("xy",x,y);
        changey(y);
        changex(x);
        setindexno((curpage)*page + 1);
        //datas = searchd.slice(x,y);
        //setdatas(props.searchd.slice(x,y));
  }
 
}
var favo = [];

 function edited(){
   changeeditclass("fade");
   console.log("editdata",editdata);
   setflag(0);
   axios.post('http://localhost:4000/bankupdate',{
    data : editdata
  })
 }
 function deleted(){
  changedeleteclass("fade");
 // console.log("editdata",editdata);
  setflag(0);
  axios.post('http://localhost:4000/bankdelete',{
   data : deleteid
 })
}
function handleChange(e)
{
  console.log(e,"type",e.target.name);
     if(e.target.name === "edit")
     {
      
          var bank = e.target;
          var id = e.target.id;
          if(id === "x1")
          {
              changeeditdata({
                ...editdata,
                name : bank.value
              })
          }
          else if(id === "x2")
          {
              changeeditdata({
                ...editdata,
                ifsc : bank.value
              })
          }
          else if(id === "x3")
          {
              changeeditdata({
                ...editdata,
                branch : bank.value
              })
          }
          else if(id === "x4")
          {
              changeeditdata({
                ...editdata,
                state : bank.value
              })
          }
          else if(id === "x5")
          {
              changeeditdata({
                ...editdata,
                address : bank.value
              })
          }
     }
     else
     {
      console.log("input",e);
      console.log(e.target.validity.valid);
      if(e.target.validity.valid === true && e.target.value >=1 )
      {
          setflag(1);
          var x = Number(e.target.value);
          console.log("number",x);
          setpage(x);
      }
     }
}
function editclicked(x){
  if(deleteclass === "fade")
  {
  changeeditclass("container editbox");
  changeeditdata({
    ...editdata,
    Id : x.Id
  })
}
}
function submitbuttonclicked(e)
{
     if(flag === 1)
     {
      var r = length%page;
      var q = length/page;
       q = Math.floor(q);
       if(r!==0)
       {
                 ++q;
       }
       //console.log(q,curpage,"q curpage");
       if(pagenum <=q )  
       {
         var x,y
            changecur(pagenum);
             y =  (pagenum)*page+1;
             x = (pagenum-1)*page + 1;
             if(y > length)
             {
                y = length;
             }
             console.log("xy",x,y);
             changey(y);
             changex(x);
             setindexno((pagenum-1)*page + 1);
             //datas = searchd.slice(x,y);
             //setdatas(props.searchd.slice(x,y));
       }
       else
       {
          document.getElementById("inputpage").value = curpage;
       }
     }
     else
     {
        document.getElementById("inputpage").value = curpage;
     }
     setflag(0);
}
function deleteclicked(x)
{
  if(editclass === "fade")
  {
   changedeleteclass("container delete");
   changedeleteid(x);
  }
}
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
if(length === 0)
{
  return(
    <div class="tablediv">
      <h1>No bank found!!.Please add appropriate keyword.</h1>
    </div>
  );
}

/*if(olddata != props.searchd)
{
   changex(0);
   changeold(props.searchd);

}*/
if(props.searchd.slice(x,y).length === 0)
{
     changex(0);
     changey(props.page);
     changecur(1);
     setindexno(1);
}
  console.log("datasl",props.searchd);
  console.log("xy",x,y);
    return(
      <div class="tablediv favtable">
      <Table striped bordered hover variant="dark" >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>IFSC</th>
          <th>Branch</th>
          <th>Address</th>
          <th>State</th>
          <th>Edit Delete</th>
        </tr>
      </thead>
      <tbody>
       
        {(props.searchd.slice(x,y)) && (props.searchd.slice(x,y)).map((data,index) => (
            <tr>
            <td>{indexno+index}</td>
            <td>{data.Name}</td>
            <td>{data.Ifsc}</td>
            <td>{data.branch}</td>
            <td>{data.address}</td>
            <td>{data.state}</td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="Yellow" class="bi bi-pencil-fill editicon" viewBox="0 0 16 16" onClick={()=>editclicked(data)}>
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="orange" class="bi bi-trash-fill" viewBox="0 0 16 16" onClick={()=>deleteclicked(data.Id)}>
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
</td>

          </tr>
        ))}


       
      
        
      </tbody>
    </Table>
     <div class="row footer ">
       
      {/* <button type="button" class="btn btn-info" id ={pagenum.a1}>{pagenum.a1}</button>
       <button type="button" class="btn btn-info"  id ={pagenum.a1}>{pagenum.a2}</button>
       <button type="button" class="btn btn-info"  id ={pagenum.a1} >{pagenum.a3}</button>
       <button type="button" class="btn btn-info"  id ={pagenum.a1} >{pagenum.a4}</button>
        <button type="button" class="btn btn-info"  id ={pagenum.a1}>{pagenum.a5}</button>*/}
       
     <button type="button" class="btn btn-dark prev" onClick={()=>prevbuttonclicked()}>Prev</button>
     <input id ="inputpage" placeholder={curpage} type="text" pattern="[0-9]*"  onInput={handleChange} />
     <button type="button" class=" btn btn-outline-primary submit" onClick={()=>submitbuttonclicked()}>Submit</button>
     <button type="button" class="btn btn-dark next" onClick={()=>nextbuttonclicked()}>Next</button>
     </div>
     
     <div className={editclass}>
      <div class="row justify-content-center detailsrow editrow">
       <h1 class="detailtitle">EDIT</h1>
       </div>
       <div class = "row justify-content-center editrow">
        <div class="col-lg-12 inputs">
           <h2 class="details">Name</h2>
            <input id="x1"  class="inputbox" text="USERNAME" name="edit" onChange={handleChange}/>
        </div>   
        
       </div>
       <div class = "row justify-content-center editrow">
        <div class=" input2 inputs col-lg-12">
        <h2 class="details">IFSC</h2>
            <input id="x2" class="inputbox"  name="edit"  onChange={handleChange} />
        </div>   
        
       </div>
       <div class = "row justify-content-center editrow">
        <div class=" input2 inputs col-lg-12">
        <h2 class="details">Branch</h2>
            <input id="x3" class="inputbox" name="edit" onChange={handleChange} />
        </div>   
        
       </div>
       <div class = "row justify-content-center editrow">
        <div class=" input2 inputs col-lg-12">
        <h2 class="details">State</h2>
            <input id="x4" class="inputbox"  name="edit"  onChange={handleChange} />
        </div>   
        
       </div>
       <div class = "row justify-content-center editrow">
        <div class=" input2 inputs col-lg-12">
        <h2 class="details">Address</h2>
            <input id="x5" class="inputbox"  name="edit"  onChange={handleChange} />
        </div>   
        
       </div>
       <div class = "row justify-content-center editrow buttonrow">
       <button type="button" class="col-lg-2 btn btn-dark login submit editsubmit" onClick={()=>edited()} >SUBMIT</button>
       <button type="button" class="col-lg-2 btn btn-outline-dark login submit"  onClick={()=>changeeditclass("fade")} >CANCEL</button>
      </div>
    </div>
    
    <div className={deleteclass}>
      <div class="row justify-content-center detailsrow editrow">
       <h1 class="detailtitle">Do you really want to delete it?</h1>
       </div>
       
       <div class = "row justify-content-center editrow buttonrow">
       <button type="button" class="col-lg-2 btn btn-dark login submit editsubmit" onClick={()=>deleted()}  >YES</button>
       <button type="button" class="col-lg-2 btn btn-outline-dark login submit"  onClick={()=>changedeleteclass("fade")} >NO</button>
       </div>
    </div>
   <div class="empty">

   </div>
    </div>
    

    );
  
}
FavTable = connect(mapStateToProps)(FavTable);
function mapStateToProps(state){
  
  return {
   
      searchd: state.favsearchdata,
      page : state.page
  }
}
export default FavTable;
