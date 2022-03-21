import {REQ,SUCCESS,ERROR,SUCCESSMONTH,SUCCESSDATATICKET,SUCCESSDATACHARTAREA
  ,SUCCESSDATACHANGETICKET

} from './DataAltaTypes'


const initState : any = {
    loading: true,
    error:'',
    
   
    dataMonth:[],
    dataTicket:[],
    dataChartArea:[],
    dataChangeTicket:[],
  
   

   
  }

  const reducer = (state = initState, action:any) =>{
    switch(action.type){
        case REQ:
          return {
            ...state,
            
          }
        case SUCCESS:
          return {
            ...state,
            
            loading: false,
         
            dataChart: action.payload
          }
        
        case SUCCESSMONTH:
          return {
            ...state,
            
            loading: false,
         
            dataMonth: action.payload
          }

          case SUCCESSDATATICKET:
          return {
            ...state,
            
            loading: false,
         
            dataTicket: action.payload
          }

          case SUCCESSDATACHARTAREA:

           return {
            ...state,
            
            loading: false,
         
            dataChartArea: action.payload
          }

          case SUCCESSDATACHANGETICKET:
            return {
              ...state,
              
              loading: false,
           
              dataChangeTicket: action.payload
            }
    
  





        case ERROR:
         return {
          ...state,
          dataChart:[],
          error:action.payload
          }
         
        default:
          return state
    }
  }
  
  export default reducer