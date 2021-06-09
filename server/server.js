const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');
const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//app.use((cors));
//app.use(bodyParser.json())
app.listen(4000,()=>{
    console.log("running")
})
app.get('/banks',(req,res)=> {
    
    console.log("running2")
    const getbankdataquery = `SELECT * FROM bank.favourites`;
    connection.query(getbankdataquery,(err,response)=>{
        if(err) console.log(err)
        else  res.send(response)
        
       })
      // res.send('list of banks')
})
app.post('/bankadd',(req,res)=> {
    //res.send('add banks')
    console.log( req.body.bank_name ," nfxn ", req.body.data.ifsc )
   const add_query = `insert into bank.favourites(Id, Name , Ifsc , branch , state  , address ) values('${req.body.data.key}','${req.body.data.bank_name}','${req.body.data.ifsc}','${req.body.data.branch}','${req.body.data.state}',"${req.body.data.address}")`;
connection.query(add_query,(err)=>{
 if(err) console.log(err)
 else res.send('bank added')
 
})
    console.log("running2")
    console.log( req.body )
})
app.post('/bankupdate',(req,res)=> {
    //res.send('add banks')
    console.log( req.body.data )
    
   const update_query = `update bank.favourites set Name = '${req.body.data.name}' , Ifsc ='${req.body.data.ifsc}' ,branch = '${req.body.data.branch}' , state ='${req.body.data.state}' , address ="${req.body.data.address}" where Id = '${req.body.data.Id}';`;
connection.query(update_query,(err)=>{
 if(err) console.log(err)
 else res.send('bank updated')
 
})
    console.log("running2")
    console.log( req.body )
})
app.post('/bankdelete',(req,res)=> {
    console.log( "deletd" , req.body.data )
   const delete_query = `delete from bank.favourites  where Id = '${req.body.data}';`;
connection.query(delete_query,(err)=>{
 if(err) console.log(err)
 else res.send('bank updated')
 
})
    console.log("running2")
    console.log( req.body )
})