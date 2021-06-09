import React, { useEffect } from 'react';
import {useState} from 'react';
import {useSelector , useDispatch } from 'react-redux';
import {connect} from "react-redux";
import axios from 'axios';
import './App.css';
import { Table } from 'react-bootstrap';
function Tables(props) {
   
    var page = useSelector(state=>state.page);
     var z = useSelector(state=>state.page);
    
     const[flag,setflag] = useState(0);
     const[pagenum,setpage] = useState(1);
     const[olddata,changeold]=useState(props.searchd);
    //const[datas,setdatas] = useState(props.searchd.slice(0,page));
    const[curpage,changecur] = useState(1);
    //const[datas,changebox] = useState();
   // const [index,setindex] = useState(1);
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
function favourite(e){
  console.log("e",e);
  
   //console.log("fav",JSON.parse(localStorage.getItem("favourites")));
      
    var f= JSON.parse(localStorage.getItem("favourites"));
    // favo.push(e);
    console.log(f,"favourite");

     f.push(e);
     console.log(f,"favourite");
     console.log("favo",typeof(localStorage.getItem("favourites")));
     localStorage.setItem("favourites", JSON.stringify(f));
     axios.post('http://localhost:4000/bankadd',{
       data : e
     })
    
   
  
}
 /*useEffect(async () => {
    if(flag===0)
     setdatas(searchd.slice(0,page));
     setflag(1)
});*/
/*const financialGoal = (evt.target.validity.valid) ? 
  evt.target.value : this.state.financialGoal;*/
function handleChange(e)
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
      <div class="tablediv">
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>IFSC</th>
          <th>Branch</th>
          <th>Address</th>
          <th>State</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
       
        {(props.searchd.slice(x,y)) && (props.searchd.slice(x,y)).map((data,index) => (
            <tr>
            <td>{indexno+index}</td>
            <td>{data.bank_name}</td>
            <td>{data.ifsc}</td>
            <td>{data.branch}</td>
            <td>{data.address}</td>
            <td>{data.state}</td>
            <td><button type="button" class="btn btn-success" onClick={()=>favourite(data)}>Fav</button>
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
    </div>
    );
  
}
Tables = connect(mapStateToProps)(Tables);
function mapStateToProps(state){
  
  return {
   
      searchd: state.data,
      page : state.page
  }
}
export default Tables;
