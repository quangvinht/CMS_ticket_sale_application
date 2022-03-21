import {useState,useEffect} from 'react'
import './Setting.css'
import Header from '../Header'
import search from '../../style/img/search.svg'
import filterLogo from '../../style/img/filterLogo.svg'
import Edit from '../../style/img/Edit.svg'
import prevArrow from '../../style/img/prevArrow.svg'
import nextArrow from '../../style/img/nextArrow.svg'
import thirdPoint from '../../style/img/thirdPoint.svg'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {connect} from 'react-redux';

import { TimePicker } from 'antd';
import moment from 'moment';
import {fetchData} from '../../redux/DatAlta/DataAltaActions'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ReactPaginate from 'react-paginate';


 function Setting({dataTableRedux,fetchData}:any) {


  useEffect(() => {
        
    fetchData()
    


},[])

 
const options = [
  'Đang áp dụng', 'Tắt'
];
const defaultOption = options[0];


const onChangeTime = (time:any, timeString:any) =>  {
  console.log(time, timeString);
}




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




const dataTable = [
    {
        name:'Gói gia đình',
        price:'90.000 VNĐ',
        priceCombo:'360.000 VNĐ/4 Vé',
        state:'Đang áp dụng'


    },
    {
        name:'Gói sự kiện',
        price:'20.000 VNĐ',
        priceCombo:'',
        state:'Tắt'

    },
]


const [dataForTable , setDataForTable] = useState(dataTable)

const UsedDiv = ()=>{
  return (
    <div className="used used--processing">
      <div className="used-point"></div>
      <div className='used-text'>Đang áp dụng</div>
      </div>
  )
}


const OverDateDiv = ()=>{
  return (
    <div className="used used-overdate used--closing">
      <div className="overdate-point"></div>
      <div className='overdate-text'>Tắt</div>
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
  return rows.filter( (row:any) => row.name.toLowerCase().indexOf(seatch) > -1 )
}



/////


///Pagination:

const [pageNumber , setpageNumber] = useState(0)

const dataPerPage = 2

const pagesVisited =  pageNumber * dataPerPage

const dataBeforDisplay = dataForTable.slice( pagesVisited , pagesVisited + dataPerPage )

const dataDisplay = dataBeforDisplay.map( (data:any , index:any) =>{
                                       
  return (
    [
      <tr key={index}> 
        <td style={{textAlign: 'center'}}>{index+1}</td>
        <td>ALT20210501</td>
        <td>{data.name}</td>
        <td>14/04/2021<br/>
                8:00:00
        </td>
        <td>
                14/04/2021<br/>
                23:00:00
        </td>
        <td>{data.price}</td>
        <td>{data.priceCombo}</td>
        <td>
            {data.state == 'Đang áp dụng' ? <UsedDiv/> : <OverDateDiv/>}
        
        </td>
        <td>
            <div className="Setting__Edit" onClick={() =>{ setShowModalUpdate(true)}}>
                    <div className="Setting__Edit__img">
                        <img src={Edit} alt="" />
                    </div>
                    <div> Cập nhật</div>
            </div>
           

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

       const [showModalUpdate , setShowModalUpdate] = useState(false)
       const [showModalAdd , setShowModalAdd] = useState(false)


////


  return (
    <>
    <div className="Setting">




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

          {/* <div className="TicketManager__filter__List">

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


          </div> */}
          <div className="TicketManager__filter__List">
                <button className="Setting__export">Xuất file (.csv) </button>
                <button className="Setting_addTicket" onClick={() => setShowModalAdd(true)}>Thêm gói vé</button>
          </div>




        </div>

        <div className="TicketManager__tableData">
          <table style={{ width: 100 + '%' }}>
            <tbody>
              <tr>
                <th>STT</th>
                <th>Mã gói</th>
                <th>Tên gói vé</th>
                <th>Ngày áp dụng</th>
                <th>TNgày hết hạn</th>
                <th>Giá vé (VNĐ/Vé)</th>
                <th>Giá Combo (VNĐ/Combo)</th>
                <th>Tình trạng</th>
                <th></th>

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
    
    
    {
      showModalUpdate &&

    
    <div className="TicketManager__modal">
                  <div className="TicketManager__modal__item">
                    <div className="Setting_modal__title">
                        Cập nhật thông tin gói vé
                    </div>
                    <div className="Setting__modal__list">
                        <div className="Setting__modal____item">
                                <div>Mã sự kiện <span>*</span> </div>
                                <input type="text" value="PKG20210502" className="input--setting"/>
                        </div>
                        <div className="Setting__modal____item">
                                <div>Tên sự kiện </div>
                                <input type="text" value="Hội chợ triển lãm hàng tiêu dùng 2021"/>
                        </div>
                    </div>

                    <div className="Setting__modal__dates">
                        <div className="Setting__modal__timeDAte-item">
                          <div className="Setting__modal__dates__item">
                              <div className="Setting__modal__dates__item__header">Ngày áp dụng</div>
                              <div className="Setting__modal_date-and-time">
                                  <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />

                                  <input type="time" value="08:00:00" step="1"/>
                              </div>
                          </div>
                          <div className="Setting__modal__dates__item">
                              <div className="Setting__modal__dates__item__header">Ngày áp dụng</div>
                              <div className="Setting__modal_date-and-time">
                                  <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />

                                  <input type="time" value="08:00:00" step="1"/>
                              </div>
                          </div>
                          </div>
                    </div>

                    <div className="Setting__modal__prices">
                        <div className="Setting__modal__prices__header">
                        Giá vé áp dụng
                        </div>
                        <div className="Setting__modal__prices__item">
                            <div className="form-check" >
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                      />
                            </div>
                            <span>Vé lẻ (vnđ/vé) với giá</span>
                            <span className="Setting__modal__disable">
                              Giá vé
                            </span>
                            <span>/ vé</span>
                        </div>

                    </div>
                    <div className="Setting__modal__prices">
                       
                        <div className="Setting__modal__prices__item">
                            <div className="form-check" >
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                      />
                            </div>
                            <span>Combo vé với giá</span>
                            <span className="Setting__modal__disable">
                              Giá vé
                            </span>/ <span className="Setting__modal__disable Setting__modal__disable2 ">
                              vé
                            </span>
                            <span>/ vé</span>
                        </div>

                    </div>
                    <div className="Setting__modal__dropdown">
                          <div className="Setting__modal__dropdown__header">
                           Tình trạng

                          </div>
                          <Dropdown 
                            options={options}  
                            value={defaultOption} 
                            placeholder="Select an option" 
                            
                          />
                          <div className="Setting__modal__dropdown__footer">
                             <span>*</span>là thông tin bắt buộc
                          </div>
                    </div>

                    <div className="Setting__modal__button">
                            <button className="Setting__modal__button__cancle"
                             onClick={() => setShowModalUpdate(false)}>
                                 Huỷ 
                            </button>
                            <button className="Setting__modal__button__save">
                            Lưu
                            </button>

                    </div>


      </div>

    </div>

 }

  {
    showModalAdd && 

    <div className="TicketManager__modal">
                  <div className="TicketManager__modal__item">
                    <div className="Setting_modal__title">
                      Thêm gói vé
                    </div>
                    <div className="Setting__modal__list">
                        
                        <div className="Setting__modal____item">
                             <div>Tên gói vé <span>*</span> </div>

                              <input type="text" placeholder="Nhập tên gói vé"/>
                        </div>
                    </div>

                    <div className="Setting__modal__dates">
                        <div className="Setting__modal__timeDAte-item">
                          <div className="Setting__modal__dates__item">
                              <div className="Setting__modal__dates__item__header">Ngày áp dụng</div>
                              <div className="Setting__modal_date-and-time">
                                  <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)}
                                    
                                  />

                                  <input type="time"  step="1" placeholder="hh:mm:ss"/>
                              </div>
                          </div>
                          <div className="Setting__modal__dates__item">
                              <div className="Setting__modal__dates__item__header">Ngày áp dụng</div>
                              <div className="Setting__modal_date-and-time">
                                  <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />

                                  <input type="time" placeholder="hh:mm:ss" step="1"/>
                              </div>
                          </div>
                          </div>
                    </div>

                    <div className="Setting__modal__prices">
                        <div className="Setting__modal__prices__header">
                        Giá vé áp dụng
                        </div>
                        <div className="Setting__modal__prices__item">
                            <div className="form-check" >
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                      />
                            </div>
                            <span>Vé lẻ (vnđ/vé) với giá</span>
                            <span className="Setting__modal__disable">
                              Giá vé
                            </span>
                            <span>/ vé</span>
                        </div>

                    </div>
                    <div className="Setting__modal__prices">
                       
                        <div className="Setting__modal__prices__item">
                            <div className="form-check" >
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                      />
                            </div>
                            <span>Combo vé với giá</span>
                            <span className="Setting__modal__disable">
                              Giá vé
                            </span>/ <span className="Setting__modal__disable Setting__modal__disable2 ">
                              vé
                            </span>
                            <span>/ vé</span>
                        </div>

                    </div>
                    <div className="Setting__modal__dropdown">
                          <div className="Setting__modal__dropdown__header">
                           Tình trạng

                          </div>
                          <Dropdown 
                            options={options}  
                            value={defaultOption} 
                            placeholder="Select an option" 
                            
                          />
                          <div className="Setting__modal__dropdown__footer">
                             <span>*</span>là thông tin bắt buộc
                          </div>
                    </div>

                    <div className="Setting__modal__button">
                            <button className="Setting__modal__button__cancle"
                             onClick={() => setShowModalAdd(false)}>
                                 Huỷ 
                            </button>
                            <button className="Setting__modal__button__save">
                            Lưu
                            </button>

                    </div>


      </div>

    </div>
  }
  
    
    
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




export default connect(mapStateToProps,mapDispatchToProps)(Setting)
