import React, {FC, useState} from 'react';
import style from "./Profile.module.scss"
import {Link} from "react-router-dom";
import {IUser} from "../../models";

interface ProfileProps {
  popupHandler: () => void
  signOut: () => void
  user: IUser
  state: boolean
  setState: (state: boolean) => void
}

const Profile: FC<ProfileProps> = ({popupHandler, state, signOut, user, setState}) => {
  

  return (
      <div className={style.profile}>
        <button onClick={popupHandler} className={style.button}>
          <img src={`${process.env.REACT_APP_BASE_URL}/${user?.avatar}`} alt={user.fullName}/>
        </button>
        {state && <div className={style.popup}>
          <div className={style.popup__user}>
            <div>{user.fullName}</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
              <div className="text-center py-1"><Link to="/settings" onClick={() => setState(false)} className={style.popup__link}>Settings</Link></div>
          <div className="py-1">
            <button onClick={signOut} className={style.popup__button}>Sign out</button>
          </div>
        </div>}
      </div>
      
  );
};

export  {Profile};