const PAGENUMBER = 'PAGENUMBER'
const SEARCHDATA = 'SEARCHDATA'




export default function Pagenumber(n){

    return{
        type : PAGENUMBER,
        pages : n
    }
}

