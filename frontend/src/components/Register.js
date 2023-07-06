import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function Register({ handleRegister }) {
    const {formValue, handleChange, errors, isValid } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(formValue.email, formValue.password)
    }

    return(
        <section className="register">
            <form className="register__form"
                  name="register__form"
                  action="#"
                  method="get"
                  onSubmit={handleSubmit}
                  noValidate>
                <h2 className="register__title">Регистрация</h2>
                <input className="register__input" 
                       id="email" 
                       name="email" 
                       type="email"
                       placeholder="Email"
                       value={formValue.email || ''}
                       onChange={handleChange}
                       minLength={2}
                       maxLength={50}
                       required />
                <span className={`register__input-error ${ isValid ? '' : 'register__error_visible' }`}>{errors.email}</span>
                <input className="register__input"
                       id="password"
                       name="password"
                       type="password"
                       placeholder="Пароль"
                       value={formValue.password || ''}
                       onChange={handleChange}
                       minLength={8}
                       maxLength={20}
                       required />
                <span className={`register__input-error ${ isValid ? '' : 'register__error_visible' }`}>{errors.password}</span>
                <button className={`register__button ${ !isValid && 'register__button_disabled' }`}
                            type="submit" 
                            aria-label="Зарегистрироваться">Зарегистрироваться</button>
                   
            </form>
            <Link className="register__link" to={'/signin'}>
                Уже зарегистрированы? Войти
            </Link>  
        </section>
    )
}

export default Register;