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

import noPhoto from './assets/noPhoto.png';

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
import {Charges} from "./components/charges/charges";
import {Progress} from "./components/progress/progress";
import {Admin} from "./admin/admin";
import {Docs} from "./components/docs/docs";

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
    const navigate = useNavigate();

    const [cookieConfirmed, setCookieConfirmed] = useState(false);

    const [userInfo, setUserInfo] = useState(null);
    const [userReferral, setUserReferral] = useState('');
    const [currentPackage, setCurrentPackage] = useState(null);

    const [IS_VERIFIED, setIsVerified] = useState(false);

    useEffect(() => {
        const USER_ID = sessionStorage.getItem('userId');
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch(`http://trifecta.by:5000/api/UserProfile/GetProfileInfo?userId=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUserInfo(data)
                setIsVerified(data.isVerifiedUser);
                if (data.isVerifiedUser) {
                    setCookieConfirmed(true);
                }
                sessionStorage.setItem('isAuthorized', data.isVerifiedUser)
            });

        fetch(`http://trifecta.by:5000/api/Packages/GetUserPackage?userId=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setCurrentPackage(data));


        fetch(`http://trifecta.by:5000/api/Home/GetReferralLink?userId=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setUserReferral(data));
    }, [navigate])

    useEffect(() => {
        if (!!userReferral) {
            sessionStorage.setItem('userReferral', userReferral);
        }
    }, [userReferral])

    const logOutHandler = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userReferral');
        sessionStorage.removeItem('userId');
        navigate('/');
    }

    const isAdmin = userInfo?.role === 'Admin';

    useEffect(() => {
        if (isAdmin) {
            navigate('/app/admin/verification');
        }
    }, [isAdmin])

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {!cookieConfirmed && <CookieApp setCookieConfirmed={setCookieConfirmed} />}
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_side-menu`}>
                        <img className={`${DEFAULT_CLASSNAME}_side-menu_logo`} src={trifecta} alt={'logo'} />
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_profile`}>
                            <img src={noPhoto} alt={"img"} />
                            {!isAdmin ? <div className={`${DEFAULT_CLASSNAME}_side-menu_profile_text`}>
                                <div>{userInfo?.firstName + " " + userInfo?.lastName}</div>
                                <div className={'level'}>{userInfo?.level}</div>
                            </div> : <div className={`${DEFAULT_CLASSNAME}_side-menu_profile_text`}>
                                <div>{"Панель Администратора"}</div>
                            </div>}
                        </div>
                        {!isAdmin && <>
                            {
                                currentPackage?.name ?
                                    <div
                                        className={`${DEFAULT_CLASSNAME}_side-menu_partner`}
                                        onClick={() => navigator.clipboard.writeText(userInfo?.personalReferral)}
                                    >{"Ссылка реферала"}
                                    </div> :
                                    <div
                                        className={`${DEFAULT_CLASSNAME}_side-menu_partner`}
                                        onClick={() => navigate('/app/marketing')}
                                    >
                                        {"Стать партнером"}
                                    </div>
                            }
                            </>
                        }
                        {
                            isAdmin ? <>
                                <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Меню"}</div>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/verification'}><img src={mc} alt={'icon'}/> {"Верификация"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/withdraw'}><img src={wd} alt={'icon'}/> {"Вывод средств"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/contact-info'}><img src={nch} alt={'icon'}/> {"Контактные данные"}</NavLink>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} onClick={() => logOutHandler()}><img src={exit} alt={'icon'}/> {"Выйти"}</div>
                                </div>
                            </> : <>
                                <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Меню"}</div>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/'}><img src={mc} alt={'icon'}/> {"Мой кабинет"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${!IS_VERIFIED && 'disabled'}`} to={'/app/withdraw'}><img src={wd} alt={'icon'}/> {"Вывод средств"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${!IS_VERIFIED && 'disabled'}`} to={'/app/charges'}><img src={nch} alt={'icon'}/> {"Мои начисления"}</NavLink>
                                </div>
                                <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Trifecta"}</div>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${!IS_VERIFIED && 'disabled'}`} to={'/app/structure'}><img src={st} alt={'icon'}/> {"Структура"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${!IS_VERIFIED && 'disabled'}`} to={'/app/progress'}><img src={pc} alt={'icon'}/> {"Прогресс"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${!IS_VERIFIED && 'disabled'}`} to={'/app/marketing'}><img src={mt} alt={'icon'}/> {currentPackage ? "Улучшить пакет" : "Маркетинг план"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${!IS_VERIFIED && 'disabled'}`} to={'/app/newbie'}><img src={lNew} alt={'icon'}/> {"Запуск новичка"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/info'}><img src={inf} alt={'icon'}/> {"Инфо"}</NavLink>
                                </div>
                                <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Управление"}</div>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/settings'}><img src={sett} alt={'icon'}/> {"Настройки"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/help'}><img src={help} alt={'icon'}/> {"Помощь"}</NavLink>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} onClick={() => logOutHandler()}><img src={exit} alt={'icon'}/> {"Выйти"}</div>
                                </div>
                            </>
                        }
                    </div>
                    <Routes>
                        <Route path={'/'} element={<Cabinet currentPackage={currentPackage} />} />
                        <Route path={!IS_VERIFIED ? '#' : '/marketing'} element={<Marketing currentPackage={currentPackage} />} />
                        <Route path={!IS_VERIFIED ? '#' : '/newbie'} element={<Newbie />} />
                        <Route path={!IS_VERIFIED ? '#' : '/withdraw'} element={<Withdraw />} />
                        <Route path={!IS_VERIFIED ? '#' : '/charges'} element={<Charges />} />
                        <Route path={!IS_VERIFIED ? '#' : '/structure'} element={<Structure />} />
                        <Route path={!IS_VERIFIED ? '#' : '/progress'} element={<Progress/>} />
                        <Route path={'/info'} element={<Info />} />
                        <Route path={'/settings'} element={<Settings userInfo={userInfo} />} />
                        <Route path={'/help'} element={<Help />} />
                        <Route path={'/cookie'} element={<Cookie />} />
                        <Route path={'/docs'} element={<Docs />} />

                        <Route path={'/admin/*'} element={<Admin />} />
                    </Routes>
                </div>
                <TrifectaFooter />
            </div>
        </div>
    )
}