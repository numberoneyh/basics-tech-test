import React, {FC, useEffect, useState} from 'react'
import {IResponse, IUser} from "../models";
import {fetchUsers} from "../service";
import {CardList} from "../components/CardList";
import {Paginate} from "../components/Paginate";
import {defer} from "react-router-dom";

const HomePage: FC = () => {
  
  const [data, setData] = useState<IUser[] | undefined >([])
  const [response, setResponse] = useState<IResponse | undefined>()
  const [page, setPage] = useState<number>(1)

  const nexHandler = () => {
      setPage(page + 1)
  }

  const prevHandler = () => {
    setPage(page - 1)
  }
  
  const pageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPage(parseInt(e.currentTarget.innerText))
  }
  
  useEffect(() => {
    fetchUsers(`/users?page=${page}&limit=${6}`).then(res => {
      setData(res.docs)
      setResponse(res)
    })
  }, [page])
  
  return (
    <div className='mt-10'>
      <CardList data={data} />
      <Paginate response={response} nexHandler={nexHandler} prevHandler={prevHandler} pageHandler={pageHandler}/>
    </div>
  )
  
}

export { HomePage }
