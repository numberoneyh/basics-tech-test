import React, { FC, useRef } from 'react'
import style from './Register.module.scss'

const Register: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <div className={style.register}>
      <h2>Registration</h2>
      <form className={style.form} encType='multipart/form-data' onSubmit={data => console.log(data)}>
        <label>
          <span>Full Name</span>
          <input type='text' />
        </label>
        <label>
          <span>Email</span>
          <input type='email' />
        </label>
        <label>
          <span>Password</span>
          <input type='password' />
        </label>
        <label>
          <span>Birthday</span>
          <input type='date' />
        </label>
        <div className={style.gender}>
          <span>Gender</span>
          <div>
            <label>
              <span>Mael</span>
              <input className={style.radio} type='radio' name='gender' value='Mael' />
              <span className={style.checkbox}></span>
            </label>
            <label>
              <span>Femael</span>
              <input className={style.radio} type='radio' name='gender' value='Femael' />
              <span className={style.checkbox}></span>
            </label>
          </div>
        </div>
        <div className={style.avatar}>
          <span>Avatar</span>
          <input ref={inputRef} className='hidden' type='file' />
          <button onClick={() => inputRef.current?.click()} type='button'>
            Photo
          </button>
        </div>

        <button className={style.submit} type='submit' onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export { Register }
