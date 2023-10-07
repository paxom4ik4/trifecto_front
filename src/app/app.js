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
import {toast} from "react-toastify";

const DEFAULT_CLASSNAME = 'trifecta-app';

const CookieApp = ({ isAdmin, setCookieConfirmed }) => {
    return (
        !isAdmin && <div className={'cookie-app'}>
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
    const [currentCryptoPackage, setCurrentCryptoPackage] = useState(null);

    const [IS_VERIFIED, setIsVerified] = useState(false);

    const [menuOpen, setMenuOpen] = useState(true);

    const [adminVerifications, setAdminVerifications] = useState([]);
    const [adminWithdraws, setAdminWithdraws] = useState([]);
    const [adminContactInfos, setAdminContactInfos] = useState([]);
    const [adminPackages, setAdminPackages] = useState([]);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem("accessToken");

        fetch(`https://trifecta.by/api/Administrator/GetDocumentVerificationList`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setAdminVerifications(data));
    }, [])

    useEffect(() => {
        const TOKEN = sessionStorage.getItem("accessToken");

        fetch(`https://trifecta.by/api/Administrator/GetWithdrawRequestList`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setAdminWithdraws(data));
    }, [])

    useEffect(() => {
        const TOKEN = sessionStorage.getItem("accessToken");

        fetch(`https://trifecta.by/api/Administrator/GetUserContactsVerivicationList`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setAdminContactInfos(data));
    }, [])

    useEffect(() => {
        const TOKEN = sessionStorage.getItem("accessToken");

        fetch(`https://trifecta.by/api/Administrator/GetCashRequests`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setAdminPackages(data));
    }, [])

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
            .then(data => {
                if ( data.id ) {
                    setCookieConfirmed(true);
                }
                setCurrentPackage(data)
            });

        fetch(`https://trifecta.by/api/Packages/GetUserCryptoPackage?userId=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if ( data.id ) {
                    setCookieConfirmed(true);
                    setCurrentCryptoPackage(data)
                }
            });


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

    const hasUserCryptoPackage = () => {
        if (!!currentCryptoPackage) return currentCryptoPackage?.name === "Crypto";

        return currentPackage?.name === "Crypto";
    }

    const hasUserPackage = !!userInfo?.packageName;
    const isCryptoUser = hasUserCryptoPackage();

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <img className={`${DEFAULT_CLASSNAME}_burger`} onClick={() => setMenuOpen(!menuOpen)} src={burger} alt={'burger-menu'} />
            {!cookieConfirmed && <CookieApp isAdmin={isAdmin} setCookieConfirmed={setCookieConfirmed} />}
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_side-menu ${!menuOpen && 'menu_closed'}`}>
                        <img className={`${DEFAULT_CLASSNAME}_side-menu_logo`} src={trifecta} alt={'logo'} />
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_profile`}>
                            <div style={{ backgroundImage: userInfo?.profilePhoto ? `url(https://trifecta.by${userInfo?.profilePhoto})` : `url(${noPhoto})`}} className={`${DEFAULT_CLASSNAME}_side-menu_profile_image`}></div>
                            {!isAdmin ? <div className={`${DEFAULT_CLASSNAME}_side-menu_profile_text`}>
                                <div>{userInfo?.firstName + " " + userInfo?.lastName}</div>
                                <div className={'level'}>{userInfo?.level}</div>
                            </div> : <div className={`${DEFAULT_CLASSNAME}_side-menu_profile_text`}>
                                <div>{"Панель Администратора"}</div>
                            </div>}
                        </div>
                        {!isAdmin && <>
                            {currentPackage?.name && <div
                              className={`${DEFAULT_CLASSNAME}_side-menu_partner`}
                              onClick={() => navigate('/app/marketing')}
                            >
                                {"Улучшить пакет"}
                            </div>}
                            {
                                currentPackage?.name ?
                                    <div
                                        className={`${DEFAULT_CLASSNAME}_side-menu_partner`}
                                        onClick={() => {
                                            navigator.clipboard.writeText(userInfo?.personalReferral);
                                            toast.info("Ссылка скопирована");
                                        }}
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
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}>
                                        <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/verification'}><img src={mc} alt={'icon'}/> {"Верификация"}</NavLink>
                                        <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item_badge`}>{adminVerifications?.length}</div>
                                    </div>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}>
                                        <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/withdraw'}><img src={wd} alt={'icon'}/> {"Вывод средств"}</NavLink>
                                        <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item_badge`}>{adminWithdraws?.length}</div>
                                    </div>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}>
                                        <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/withdraw-history'}><img src={wd} alt={'icon'}/> {"История вывода"}</NavLink>
                                    </div>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}>
                                        <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/contact-info'}><img src={mc} alt={'icon'}/> {"Контактные данные"}</NavLink>
                                        <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item_badge`}>{adminContactInfos?.length}</div>
                                    </div>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/structure'}><img src={st} alt={'icon'}/> {"Структура"}</NavLink>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}>
                                        <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/packages'}><img src={mt} alt={'icon'}/> {"Подтверждение пакетов"}</NavLink>
                                        <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item_badge`}>{adminPackages?.length}</div>
                                    </div>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}>
                                        <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/charges'}><img src={nch} alt={'icon'}/> {"Начисления"}</NavLink>
                                    </div>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}>
                                        <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/admin/additional-charges'}><img src={nch} alt={'icon'}/> {"Доначисления"}</NavLink>
                                    </div>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} onClick={() => logOutHandler()}><img src={exit} alt={'icon'}/> {"Выйти"}</div>
                                </div>
                            </> : <>
                                <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Меню"}</div>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/'}><img src={mc} alt={'icon'}/> {"Мой кабинет"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${(!hasUserPackage || currentPackage?.name === "Crypto") && 'disabled'}`} to={'/app/withdraw'}><img src={wd} alt={'icon'}/> {"Вывод средств"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${(!hasUserPackage || currentPackage?.name === "Crypto") && 'disabled'}`} to={'/app/charges'}><img src={nch} alt={'icon'}/> {"Мои начисления"}</NavLink>
                                </div>
                                <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                                    <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Trifecta"}</div>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${(!hasUserPackage || currentPackage?.name === "Crypto") && 'disabled'}`} to={'/app/structure'}><img src={st} alt={'icon'}/> {"Структура"}</NavLink>
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${(!hasUserPackage || currentPackage?.name === "Crypto") && 'disabled'}`} to={'/app/progress'}><img src={pc} alt={'icon'}/> {"Прогресс"}</NavLink>
                                    {!currentPackage && <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} to={'/app/marketing'}><img src={mt} alt={'icon'}/> {currentPackage ? "Улучшить пакет" : "Стать партнером"}</NavLink>}
                                    <NavLink className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item ${!hasUserPackage && 'disabled'}`} to={'/app/newbie'}><img src={lNew} alt={'icon'}/> {"Обучающий материал"}</NavLink>
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
                        <Route path={'/'} element={<Cabinet currentPackage={currentPackage} isCryptoUser={isCryptoUser} />} />
                        <Route path={'/marketing'} element={<Marketing currentPackage={currentPackage} hasCryptoPackage={isCryptoUser} />} />
                        <Route path={!hasUserPackage ? '#' : '/newbie'} element={<Newbie isCryptoUser={isCryptoUser} isVerified={hasUserPackage} />} />
                        <Route path={(!hasUserPackage || currentPackage?.name === "Crypto") ? '/app/' : '/withdraw'} element={<Withdraw isVerified={hasUserPackage} />} />
                        <Route path={(!hasUserPackage || currentPackage?.name === "Crypto") ? '/app/' : '/charges'} element={<Charges isVerified={IS_VERIFIED} />} />
                        <Route path={(!hasUserPackage || currentPackage?.name === "Crypto") ? '/app/' : '/structure'} element={<Structure isCryptoUser={isCryptoUser} isVerified={hasUserPackage} />} />
                        <Route path={(!hasUserPackage || currentPackage?.name === "Crypto") ? '/app/' : '/progress'} element={<Progress isVerified={hasUserPackage} />} />
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
