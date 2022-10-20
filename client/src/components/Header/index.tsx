import {FC, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import style from './Header.module.scss'
import {useAuth} from "../../hooks/auth";
import {Profile} from "../Profile";
import {IUser} from "../../models";
import decode from "jwt-decode";

const Header: FC = () => {
  const navigate = useNavigate()
  const {token} = useAuth()
  const user: IUser = token ? decode(token) : {}
  const [state, setState] = useState<boolean>(false)

  const popupHandler = () => {
    setState(!state)
  }
  
  const signOut = () => {
    localStorage.removeItem('token')
    setState(false)
    navigate('/signin')
  }

  const {isAuth} = useAuth()

  return (
    <header className={style.header}>
      <div className='container'>
        <nav className={style.nav}>
          <ul className={style.list}>
            <Link className={style.link} to='/'>Home</Link>
              {isAuth && <Profile state={state} setState={setState} user={user} popupHandler={popupHandler} signOut={signOut}/>}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export { Header }
