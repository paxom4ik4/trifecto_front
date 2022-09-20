import * as React from 'react';

import './login.scss';
import google from './assets/google.png'
import trifecta from './assets/trifecto.png';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'login';

const LoginContent = () => {

    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');


    const handleLogin = () => {
        fetch('https://trifecta-web-api.herokuapp.com/api/Authentication/Login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                "email": loginEmail,
                "password": loginPassword
            })
        }).then(res => res.json()).then(data => {
            if (data.success && data.accessToken) {
                sessionStorage.setItem('accessToken', data.accessToken)
                navigate('/app/');
            } else {
                console.log(data);
            }
        })
    }


    return (
        <>
            <input type={"text"} placeholder={"E-mail*"} value={loginEmail} onChange={(e) => setLoginEmail(e.currentTarget.value)} />
            <input type={"password"} placeholder={"Введите пароль*"} value={loginPassword} onChange={(e) => setLoginPassword(e.currentTarget.value)} />

            <button onClick={() => handleLogin()} className={`${DEFAULT_CLASSNAME}_btn`}>{"Войти"}</button>
        </>
    )
}

const countries = {
    'Беларусь': 1,
    'Россия': 2,
    'Казахстан': 3,
}

const RegisterContent = ({ setIsRegisterMode }) => {

    const [registerSecondName, setRegisterSecondName] = useState('');
    const [registerFirstName, setRegisterFirstName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPasswordRep, setRegisterPasswordRep] = useState('');

    const [selectedCountry, setSelectedCountry] = useState('Беларусь');

    const [referral, setReferral] = useState('');

    const handleRegister = () => {
        fetch('https://trifecta-web-api.herokuapp.com/api/Authentication/Register', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                "firstName": registerFirstName,
                "lastName": registerSecondName,
                "email": registerEmail,
                "password": registerPassword,
                "confirmPassword": registerPasswordRep,
                "referralCode": referral,
                "country": countries[selectedCountry]
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setIsRegisterMode(false)
            } else {
                console.log(data);
            }
        })
    }


    return (
        <>
            <div className={`${DEFAULT_CLASSNAME}_header`}>
                <input type={"text"} placeholder={"Фамилия*"} value={registerSecondName} onChange={(e) => setRegisterSecondName(e.currentTarget.value)} />
                <input type={"text"} placeholder={"Имя*"} value={registerFirstName} onChange={(e) => setRegisterFirstName(e.currentTarget.value)} />
            </div>

            <input type={"text"} placeholder={"E-mail*"} value={registerEmail} onChange={(e) => setRegisterEmail(e.currentTarget.value)} />
            <input type={"password"} placeholder={"Придумайте пароль (мин. 8 символов)*"} value={registerPassword} onChange={(e) => setRegisterPassword(e.currentTarget.value)} />
            <input type={"password"} placeholder={"Подтвердите пароль*"} value={registerPasswordRep} onChange={(e) => setRegisterPasswordRep(e.currentTarget.value)} />

            <div className={`${DEFAULT_CLASSNAME}_footer`}>
                <select placeholder={"Страна"} onChange={(e) => setSelectedCountry(e.currentTarget.value)}>
                    <option defaultValue={true}>Беларусь</option>
                    <option>Россия</option>
                    <option>Казахстан</option>
                </select>
                <input className={'referral'} type={"text"} placeholder={"Ссылка реферала"} value={referral} onChange={(e) => setReferral(e.currentTarget.value)}/>
            </div>

            <button onClick={() => handleRegister()} className={`${DEFAULT_CLASSNAME}_btn`}>{"Зарегистрироваться"}</button>
        </>
    )
}

export const Login = ({ setIsRegisterMode, isRegisterMode = true }) => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{isRegisterMode ? "Регистрация" : "Вход"}</div>

                {isRegisterMode ? <RegisterContent setIsRegisterMode={setIsRegisterMode} /> : <LoginContent />}


                <button className={`${DEFAULT_CLASSNAME}_btn google-btn`}><img src={google} alt={'google-logo'} /> {"Войдите через Google"}</button>

                <img className={`${DEFAULT_CLASSNAME}_trifecta`} src={trifecta} alt={'trifecta'} />
            </div>
        </div>
    )
}