import {useState,useEffect} from 'react'
import './TicketManager.css'
import Header from '../Header'
import search from '../../style/img/search.svg'
import filterLogo from '../../style/img/filterLogo.svg'

import prevArrow from '../../style/img/prevArrow.svg'
import nextArrow from '../../style/img/nextArrow.svg'
import thirdPoint from '../../style/img/thirdPoint.svg'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {connect} from 'react-redux';


import {fetchData} from '../../redux/DatAlta/DataAltaActions'

import ReactPaginate from 'react-paginate';


 function TicketManager({dataTableRedux,fetchData}:any) {


  useEffect(() => {
        
    fetchData()
    


},[])

 
  




  const [showFilter , setShowFilter] = useState(false)

  const [seatch , setSeatch  ] = useState('')

  const [startDate, setStartDate] = useState(new Date());

 


////Checkbox:
  const checkboxData = [
    { name: "Cổng 1" ,isChecked :null},
    { name: "Cổng 2" ,isChecked :null},
    { name: "Cổng 3" ,isChecked :null},
    { name: "Cổng 4",isChecked :null },
    { name: "Cổng 5",isChecked :null }
  ]

  const [checkboxSet,setCheckBoxSet] = useState([{name:'',isChecked :null}])
  
  
  useEffect(() => {
    setCheckBoxSet(checkboxData)
  }, []);

  const handleChangeCheckbox = (e:any) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = checkboxSet.map((data:any) => {
        return { ...data, isChecked: false };
      });
      setCheckBoxSet(tempUser);
    } else {
      let tempUser = checkboxSet.map((data:any) =>
        data.name === name ? { ...data, isChecked: checked } : data
      );
      setCheckBoxSet(tempUser);
    }
  };


////


////Table:




const dataTable = dataTableRedux.dataTicket


const [dataForTable , setDataForTable] = useState(dataTable)

const UsedDiv = ()=>{
  return (
    <div className="used">
      <div className="used-point"></div>
      <div className='used-text'>Đã sử dụng</div>
      </div>
  )
}

const EverUsedDiv = ()=>{
  return (
    <div className="used used-everused">
      <div className="everused-point"></div>
      <div className='everused-text'>Chưa sử dụng</div>
      </div>
  )
}

const OverDateDiv = ()=>{
  return (
    <div className="used used-overdate">
      <div className="overdate-point"></div>
      <div className='overdate-text'>Hết hạn</div>
      </div>
  )
}





////////////



//// Radio:
const radioData = [
  {
    id:1,
    name:'Tất cả'
  },
  {
    id:2,
    name:'Đã sử dụng'
  },
  {
    id:3,
    name:'Chưa sử dụng'
  },
  {
    id:4,
    name:'Hết hạn'
  },

]



const [checked,setChecked] = useState(1)

const [dataButton , setDataButton] = useState(radioData[0].name)

const handleRadio = (value:any)=>{
    
    setDataButton(value)

    
}

const handleButton = ()=>{
  
   
    if(dataButton == 'Đã sử dụng'){
        const dataShow = dataTable.filter( (value:any)=>{
          return dataButton == value.state
        })

        setDataForTable(dataShow)

       
        
    }else if(dataButton == 'Chưa sử dụng'){
      const dataShow = dataTable.filter( (value:any)=>{
        return dataButton == value.state
      })

      setDataForTable(dataShow)

     
      
  }
  else if(dataButton == 'Hết hạn'){
    const dataShow = dataTable.filter( (value:any)=>{
      return dataButton == value.state
    })

    setDataForTable(dataShow)

   
    
}
    
    else{
      setDataForTable(dataTable)
    }

    
 
  
}






////////////////////////////////////////////////////////////////////////

///Search:

function SSearch(rows:any){
  return rows.filter( (row:any) => row.ticket.toLowerCase().indexOf(seatch) > -1 )
}



/////


///Pagination:

const [pageNumber , setpageNumber] = useState(0)

const dataPerPage = 12

const pagesVisited =  pageNumber * dataPerPage

const dataBeforDisplay = dataForTable.slice( pagesVisited , pagesVisited + dataPerPage )

const dataDisplay = dataBeforDisplay.map( (data:any , index:any) =>{
                                       
  return (
    [
      <tr key={index}> 
      <td style={{textAlign: 'center'}}>{index+1}</td>
      <td>{data.code}</td>
      <td>{data.ticket}</td>
      <td>Hội chợ triển lãm tiêu dùng 2021</td>
      <td>
        {
          data.state =='Đã sử dụng' && <UsedDiv/> ||
          data.state =='Chưa sử dụng' && <EverUsedDiv/> ||
          data.state =='Hết hạn' && <OverDateDiv/>
        }
        
      </td>
      <td style={{textAlign: 'right'}}>{data.date1}</td>
      <td style={{textAlign: 'right'}}>14/04/2021
      
      
      </td>
      <td>
        { 
          !data.date1 ? 
          
          (
            
              <>
                <span style={{ marginLeft: '15px' }} className='linePoint'>-
                
                  <div className='imagethirdPoint' onClick={() => setShowModal(true)}>
                      <img src={thirdPoint} alt="" />
                  </div>
                </span>
                
              </>
            
          )
          
          : 'Cổng 1'
        
        }
        


      </td>
    </tr>
    ]
  )
  
})


const pageCount =  Math.ceil(dataForTable.length / dataPerPage)

       const changePage = ( {selected}:any ) =>{
                setpageNumber(selected)
       }

//////


///Modal:

       const [showModal , setShowModal] = useState(false)

