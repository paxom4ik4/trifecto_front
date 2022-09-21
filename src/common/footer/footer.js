import * as React from 'react';

import './footer.scss';
import {useEffect, useState} from "react";

import logo from '../../assets/logo.png'

import tg from './tg.svg';

import telegram from './telegram.png';
import instagram from './inst.png';
import twitter from './twitter.png';

import { Link, useNavigate } from 'react-router-dom';

const DEFAULT_CLASSNAME = 'footer';

export const Footer = () => {
    const navigate = useNavigate();

    useEffect(() => {}, [navigate])

    const pathExclude = ['/login', '/app'];
    const showHeader = pathExclude.filter(elem => !!(window.location.pathname.startsWith(elem)));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (!showHeader.length &&
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_header`}>
                    <div className={`${DEFAULT_CLASSNAME}_header-text`}>{'Будем рады любым предложениям о сотрудничестве'}</div>
                    <input value={name} onChange={(e) => setName(e.currentTarget.value)} type={'text'} placeholder={'Имя*'} />
                    <input value={email} onChange={(e) => setEmail(e.currentTarget.value)} type={'text'} placeholder={'E-mail*'} />
                    <div className={`${DEFAULT_CLASSNAME}_header-btn`}>
                        <img src={tg} alt={'telegram'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_line`} />

                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_content_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_content_left-logo`}>
                            <img src={logo} alt={'logo'} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_content_left-text`}>{"Специалисты в области партнёрского маркетинга"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_content_left-links`}>
                            <div className={`${DEFAULT_CLASSNAME}_link`}>
                                <img src={instagram} alt={'footer-link'}/>
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_link`}>
                                <img src={telegram} alt={'footer-link'}/>
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_link`}>
                                <img src={twitter} alt={'footer-link'}/>
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_content_navigation`}>
                        <div className={`${DEFAULT_CLASSNAME}_content_navigation-header`}>{"Навигация"}</div>
                        <Link to={'/'} className={`${DEFAULT_CLASSNAME}_content_navigation-item`}>{"Главная"}</Link>
                        <Link to={'/about'} className={`${DEFAULT_CLASSNAME}_content_navigation-item`}>{"О компании"}</Link>
                        <Link to={'/products'} className={`${DEFAULT_CLASSNAME}_content_navigation-item`}>{"Продукты"}</Link>
                        <Link to={'/contacts'} className={`${DEFAULT_CLASSNAME}_content_navigation-item`}>{"Контакты"}</Link>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_content_navigation`}>
                        <div className={`${DEFAULT_CLASSNAME}_content_navigation-header`}>{"Контакты"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_content_navigation-item`}>{"Телефоны"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_content_navigation-item`}><span>{"+375(25) 533-80-26"}</span><span>{"+375(29) 519-09-88"}</span></div>
                        <div className={`${DEFAULT_CLASSNAME}_content_navigation-item`}>{"E-mail"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_content_navigation-item`}>{"trifectacompany@mail.ru"}</div>
                    </div>
                </div>

                <div className={`${DEFAULT_CLASSNAME}_info`}>
                    <div>{'Ⓒ 2022 ООО “Онлайн прогресс”. Все права защищены. Перепечатка и любое использование материалов возможно только при наличии ссылки на первоисточник. '}</div>
                    <div>
                        <Link to={"/billing"}><span>{'Оплата'}</span></Link>
                        <Link to={"/docs"}><span>{'Юридичекие документы'}</span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}