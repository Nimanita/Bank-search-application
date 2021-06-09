const FAVPAGENUMBER = 'FAVPAGENUMBER'
const SEARCHDATA = 'SEARCHDATA'




export default function Pagenumber(n){

    return{
        type : FAVPAGENUMBER,
        pages : n
    }
}

