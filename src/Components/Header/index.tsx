import {useState} from 'react'
import './Header.css'
import search from '../../style/img/search.svg'
import mail from '../../style/img/mail.svg'
import bell from '../../style/img/bell.svg'
import avatar from '../../style/img/avatar.svg'

export default function Header() {

    const [seatch , setSeatch] = useState('')

  return (
    <div className="Header">

        <div className="Header__input">
            <input type="text"
                value={seatch} 
                onChange={ e => setSeatch(e.target.value)}
                placeholder='Search'
            />
            <div className="Header__input__logo">
                <img src={search} alt="" />
            </div>

        </div>


        <div className="Header__infor">

            <div className="Header__infor__mail">
                <img src={mail} alt="" />
            </div>

            <div className="Header__infor__bell">
                <img src={bell} alt="" />
            </div>

            <div className="Header__infor__avatar">
                <img src={avatar} alt="" />
            </div>

        </div>
        
        

    </div>
  )
}
