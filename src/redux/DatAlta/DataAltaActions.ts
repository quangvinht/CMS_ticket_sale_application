
import {REQ,SUCCESS,ERROR,SUCCESSMONTH,SUCCESSDATATICKET,SUCCESSDATACHARTAREA,SUCCESSDATACHANGETICKET

} from './DataAltaTypes'

import db from '../../firebase.config';

export const FETCHREQ = ()=>{
    return {
        type: REQ,
    }
}

export const FETCHSUCCESS = (data:any)=>{ 
    return {
        type:SUCCESS,
        payload: data
    }
}




export const FETCHERROR = (error:any)=>{ 
    return {
        type:ERROR,
        payload: error
    }
}



export const FETCHSUCCESSDATATICKET= (data:any)=>{ 
    return {
        type:SUCCESSDATATICKET,
        payload: data
    }
}

export const FETCHSUCCESSDATACHARTAREA= (data:any)=>{ 
    return {
        type:SUCCESSDATACHARTAREA,
        payload: data
    }
}


export const FETCHSUCCESSMONTH= (data:any)=>{ 
    return {
        type:SUCCESSMONTH,
        payload: data
    }
}


export const FETCHSUCCESSDATACHANGETICKET= (data:any)=>{ 
    return {
        type:SUCCESSDATACHANGETICKET,
        payload: data
    }
}







export const fetchData = ()=>{
    return (dispatch:any)=>{

        dispatch(FETCHREQ)

        const response=db.collection('dataChartDay');
        response.get()
                .then(response =>{
                const usersSuccess:any = []
                response.docs.forEach(item =>{
                    
                    
                    usersSuccess.push(item.data())

                })
               
                
                
                dispatch(FETCHSUCCESS(usersSuccess))
               

                
                


                })
                .catch(error =>{
                    const errorMessage = error.message

                dispatch(FETCHERROR(errorMessage))
                })  


                ////////////////////////////////////////////////////////////////
                const responsem=db.collection('dataChartMonth');
                responsem.get()
                .then(response =>{
                const usersSuccess:any = []
                response.docs.forEach(item =>{
                    
                    
                    usersSuccess.push(item.data())

                })
               
                
                
                dispatch(FETCHSUCCESSMONTH(usersSuccess))
               

                
                


                })
                .catch(error =>{
                    const errorMessage = error.message

                dispatch(FETCHERROR(errorMessage))
                })  


                ////////////////////////////////////////////////////////////////
               
                const responseDataTicket=db.collection('dataTicket');
                responseDataTicket.get()
                .then(response =>{
                const usersSuccess:any = []
                response.docs.forEach(item =>{
                    
                    
                    usersSuccess.push(item.data())

                })
               
                
                
                dispatch(FETCHSUCCESSDATATICKET(usersSuccess))
               

                
                


                })
                .catch(error =>{
                    const errorMessage = error.message

                dispatch(FETCHERROR(errorMessage))
                })  


                ////////////////////////////////

                const responsedataChartArea=db.collection('dataChartArea');
                responsedataChartArea.get()
                .then(response =>{
                const usersSuccess:any = []
                response.docs.forEach(item =>{
                    
                    
                    usersSuccess.push(item.data())

                })
               
                
                
                dispatch(FETCHSUCCESSDATACHARTAREA(usersSuccess))
               

                
                


                })
                .catch(error =>{
                    const errorMessage = error.message

                dispatch(FETCHERROR(errorMessage))
                })  

             

                ////////////////////////////////

                const responsedataChangeTicket =db.collection('dataChangeTicket');
                responsedataChangeTicket.get()
                .then(response =>{
                const usersSuccess:any = []
                response.docs.forEach(item =>{
                    
                    
                    usersSuccess.push(item.data())

                })
               
                
                
                dispatch(FETCHSUCCESSDATACHANGETICKET(usersSuccess))
               

                
                


                })
                .catch(error =>{
                    const errorMessage = error.message

                dispatch(FETCHERROR(errorMessage))
                })  



                
                ////////////////////////////////


                  ////////////////////////////////

              

                  
                  ////////////////////////////////

              
                    ////////////////////////////////

                 
                         ////////////////////////////////

                      
                       ////////////////////////////////

                     
       
  
  


        


        }
}








