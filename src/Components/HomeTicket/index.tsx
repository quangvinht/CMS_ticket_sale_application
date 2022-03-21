import {useState , useEffect , useCallback} from 'react'
import './HomeTicket.css'
import Header from '../Header'
import DatePicker from "react-datepicker";
import {connect} from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer , PieChart, Pie, Sector, } from 'recharts';



import {fetchData} from '../../redux/DatAlta/DataAltaActions'


const datapieChart = [
  { name: "", value: 13568 ,fill:'#FF8A48'},
  { name: "", value: 56024,fill:'#4F75FF' },
  
  
];

const datapieChart1 = [
  { name: "", value: 28302,fill:'#4F75FF' },
  { name: "", value: 30256 ,fill:'#FF8A48'},

  
  
  
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius ) * cos;
  const sy = cy + (outerRadius ) * sin;
  const mx = cx + (outerRadius ) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} dominantBaseline="central"  >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
        className='pointpieChart'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        className='numberPieCart'
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {``}
      </text>
    </g>
  );
};






 function HomeTicket( {dataTableRedux,fetchData}:any) {


  const yxais = document.querySelectorAll('.yAxis tspan')
  
  const numberYaxis :any= ['140','180','220','260']



  yxais.forEach( (item,index) => {
    item.innerHTML = numberYaxis[index] + 'tr  ' + ' '
     
      
  })
 
  

  
  useEffect(() => {
        
    fetchData()
    


},[])


  ///calendar:
  const [startDate, setStartDate] = useState(new Date());

  ////


////chart-area:

  
  


  const [chartArea , setChartArea] = useState(dataTableRedux.dataChartArea)


////////////////////////////////



/// chart-pie:
const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );


  const [activeIndex1, setActiveIndex1] = useState(0);
  const onPieEnter1 = useCallback(
    (_, index) => {
      setActiveIndex1(index);
    },
    [setActiveIndex1]
  );

///






  return (
    <div className="HomeTicket">
      
      <Header/>
      
      <div className="HomeTicket__container">
          <div className="HomeTicket__container--title">
          Thống kê
          </div>

          <div className="HomeTicket__name-calendar">
              <div className="HomeTicket__name-calendar--name">
                    Doanh thu
              </div>

              <div className="TicketManager__filter--filter--date--item">
      
                                     
      
                                    <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} 
                                    
                              
                                    
                                    />
                                    
              </div>




            
          </div>


          <div className="HomeTicket__ChartArea">

          <ResponsiveContainer width="99%" aspect={ 5}>
                <AreaChart
                width={500}
                height={400}
                data={chartArea}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FAA05F" stopOpacity={1}/>
                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.5}/>
                    </linearGradient>
                 </defs>
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[140, 260]}  ticks={[140, 180, 220, 260]}/>
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#FAA05F" fill="url(#colorUv)" />
                </AreaChart>
        </ResponsiveContainer>  
            
          </div>

          <div className="HomeTicket__des">
                <div>Tổng doanh thu theo tuần</div>
                <div>525.145.000 <span>đồng</span></div>
          </div>

          <div className="HomeTicket__ChartPie">
                <div className="HomeTicket__ChartPie--calendar">
                  <div className="TicketManager__filter--filter--date--item">
        
                                      
                        
                        <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} 
                        

                        
                        />
        
                  </div>
                  
                </div>

                <div className="HomeTicket__ChartPie--item">
                  
                    <div className="HomeTicket__ChartPie--item-header">
                        Gói gia đình
                    </div>

                    <div className="HomeTicket__ChartPie--item-chart">
                      
                    
                                <PieChart width={413} height={400}>
                                  <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={datapieChart}
                                    cx={200}
                                    cy={200}
                                    
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                  />
                                </PieChart>
                   
                      
                      
                    </div>

                
                </div>

                <div className="HomeTicket__ChartPie--item">
                  
                    <div className="HomeTicket__ChartPie--item-header">
                      Gói sự kiện
                    </div>

                    <div className="HomeTicket__ChartPie--item-chart">
                      
                    
                                <PieChart width={413} height={400}>
                                  <Pie
                                    activeIndex={activeIndex1}
                                    activeShape={renderActiveShape}
                                    data={datapieChart1}
                                    cx={200}
                                    cy={200}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter1}
                                  />
                                </PieChart>
                   
                      
                      
                    </div>

                
                </div>


                <div className="HomeTicket__Chartdescrip">
                    <div className="HomeTicket__Chartdescrip--item">
                            <div></div>
                            <div>Vé đã sử dụng</div>
                      
                    </div>

                    <div className="HomeTicket__Chartdescrip--item HomeTicket__Chartdescrip--item-orange">
                            <div></div>
                            <div>Vé chưa sử dụng</div>
                      
                    </div>
            
                </div>
              
              
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




export default connect(mapStateToProps,mapDispatchToProps)(HomeTicket)