import React, {FC, useRef, useState} from 'react';
import style from "../components/Form/Settings.module.scss";
import {useNavigate} from "react-router-dom";
import axios from "../axios";

const Settings: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  
  function inputChange(e: any) {
    setFile(e.target.files[0])
  }

  const createDevice = async (useUpd: any) => {
    const {data} = await axios.put('/users', useUpd)
    return data
  }
  
  const addDevice = (e:any) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('password', password)
    // @ts-ignore
    formData.append('avatar', file)
    createDevice(formData).then(data => console.log(data))
    navigate('/signin')
  }


  return (
    <div className={style.update}>
      <h2>Update</h2>
      <form className={style.form}>
        <label>
          <span>Full Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} type='text' />
        </label>
        <label>
          <span>Password</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        </label>
        <div className={style.avatar}>
          <span>Avatar</span>
          <input onChange={inputChange} type='file' ref={inputRef} className="hidden" />
          <button onClick={() => inputRef.current?.click()} type='button'>
            Photo
          </button>
        </div>
        <div className={style.submit}>
          <span>Avatar</span>
          <button type='submit' onClick={addDevice}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export  {Settings};