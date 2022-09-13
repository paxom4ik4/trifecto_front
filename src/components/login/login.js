import * as React from 'react';

import './login.scss';
import google from './assets/google.png'
import trifecta from './assets/trifecto.png';

const DEFAULT_CLASSNAME = 'login';

const loginContent = (
    <>
        <input type={"text"} placeholder={"E-mail*"} />
        <input type={"password"} placeholder={"Введите пароль*"} />
    </>
)

const registerContent = (
    <>
        <div className={`${DEFAULT_CLASSNAME}_header`}>
            <input type={"text"} placeholder={"Фамилия*"} />
            <input type={"text"} placeholder={"Имя*"} />
        </div>

        <input type={"text"} placeholder={"E-mail*"} />
        <input type={"password"} placeholder={"Придумайте пароль (мин. 8 символов)*"} />
        <input type={"password"} placeholder={"Подтвердите пароль*"} />

        <div className={`${DEFAULT_CLASSNAME}_footer`}>
            <select placeholder={"Страна"}>
                <option>Беларусь</option>
                <option>Россия</option>
                <option>Казахстан</option>
            </select>
            <input className={'referal'} type={"text"} placeholder={"Ссылка реферала"} />
        </div>

    </>
)

export const Login = ({ setIsLoggedIn, isRegisterMode = true }) => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{isRegisterMode ? "Регистрация" : "Вход"}</div>

                {isRegisterMode ? registerContent : loginContent}

                <button onClick={() => setIsLoggedIn(true)} className={`${DEFAULT_CLASSNAME}_btn`}>{isRegisterMode ? "Зарегистрироваться" : "Войти"}</button>
                <button onClick={() => setIsLoggedIn(true)} className={`${DEFAULT_CLASSNAME}_btn google-btn`}><img src={google} alt={'google-logo'} /> {"Войдите через Google"}</button>

                <img className={`${DEFAULT_CLASSNAME}_trifecta`} src={trifecta} alt={'trifecta'} />
            </div>
        </div>
    )
}