import * as React from 'react';

import './app.scss';
import {useEffect, useState} from "react";
import {TrifectaFooter} from "./components/footer/footer";

import trifecta from '../assets/trifecta.png';

import closeIcon from '../closeIcon/close_big.png';
import cookieIcon from './cookie.png';

//menu-icons
import mc from './assets/mc.png';
import wd from './assets/wd.png';
import nch from './assets/nch.png';

import st from './assets/st.png';
import pc from './assets/pc.png';
import mt from './assets/mt.png';
import lNew from './assets/new.png';
import inf from './assets/info.png';

import sett from './assets/sett.png';
import help from './assets/help.png';
import exit from './assets/exit.png';
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {Marketing} from "./components/marketing/marketing";
import {Info} from "./components/info/Info";
import {Cabinet} from "./components/cabinet/cabinet";
import {Withdraw} from "./components/withdraw/withdraw";
import {Help} from "./components/help/help";
import {Newbie} from "./components/newbie/newbie";
import {Settings} from "./components/settings/settings";
import {Cookie} from "./components/cookie/cookie";
import {Structure} from "./components/structure/structure";

const DEFAULT_CLASSNAME = 'trifecta-app';

const CookieApp = ({ setCookieConfirmed }) => {
    return (
        <div className={'cookie-app'}>
            <div className={'cookie-app-close'} onClick={() => setCookieConfirmed(true)}>
                <img src={closeIcon} alt={'close-cookie'} />
            </div>
            <img className={'cookie-app-back'} src={cookieIcon} alt={'cookie'} />
            <div className={'cookie-app-title'}>{"Мы используем Cookie"}</div>
            <div className={'cookie-app-text'}>{"Наш сайт использует файлы cookie для вашего максимального удобства. Пользуясь сайтом, вы соглашаетесь с нашими условиями использования cookie."}</div>
            <div className={'cookie-app-btn'} onClick={() => setCookieConfirmed(true)}>{"Принять"}</div>
        </div>
    )
}

export const TrifectaApp = () => {
    const [cookieConfirmed, setCookieConfirmed] = useState(false);

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch('https://trifecta-web-api.herokuapp.com/api/UserProfile/GetProfileInfo?userId=176d64e0-4f8c-4aea-ade1-783dabd1bbc6', {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setUserInfo(data));
    }, [])

    const navigate = useNavigate();

    const logOutHandler = () => {
        sessionStorage.removeItem('accessToken');
        navigate('/');
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>

            {!cookieConfirmed && <CookieApp setCookieConfirmed={setCookieConfirmed} />}

            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_side-menu`}>
                        <img className={`${DEFAULT_CLASSNAME}_side-menu_logo`} src={trifecta} alt={'logo'} />
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_profile`}>
                            <img src={"https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Sami-Viitama%CC%88ki--414x414.jpeg"} alt={"img"} />
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_profile_text`}>
                                <div>{userInfo?.firstName + " " + userInfo?.lastName}</div>
                                <div className={'level'}>{"6 уровень"}</div>
                            </div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Меню"}</div>
                            <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/'}><img src={mc} alt={'icon'}/> {"Мой кабинет"}</NavLink>
                            <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/withdraw'}><img src={wd} alt={'icon'}/> {"Вывод средств"}</NavLink>
                            <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/charges'}><img src={nch} alt={'icon'}/> {"Мои начисления"}</NavLink>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Trifecta"}</div>
                            <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/structure'}><img src={st} alt={'icon'}/> {"Структура"}</NavLink>
                            <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item disabled`} to={'#'}><img src={pc} alt={'icon'}/> {"Прогресс"}</NavLink>
                            <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/marketing'}><img src={mt} alt={'icon'}/> {"Маркетинг план"}</NavLink>
                            <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/newbie'}><img src={lNew} alt={'icon'}/> {"Запуск новичка"}</NavLink>
                            <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/info'}><img src={inf} alt={'icon'}/> {"Инфо"}</NavLink>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Управление"}</div>
                            <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/settings'}><img src={sett} alt={'icon'}/> {"Настройки"}</NavLink>
                            <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/help'}><img src={help} alt={'icon'}/> {"Помощь"}</NavLink>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} onClick={() => logOutHandler()}><img src={exit} alt={'icon'}/> {"Выйти"}</div>
                        </div>
                    </div>
                    <Routes>
                        <Route path={'/'} element={<Cabinet />} />
                        <Route path={'/marketing'} element={<Marketing />} />
                        <Route path={'/newbie'} element={<Newbie />} />
                        <Route path={'/withdraw'} element={<Withdraw />} />
                        <Route path={'/charges'} element={<Withdraw />} />
                        <Route path={'/structure'} element={<Structure />} />
                        <Route path={'/info'} element={<Info />} />
                        <Route path={'/settings'} element={<Settings />} />
                        <Route path={'/help'} element={<Help />} />
                        <Route path={'/cookie'} element={<Cookie />} />
                    </Routes>
                </div>
                <TrifectaFooter />
            </div>
        </div>
    )
}