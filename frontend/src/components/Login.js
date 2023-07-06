import { useForm } from "../hooks/useForm";

function Login({ handleLogin }) {
    const {formValue, handleChange, errors, isValid} = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(formValue.email, formValue.password);
    }

    return(
        <section className="login">
            <form className="login__form"
                  name="login__form"
                  action="#"
                  method="get"
                  onSubmit={handleSubmit}
                  noValidate>
                <h2 className="login__title">Вход</h2>
                <input className="login__input" 
                       id="email" 
                       name="email" 
                       type="email"
                       placeholder="Email"
                       value={formValue.email || ''}
                       onChange={handleChange}
                       minLength={2}
                       maxLength={50}
                       required />
                <span className={`login__input-error ${ isValid ? '' : 'login__error_visible' }`}>{errors.email}</span>
                <input className="login__input"
                       id="password"
                       name="password"
                       type="password"
                       placeholder="Пароль"
                       value={formValue.password || ''}
                       onChange={handleChange}
                       minLength={8}
                       maxLength={20}
                       required />
                <span className={`login__input-error ${ isValid ? '' : 'login__error_visible' }`}>{errors.password}</span>
                <button className={`login__button ${ !isValid && 'login__button_disabled' }`} 
                            type="submit" 
                            aria-label="Войти"
                            disabled={!isValid}>Войти</button>
            </form>
        </section>
    )
}

export default Login;