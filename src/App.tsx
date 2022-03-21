// import logo from './logo.svg';
import {useEffect,useState} from 'react'
import './App.css';




import {Provider} from 'react-redux'
import store from './redux/store'
import SlideBar from './Components/SlideBar'
import TicketManager from './Components/TicketManager'
import HomeTicket from './Components/HomeTicket'
import ChangeTicket from './Components/ChangeTicket'
import ChangeTicketEvent from './Components/ChangeTicketEvent'
import Setting from './Components/Setting'


import {Routes , Route , Link , } from 'react-router-dom'



function App(){
  


 
  return (
    
    <div className="App">
      
        
              
               
        
        <Routes>
            
          <Route  path={'/ticket-manager' } element={<><SlideBar /> <TicketManager/>   </>}></Route>
          <Route  path={'/' } element={<><SlideBar /> <HomeTicket/>   </>}></Route>
          <Route  path={'/change-ticket' } element={<><SlideBar /><ChangeTicket/>   </>}></Route>
          <Route  path={'/change-ticket/event' } element={<><SlideBar /><ChangeTicketEvent/>   </>}></Route>
          <Route  path={'/setting' } element={<><SlideBar /><Setting/>   </>}></Route>


       
       </Routes>
        



       
       


    </div>
    
  );
}

export default App;
