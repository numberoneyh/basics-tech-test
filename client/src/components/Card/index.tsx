import {FC} from "react";
import {IUser} from "../../models";
import style from "./Card.module.scss"

export const Card: FC<IUser> = ({avatar, fullName, dateBirth}) => {
  return (
    <article className={style.card}>
      <img className={style.img} src={`${process.env.REACT_APP_BASE_URL}/${avatar}`} alt="avatar"/>
      <div className='flex gap-2 mt-4'>
        <span className={style.name}>Full Name:</span>
        <h3 className={style.title}>{fullName}</h3>
      </div>
      <div className='flex gap-2 mt-1'>
        <span className={style.date}>Date Birth:</span>
        <span className={style.desc}>{dateBirth}</span>
      </div>
    </article>
  )
}
