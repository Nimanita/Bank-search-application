const PAGENUMBER = 'PAGENUMBER'
const FAVSEARCHDATA = 'FAVSEARCHDATA'




export default function FavSearchdata(data){

    return{
        type : FAVSEARCHDATA,
       data : data
    }
}

