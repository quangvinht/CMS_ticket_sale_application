import {useState,useEffect} from 'react'
import './ChangeTicketEvent.css'
import Header from '../Header'
import search from '../../style/img/search.svg'
import disableCalendar from '../../style/img/disableCalendar.svg'
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import prevArrow from '../../style/img/prevArrow.svg'
import nextArrow from '../../style/img/nextArrow.svg'

import {fetchData} from '../../redux/DatAlta/DataAltaActions'
import ReactPaginate from 'react-paginate';


 function ChangeTicketEvent({dataTableRedux,fetchData}:any) {

   useEffect(() => {
      fetchData()
   },[])

   /// datepicker:

  
    const [startDate, setStartDate] = useState(new Date());

    const [dateRange, setDateRange] = useState([null, null]);

    const [startDate1, endDate] = dateRange;
   
    
   



    ////

    const [showButton , setShowButton  ] = useState(false)

    const [seatch , setSeatch  ] = useState('')




  

    ///table:
    const dataTable = dataTableRedux.dataChangeTicket


    const [dataForTable , setDataForTable] = useState(dataTable)

    ////


    ////radio:

    const radioData = [
        {
          id:1,
          name:'Tất cả'
        },
        {
          id:2,
          name:'Đã đối soát'
        },
        {
          id:3,
          name:'Chưa đối soát'
        },
        
      
      
      ]
      
      
      
      const [checked,setChecked] = useState(1)
      
      const [dataButton , setDataButton] = useState(radioData[0].name)
      
      const handleRadio = (value:any)=>{
          
          setDataButton(value)
      
          
      }
      
      const handleButton = ()=>{
        
        if(dataButton == 'Đã đối soát'){
            const dataShow = dataTable.filter( (value:any)=>{
              return dataButton == value.state
            })
    
            setDataForTable(dataShow)
            setShowButton(false)
    
           
            
        }else if(dataButton == 'Chưa đối soát'){
          const dataShow = dataTable.filter( (value:any)=>{
            return dataButton == value.state
          })
    
          setDataForTable(dataShow)
          setShowButton(true)
    
         
          
      }
     
        
        else{
          setDataForTable(dataTable)
        }
    
        
     
      
          
       
        
      }
      
      
      


    ///////
      ////Search:
      function SSearch(rows:any){
        console.log(rows);
        
        return rows.filter( (row:any) => row.code.toLowerCase().indexOf(seatch) > -1 )
      }
      

      ////


      //// paginate:

      const [pageNumber , setpageNumber] = useState(0)

      const dataPerPage = 9
      
      const pagesVisited =  pageNumber * dataPerPage
      
      const dataBeforDisplay = dataForTable.slice( pagesVisited , pagesVisited + dataPerPage )

      const dataDisplay = dataBeforDisplay.map( (data:any , index:any) =>{
        return (
          [
            <tr key={index}> 
              <td style={{textAlign: 'center'}}>{index+1}</td>
              <td>{data.code}</td>
              <td>Hội chợ triển lãm tiêu dùng 2021</td>
              <td style={{textAlign: 'right'}}>14/04/2021</td>
              <td style={{textAlign: 'left'}}>Vé cổng</td>
              <td>Cổng 1</td>
              {
                  data.state=='Chưa đối soát' ? (
                      <td style={{fontStyle:'italic',color: '#A5A8B1'}}>
                              Chưa đối soát
                      </td>
                  ) : (
                      <td style={{fontStyle:'italic',color: '#FD5959'}}>
                              Đã đối soát
                      </td>
                  )
              }
             
             
          </tr>
          ]
        )
  })





      const pageCount =  Math.ceil(dataForTable.length / dataPerPage)

       const changePage = ( {selected}:any ) =>{
                setpageNumber(selected)
       }

      ////








  return (
    <div className="ChangeTicketEvent">
        <Header/>

        <div className="ChangeTicket__container">
                <div className="ChangeTicket__container__table">

                                <div className="ChangeTicket__container__table__header">
                                    Đối soát vé
                                </div>

                                <div className="ChangeTicket__container__table__searchButton">
                                    <div className="TicketManager__filter__search">

                                                <input type="text"
                                                value={seatch}
                                                onChange={(e:any) => {

                                                  setSeatch(e.target.value)

                                                  if (seatch.length == 1) {
                                                    setDataForTable(SSearch(dataTable))
                                                  } else if (dataForTable.length == 1) {
                                                    setDataForTable(SSearch(dataTable))
                                                  }
                                  
                                                  else {
                                                    setDataForTable(SSearch(dataForTable))
                                                  }


                                                } }
                                                placeholder="Tìm bằng số vé" />

                                                <div className="TicketManager__filter__logoSaerch">

                                                <img src={search} alt="" />

                                                </div>



                                    </div>
                                    
                                  {
                                      showButton ? (
                                        <button className="ChangeTicket__container__table__searchButton__button">
                                            Chốt đối soát
                                         </button>
                                      ):(
                                        <button className="ChangeTicket__container__table__searchButton__button__export">
                                                Xuất file (.csv)
                                            </button>
                                      )
                                  }  
                                    
                                    
                                </div>

                                <div className="ChangeTicket__container__realTable">
                                <div className="TicketManager__tableData">
          <table style={{ width: 100 + '%' }}>
            <tbody>
              <tr>
                <th>STT</th>
                
                <th>Số vé</th>
                <th>Tên sự kiện</th>
               
                <th style={{ textAlign: 'right' }}>Ngày sử dụng</th>
                <th style={{ textAlign: 'left',marginLeft:15+'px' }}> loại vé</th>
                <th>Cổng check - in</th>
                <th></th>

              </tr>

              {
                // dataForTable.map( (data:any , index:any) =>{
                //       return (
                //         [
                //           <tr key={index}> 
                //             <td style={{textAlign: 'center'}}>{index+1}</td>
                //             <td>{data.code}</td>
                //             <td style={{textAlign: 'right'}}>14/04/2021</td>
                //             <td style={{textAlign: 'left'}}>Vé cổng</td>
                //             <td>Cổng 1</td>
                //             {
                //                 data.state=='Chưa đối soát' ? (
                //                     <td style={{fontStyle:'italic',color: '#A5A8B1'}}>
                //                             Chưa đối soát
                //                     </td>
                //                 ) : (
                //                     <td style={{fontStyle:'italic',color: '#FD5959'}}>
                //                             Đã đối soát
                //                     </td>
                //                 )
                //             }
                           
                           
                //         </tr>
                //         ]
                //       )
                // })
                dataDisplay
                }



            </tbody>
          </table>


                               </div>
                                </div>

                                <div className="TicketManager--pagination">


                                    <ReactPaginate

                                      previousLabel={<div className="ChosePage__prevArrow">
                                        <img src={prevArrow} alt="" />
                                      </div>}

                                      nextLabel={<div className="ChosePage__nextArrow">
                                        <img src={nextArrow} alt="" />
                                      </div>}
                                      pageCount={pageCount}
                                      onPageChange={changePage}
                                      containerClassName={"paginationBttns"}
                                      previousLinkClassName={"previousBttn"}
                                      nextLinkClassName={"nextBttn"}
                                      disabledClassName={"paginationDisabled"}
                                      activeClassName={"paginationActive"} />



                                </div>
                </div>

                <div className="ChangeTicket__container__filter">
                       <div className="ChangeTicket__container__filter__header">
                            Lọc vé
                       </div>
                       <div className="ChangeTicket__container__filter__item">
                            <div className="ChangeTicket__container__filter__item__header">
                                Tình trạng đối soát
                            </div>

                            <div className="TicketManager__filter--filter--checkboxs">

                        
                                    <div className='TicketManager__filter--filter--checkboxs--list'>
                                {radioData.map(data => <div key={data.id} className='MapChheckbox'>
                                <input
                                    checked={checked === data.id}
                                    value={data.name}
                                    onChange={(e) => {
                                    setChecked(data.id)
                                    handleRadio(e.target.value)

                                    } }
                                    type="radio" />
                                <span> {data.name}</span>
                                </div>
                                )}

                                    </div>



                             </div>
                            
                            



                       </div>

                       <div className="ChangeTicket__container__filter__item__ticket">
                                <div>Loại vé</div>
                                <div>Vé cổng</div>
                        </div>

                        <div className="ChangeTicket__container__filter__item__disable-calendar">
                                    <span >Từ ngày</span>
                                    <DatePicker
                                       disabled
                                      selected={startDate} onChange={(date: Date) => setStartDate(date)} 
                                     />
                        </div>

                        <div className="ChangeTicket__container__filter__item__disable-calendar ChangeTicket__container__filter__item__disable-calendar--active">
                                    <span >Đến ngày</span>
                                    <DatePicker
                                         
                                        // onChange={(date: Date) => setStartDate(date)} 
                                      
                                      selectsRange={true}
                                      startDate={startDate1}
                                      
                                      onChange={(update:any) => {
                                        setDateRange(update);
                                      }}
                                      
                                        
                                       
                                        
                                     />
                        </div>

                        <button className="ChangeTicket__container__filter__button"
                            onClick={handleButton}
                        >
                            Lọc
                        </button>


                </div>


        </div>

        


    </div>
  )
}


const mapStateToProps = (state:any) =>{
    return {
      dataTableRedux:state.dataAlta
  
     
        
        
        
    }
  }
  
  

const mapDispatchToProps = (dispatch:any) =>{
    return {
            fetchData: ()=>  dispatch(fetchData()),
      
    }
  }
  
  
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(ChangeTicketEvent)
  