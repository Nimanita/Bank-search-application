
import axios from 'axios';
const PAGENUMBER = 'PAGENUMBER'
const SEARCHDATA = 'SEARCHDATA'
const FAVSEARCHDATA = 'FAVSEARCHDATA'
const FAVPAGENUMBER = 'FAVPAGENUMBER'
const FAVDATA = 'FAVDATA'
var storedNames = JSON.parse(localStorage.getItem("bankdata"));

const initialState = {

  page : 5,
  data : storedNames,
  favpage : 5,
  favdata : ' ',
  favsearchdata : ' '
}
const bankdatareducer = (state = initialState,action)=>{
  console.log("action.type",action.type);
  console.log("action",action);
  console.log("state",state);
switch(action.type){
  case PAGENUMBER :return{
     
    ...state ,
     page : action.pages
    
  }
  case SEARCHDATA :return{
      ...state ,
      data : action.data
  }
  case FAVPAGENUMBER :return{
     
    ...state ,
     favpage : action.pages
    
  }
  case FAVSEARCHDATA :return{
      ...state ,
      favsearchdata : action.data
  }
  case FAVDATA :return{
    ...state ,
    favdata : action.data
}
 
  default : return state
}

}

export default bankdatareducer;