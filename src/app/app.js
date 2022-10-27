import * as React from 'react';

import './app.scss';
import {useEffect, useState} from "react";
import {TrifectaFooter} from "./components/footer/footer";

import trifecta from '../assets/trifecta.png';

import closeIcon from '../closeIcon/close_big.png';
import cookieIcon from './cookie.png';

import burger from './assets/burger.png';

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
    useEffect(() => {
        const USER_ID = sessionStorage.getItem('userId');
        const TOKEN = sessionStorage.getItem('accessToken');

        if (!USER_ID || !TOKEN) {
            navigate('/login');
        }
    }, []);

    const navigate = useNavigate();

    const [cookieConfirmed, setCookieConfirmed] = useState(false);

    const [userInfo, setUserInfo] = useState(null);
    const [userReferral, setUserReferral] = useState('');
    const [currentPackage, setCurrentPackage] = useState(null);

    const [IS_VERIFIED, setIsVerified] = useState(false);

    const [menuOpen, setMenuOpen] = useState(true);

    useEffect(() => {
        const USER_ID = sessionStorage.getItem('userId');
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch(`https://trifecta.by/api/UserProfile/GetProfileInfo?userId=${USER_ID}`, {
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

        fetch(`https://trifecta.by/api/Packages/GetUserPackage?userId=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setCurrentPackage(data));


        fetch(`https://trifecta.by/api/Home/GetReferralLink?userId=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setUserReferral(data));


        if (document.documentElement.clientWidth < 600) {
            setMenuOpen(false);
        }
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
            <img className={`${DEFAULT_CLASSNAME}_burger`} onClick={() => setMenuOpen(!menuOpen)} src={burger} alt={'burger-menu'} />
            {!cookieConfirmed && <CookieApp setCookieConfirmed={setCookieConfirmed} />}
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_side-menu ${!menuOpen && 'menu_closed'}`}>
                        <img className={`${DEFAULT_CLASSNAME}_side-menu_logo`} src={trifecta} alt={'logo'} />
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_profile`}>
                            <div style={{ backgroundImage: userInfo?.profilePhoto ? `url(https://trifecta.by${userInfo?.profilePhoto})` : `url(${noPhoto})`, width: !userInfo?.profilePhoto && "48px" }} className={`${DEFAULT_CLASSNAME}_side-menu_profile_image`}></div>
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
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/structure'}><img src={st} alt={'icon'}/> {"Структура"}</NavLink>
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
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/marketing'}><img src={mt} alt={'icon'}/> {currentPackage ? "Улучшить пакет" : "Стать партнером"}</NavLink>
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
                        <Route path={'/marketing'} element={<Marketing currentPackage={currentPackage} />} />
                        <Route path={!IS_VERIFIED ? '#' : '/newbie'} element={<Newbie isVerified={IS_VERIFIED} />} />
                        <Route path={!IS_VERIFIED ? '#' : '/withdraw'} element={<Withdraw isVerified={IS_VERIFIED} />} />
                        <Route path={!IS_VERIFIED ? '#' : '/charges'} element={<Charges isVerified={IS_VERIFIED} />} />
                        <Route path={!IS_VERIFIED ? '#' : '/structure'} element={<Structure isVerified={IS_VERIFIED} />} />
                        <Route path={!IS_VERIFIED ? '#' : '/progress'} element={<Progress isVerified={IS_VERIFIED} />} />
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