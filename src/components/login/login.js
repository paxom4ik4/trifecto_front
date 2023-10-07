import * as React from 'react';

import './login.scss';
import trifecta from './assets/trifecto.png';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

import eye from './eye.png';
import eyeClose from './eyeClose.png';

import selectArrow from '../../assets/selectArrow.png';

const DEFAULT_CLASSNAME = 'login';

const LoginContent = () => {

    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        fetch('https://trifecta.by/api/Authentication/Login', {
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
                sessionStorage.setItem('userId', data.userId)
                navigate('/app/');
            } else {
                toast.error(data.errors.join(','));
            }
        })
    }


    return (
        <>
            <input type={"text"} placeholder={"E-mail"} value={loginEmail} onChange={(e) => setLoginEmail(e.currentTarget.value)} />
            <div className={`${DEFAULT_CLASSNAME}_login-container`}>
                <input type={!showPassword ? "password" : "text"} placeholder={"Введите пароль"} value={loginPassword} onChange={(e) => setLoginPassword(e.currentTarget.value)} />
                <img alt={'password-eye'} src={!showPassword ? eye : eyeClose} onClick={() => setShowPassword(!showPassword)} />
            </div>

            <button onClick={() => handleLogin()} className={`${DEFAULT_CLASSNAME}_btn`}>{"Войти"}</button>
        </>
    )
}

const countries = {
    'Беларусь': 1,
    'Россия': 2,
    'Казахстан': 3,
}

const RegisterContent = () => {

    const navigate = useNavigate();

    const [showPasswordRegister, setShowPasswordRegister] = useState(false);

    const [registerSecondName, setRegisterSecondName] = useState('');
    const [registerFirstName, setRegisterFirstName] = useState('');
    const [registerPatronymic, setRegisterPatronymic] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPasswordRep, setRegisterPasswordRep] = useState('');
    const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
    const [registerDateOfBirth, setRegisterDateOfBirth] = useState(null);

    const [selectedCountry, setSelectedCountry] = useState('Беларусь');

    const [referral, setReferral] = useState('');

    const handleRegister = () => {
        fetch('https://trifecta.by/api/Authentication/Register', {
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
                "patronymic": registerPatronymic,
                "email": registerEmail,
                "phoneNumber": registerPhoneNumber,
                "password": registerPassword,
                "confirmPassword": registerPasswordRep,
                "referralCode": referral,
                "dateOfBirth": (registerDateOfBirth || ""),
                "country": countries[selectedCountry]
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                sessionStorage.setItem('accessToken', data.accessToken)
                sessionStorage.setItem('userId', data.userId)
                navigate('/app/');
            } else {
                toast.error(data.errors.join(','));
            }
        })
    }

    const [agreement1, setAgreement1] = useState(false)
    const [agreement2, setAgreement2] = useState(false)


    return (
        <>
            <div className={`${DEFAULT_CLASSNAME}_header`}>
                <input type={"text"} placeholder={"Фамилия"} value={registerSecondName} onChange={(e) => setRegisterSecondName(e.currentTarget.value)} />
                <input type={"text"} placeholder={"Имя"} value={registerFirstName} onChange={(e) => setRegisterFirstName(e.currentTarget.value)} />
                <input type={"text"} placeholder={"Отчество"} value={registerPatronymic} onChange={(e) => setRegisterPatronymic(e.currentTarget.value)} />
            </div>

            <input type={"tel"} placeholder={"Номер телефона"} value={registerPhoneNumber} onChange={(e) => setRegisterPhoneNumber(e.currentTarget.value)} />
            <input type={"date"} placeholder={"Дата рождения"} value={registerDateOfBirth} onChange={(e) => setRegisterDateOfBirth(e.currentTarget.value)} />

            <input type={"text"} placeholder={"E-mail"} value={registerEmail} onChange={(e) => setRegisterEmail(e.currentTarget.value)} />
            <div className={`${DEFAULT_CLASSNAME}_login-container`}>
                <input type={showPasswordRegister ? "text" : "password"} placeholder={"Придумайте пароль (мин. 8 символов)"} value={registerPassword} onChange={(e) => setRegisterPassword(e.currentTarget.value)} />
                <img alt={'password-login-eye'} src={!showPasswordRegister ? eye : eyeClose} onClick={() => setShowPasswordRegister(!showPasswordRegister)} />
            </div>
            <input type={"password"} placeholder={"Подтвердите пароль"} value={registerPasswordRep} onChange={(e) => setRegisterPasswordRep(e.currentTarget.value)} />

            <div className={`${DEFAULT_CLASSNAME}_footer`}>
                <select style={{ backgroundImage: `url(${selectArrow})` }} placeholder={"Страна"} onChange={(e) => setSelectedCountry(e.currentTarget.value)}>
                    <option defaultValue={true}>Беларусь</option>
                    <option>Россия</option>
                    <option>Казахстан</option>
                </select>
                <input className={'referral'} type={"text"} placeholder={"Реферальная ссылка"} value={referral} onChange={(e) => setReferral(e.currentTarget.value)}/>
            </div>

            <div className={`${DEFAULT_CLASSNAME}_agreement`}>
                <div className={`${DEFAULT_CLASSNAME}_agreement_item`}>
                    <div><input value={agreement1} onChange={() => setAgreement1(!agreement1)} type={"checkbox"} /></div>
                    <p>Я ознакомился с <a target={"_blank"} href={"https://trifecta.by/trifecto_Documents/Pers.pdf"}>Политикой обработки данных</a> и <a target={"_blank"} href={"https://trifecta.by/trifecto_Documents/Sogl.pdf"}>Пользовательским соглашением</a> и согласен с их условиями</p>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_agreement_item`}>
                    <div><input value={agreement2} onChange={() => setAgreement2(!agreement2)} type={"checkbox"} style={{ width: '16px', height: "16px" }}/></div>
                    <p>Я ознакомился с <a target={"_blank"} href={"https://trifecta.by/trifecto_Documents/Conf.pdf"}>Политикой конфиденциальности</a> компании</p>
                </div>
            </div>

            <button disabled={!agreement1 || !agreement2 || !registerFirstName.length || !registerSecondName.length || !registerPatronymic.length || registerPassword.length < 8 || !registerPasswordRep.length || !registerPhoneNumber.length || !registerEmail.length || !referral.length} onClick={() => handleRegister()} className={`${DEFAULT_CLASSNAME}_btn`}>{"Зарегистрироваться"}</button>
        </>
    )
}

export const Login = ({ isRegisterMode = true }) => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{isRegisterMode ? "Регистрация" : "Вход"}</div>

                {isRegisterMode ? <RegisterContent /> : <LoginContent />}

                <img className={`${DEFAULT_CLASSNAME}_trifecta`} src={trifecta} alt={'trifecta'} />
            </div>
        </div>
    )
}
