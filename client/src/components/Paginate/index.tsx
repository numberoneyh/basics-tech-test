import React, {FC} from "react";
import {IResponse} from "../../models";
import style from "./Paginate.module.scss"

interface PaginateProps {
  response: IResponse | undefined
  nexHandler: () => void;
  prevHandler: () => void
  pageHandler:(e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Paginate: FC<PaginateProps> = ({response, nexHandler, prevHandler, pageHandler}) => {
  const totalPage = [...new Array(response?.totalPages)]

  return (
    <div className={style.paginate}>
      <ul className={style.ul}>
        <li>
          <button disabled={!response?.hasPrevPage} className={style.button} onClick={prevHandler}>prev</button>
        </li>
        {totalPage.map((ar, index) => (
          <li key={index}>
            <button className={response?.page === index + 1 ? style.active : style.page} onClick={pageHandler}>{index + 1}</button>
          </li>
        ))}
        <li>
          <button disabled={!response?.hasNextPage} className={style.button} onClick={nexHandler}>next</button>
        </li>
      </ul>
    </div>
  );
};
