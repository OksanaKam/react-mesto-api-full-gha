import React from 'react';
import logoPath from '../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header({
  isLoggedIn,
  email,
  handleSignout
}) {
    return (
        <header className="header">
          <img className="header__logo" src={logoPath} alt="место" />
          <div className='header__group'>
          <p className='header__user-email'>{email}</p>
          <Routes>
            <Route path='/signup' element={
              <Link className='header__menu' to={'/signin'}> 
                Войти
              </Link>}>
            </Route>
            <Route path='/signin' element={
              <Link className='header__menu' to={'/signup'}> 
                Регистрация
              </Link>}>
            </Route>
            <Route exact path='/' element={
              <Link className='header__menu'  onClick={handleSignout} to={'/signin'}> 
                Выйти
              </Link>}>
            </Route>
          </Routes>  
          </div>
        </header>
    );
}

export default Header;