////


  return (
    <>
    <div className="TicketManager">




      <Header />

      <div className="TicketManager__container">
        <div className="TicketManager__title">
          Danh sách vé
        </div>

        <div className="TicketManager__filter">

          <div className="TicketManager__filter__search">

            <input type="text"
              value={seatch}
              onChange={(e) => {

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

          <div className="TicketManager__filter__List">

            <div className="TicketManager__filter__Item">
              <div className="TicketManager__filter__Item__img">
                <img src={filterLogo} alt="" />

              </div>
              <span>Lọc vé</span>

              <div className="TicketManager__filter--filter">

                <div className="TicketManager__filter--filter--header">
                  Lọc vé
                </div>

                <div className="TicketManager__filter--filter--date">

                  <div className="TicketManager__filter--filter--date--item">

                    <div className='TicketManager__filter--filter--date--item--fromDay'>Từ ngày</div>

                    <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />

                  </div>

                  <div className="TicketManager__filter--filter--date--item">

                    <div className='TicketManager__filter--filter--date--item--fromDay'>Đến ngày</div>

                    <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />

                  </div>

                </div>

                <div className="TicketManager__filter--filter--checkboxs">

                  <span>Tình trạng sử dụng</span>
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

                <div className="TicketManager__filter--filter--check-in">
                  <div className="TicketManager__filter--filter--check-in--header">
                    Cổng Check - in
                  </div>
                  <div className="TicketManager__filter--filter--check-in--item">
                    <div>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="allSelect"
                        // checked={
                        //   checkboxSet.filter((data) => data?.isChecked !== true).length < 1
                        // }
                        checked={!checkboxSet.some((data) => data?.isChecked !== false)}
                        onChange={handleChangeCheckbox} />
                      <label className="form-check-label ">Tất cả</label>
                    </div>

                    {checkboxSet.map((data: any, index: any) => (
                      <div className="form-check" key={index}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name={data.name}
                          checked={data?.isChecked || false}
                          onChange={handleChangeCheckbox} />
                        <label className="form-check-label ">{data.name}</label>
                      </div>
                    ))}



                  </div>


                </div>


                <button className="TicketManager__filter__button" onClick={handleButton}>Lọc</button>



              </div>






            </div>
            <div className="TicketManager__filter__Item">

              <span>Xuất file (.csv)</span>

            </div>


          </div>




        </div>

        <div className="TicketManager__tableData">
          <table style={{ width: 100 + '%' }}>
            <tbody>
              <tr>
                <th>STT</th>
                <th>Booking code</th>
                <th>Số vé</th>
                <th style={{ width: 23 + '%' }}>Tên sự kiện</th>
                <th style={{ width: 17 + '%' }}>Tình trạng sử dụng</th>
                <th>Ngày sử dụng</th>
                <th>Ngày xuất vé</th>
                <th>Cổng check - in</th>

              </tr>

              {
                // dataForTable.map( (data:any , index:any) =>{
                //       return (
                //         [
                //           <tr key={index}> 
                //           <td style={{textAlign: 'center'}}>{index+1}</td>
                //           <td>{data.code}</td>
                //           <td>{data.ticket}</td>
                //           <td>Hội chợ triển lãm tiêu dùng 2021</td>
                //           <td>
                //             {
                //               data.state =='Đã sử dụng' && <UsedDiv/> ||
                //               data.state =='Chưa sử dụng' && <EverUsedDiv/> ||
                //               data.state =='Hết hạn' && <OverDateDiv/>
                //             }
                //           </td>
                //           <td style={{textAlign: 'right'}}>14/04/2021</td>
                //           <td style={{textAlign: 'right'}}>14/04/2021</td>
                //           <td>Cổng 1</td>
                //         </tr>
                //         ]
                //       )
                // })
                dataDisplay}



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
    
    
    
    { showModal && <div className="TicketManager__modal">
                  <div className="TicketManager__modal__item">
                                <div className="TicketManager__modal__item__header">
                                     Đổi ngày sử dụng vé
                                </div>

                                <div className="TicketManager__modal__item__des">
                                      <div className="TicketManager__modal__des__header">
                                          Số vé
                                      </div>
                                      <div className="TicketManager__modal__item__des__infor">PKG20210502</div>

                                </div>
                                <div className="TicketManager__modal__item__des">
                                      <div className="TicketManager__modal__des__header">
                                          Số vé
                                      </div>
                                      <div className="TicketManager__modal__item__des__infor">Vé cổng - Gói sự kiện</div>

                                </div>
                                <div className="TicketManager__modal__item__des">
                                      <div className="TicketManager__modal__des__header">
                                      Tên sự kiện
                                      </div>
                                      <div className="TicketManager__modal__item__des__infor">Hội trợ triển lãm hàng tiêu dùng 2021</div>

                                </div>
                                <div className="TicketManager__modal__item__des">
                                      <div className="TicketManager__modal__des__header">
                                      Hạn sử dụng
                                      </div>
                                      <div className="TicketManager__modal__item__des__calendar">
                                         <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />

                                      </div>

                                </div>

                                <div className="TicketManager__modal__item__des TicketManager__modal__item__des--button">
                                      <button className="TicketManager__modal__item__des_button TicketManager__modal__item__des_button--cancel"
                                        onClick={()=> setShowModal(false)}
                                      >
                                          Huỷ
                                      </button>
                                      <button className="TicketManager__modal__item__des_button TicketManager__modal__item__des_button--save">
                                          Lưu
                                      </button>
                                </div>

                  </div>


    </div>}
    
    
    
    </>
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




export default connect(mapStateToProps,mapDispatchToProps)(TicketManager)
