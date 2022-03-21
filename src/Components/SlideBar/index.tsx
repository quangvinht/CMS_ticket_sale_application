import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import  './SlideBar.css'

import Home from '../../style/img/Home.svg';
import HomeWhite from '../../style/img/HomeWhite.svg';

import ticket from '../../style/img/ticket.svg';
import whiteTicket from '../../style/img/whiteTicket.svg';



import changeticket from '../../style/img/changeticket.svg';

import whiteChange from '../../style/img/whiteChange.svg';


import setting from '../../style/img/setting.svg';
import whiteSetting from '../../style/img/whiteSetting.svg';

import insight from '../../style/img/insight.svg';
import c from '../../style/img/c.svg';









export default function SlideBar() {

    const [logo , setLogo] = useState(true)
    const [logoHome , setLogoHome] = useState(false)
    const [logoChange , setLogoChange] = useState(true)
    const [logoSetting , setLogoSetting] = useState(true)


    useEffect(( ) =>{
        
    const slidebars = document.querySelectorAll('.SlideBar__Item')
    

    slidebars.forEach( (slidebar:any) => {

        slidebar.onclick = function () {
    
           let items = document.querySelector<HTMLElement>('.SlideBar__Item.SlideBar__Item--active')!
            items.classList.remove('SlideBar__Item--active')
            
            
            this.classList.add('SlideBar__Item--active')
            
                          
        }
    })
    },[])
       
    const handleLogo = ( ) => {
        setLogo(false)


        

        setLogoHome(true)
        setLogoChange(true)
        setLogoSetting(true)
    }

    const handleLogoHome = ( ) => {
        setLogoHome(false)

        setLogo(true)
        setLogoChange(true)
        setLogoSetting(true)
        
    }

    const handleLogoChange = ( ) => {
        setLogoChange(false)

        setLogo(true)
        setLogoHome(true)
        setLogoSetting(true)


    }

    const handleLogoSetting = ( ) => {
        setLogoSetting(false)

        setLogo(true)
        setLogoHome(true)
        setLogoChange(true)
    }
    



  return (
    <div className="SlideBar">
        
            <div className="SlideBar__logo">
                <img src={insight} alt="" />
            </div>

            <div className="SlideBar__list">
                <Link to="/">
                    <div className="SlideBar__Item SlideBar__Item--active "
                        onClick={ handleLogoHome}
                    
                    >

                        <div className="SlideBar__img">
                            <img src={
                                logoHome ? Home : HomeWhite
                            } alt="" />
                        </div>

                        <div className="SlideBar__Item__text ">
                            Trang chủ
                        </div>

                    </div>
                </Link>

                <Link to="/ticket-manager">
                   <div className="SlideBar__Item  "
                        onClick={ handleLogo}
                   
                   >

                        <div className="SlideBar__img" >
                            <img src={
                                logo ? ticket : whiteTicket
                            } alt="" />
                        </div>

                        <div className="SlideBar__Item__text">
                        Quản lý vé
                        </div>
                

                    </div>
                </Link>
                    
                
                <Link to="/change-ticket">
                    <div className="SlideBar__Item "
                        onClick={ handleLogoChange}
                    
                    >

                        <div className="SlideBar__img" >
                            <img src={
                                logoChange ? changeticket : whiteChange
                            } alt="" />
                        </div>

                        <div className="SlideBar__Item__text">
                            Đổi soát vé
                        </div>

                    </div>
                </Link>
                <Link to='/setting'>
                    <div className="SlideBar__Item "
                    onClick={ handleLogoSetting}
                >

                    <div className="SlideBar__img" >
                        <img src={
                            logoSetting ? setting : whiteSetting
                        } alt="" />
                    </div>

                    <div className="SlideBar__Item__text">
                        Cài đặt
                    </div>

                    </div>
                 </Link>


            </div>

            <div className="SlideBar__package">
                 Gói dịch vụ
            </div>

            <div className="SlideBar_footer">
               
                    Copyright   
                    <div className="SlideBar_footer__img">
                        <img src={c} alt="" />
                    </div>
                     2020 Alta Software 
                
            </div>
        
        
        
    </div>
  )
}
