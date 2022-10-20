import React, { FC } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import style from './Login.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "../../axios";
import {AxiosError} from "axios";
import {Inputs} from "../../models";



interface AuthResponse {
  message(message: any): unknown;

  token: string;
}

const Login: FC = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const fromPage = location.state?.from?.pathname || '/'
  const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    try {
      const {data} = await axios.post<AuthResponse>('/login', body)
      localStorage.setItem('token', data.token)
      navigate(fromPage, {replace: true})
    } catch (e: AxiosError | any) {
      alert(e.response.data.message)
    }
  };
  return (
    <div className={style.login}>
      <h2>Log in</h2>
      <form className={style.form} encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Email</span>
          <input {...register('email')} type='email' placeholder='example@example.com' defaultValue="admin@gmail.com" />
        </label>
        <label>
          <span>Password</span>
          <input {...register('password')} type='password' defaultValue="123456" />
        </label>
        <button className={style.submit} type='submit'>
          Login
        </button>
      </form>
      <div className={style.link}>
        <span>Not registered?</span>
        <Link to='/signup'>Create account</Link>
      </div>
    </div>
  )
}

export { Login }
