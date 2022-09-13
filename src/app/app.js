import * as React from 'react';

import './app.scss';
import {useEffect, useState} from "react";
import {TrifectaFooter} from "./components/footer/footer";

import bag from '../assets/packeges/bag.png';
import fire from '../assets/packeges/fire.png';
import crown from '../assets/packeges/crown.png';

import trifecta from '../assets/trifecta.png';
import profile from '../assets/profile.png';

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
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'trifecta-app';

export const TrifectaApp = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        fetch('https://trifecta-web-api.herokuapp.com/api/UserProfile/GetProfileInfo?userId=31703f65-5a6d-400e-ab87-d0d93981f34f', {
            headers: {
                'Accept': '*/*',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMxNzAzZjY1LTVhNmQtNDAwZS1hYjg3LWQwZDkzOTgxZjM0ZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBRE1JTiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiJBRE1JTiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluIiwiZXhwIjoxNjYzMjY5ODI0LCJpc3MiOiJBcHBBdXRoU2VydmVyIiwiYXVkIjoiQXBwQXV0aENsaWVudCJ9.GnuMMeJIy1sLyUJn4WVYU4ZR24zyLY6DrXk249yfLi8'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }, [])

    const navigate = useNavigate();

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_side-menu`}>
                        <img className={`${DEFAULT_CLASSNAME}_side-menu_logo`} src={trifecta} alt={'logo'} />
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_profile`}>
                            <img src={profile} />
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_profile_text`}>
                                <div>{"Илларион Василевский"}</div>
                                <div className={'level'}>{"6 уровень"}</div>
                            </div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Меню"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item active`}><img src={mc} alt={'icon'}/> {"Мой кабинет"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}><img src={wd} alt={'icon'}/> {"Вывод средств"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}><img src={nch} alt={'icon'}/> {"Мои начисления"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Trifecta"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}><img src={st} alt={'icon'}/> {"Структура"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}><img src={pc} alt={'icon'}/> {"Прогресс"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}><img src={mt} alt={'icon'}/> {"Маркетинг план"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}><img src={lNew} alt={'icon'}/> {"Запуск новичка"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}><img src={inf} alt={'icon'}/> {"Инфо"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_side-menu_item`}>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-title`}>{"Управление"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}><img src={sett} alt={'icon'}/> {"Настройки"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`}><img src={help} alt={'icon'}/> {"Помощь"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_side-menu_item-sub-item`} onClick={() => navigate('/')}><img src={exit} alt={'icon'}/> {"Выйти"}</div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_content_cabinet`}>
                        <div className={`${DEFAULT_CLASSNAME}_content_cabinet_withdraw`}>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                                <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Доступно к выводу"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{"4578.91$"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{"11905.17 BYN"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_withdraw_card_withdraw`}>{"Вывести"}</div>
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                                <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Ожидает начисления"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{"138.40$"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{"359.84 BYN"}</div>
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                                <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Доход за всё время"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{"4578.91$"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{"11905.17 BYN"}</div>
                            </div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_content_cabinet_level`}>
                            <div className={`${DEFAULT_CLASSNAME}_level-item`}>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_overall`}>
                                    <div className={`${DEFAULT_CLASSNAME}_level-item_overall-container`}>
                                        <div className={`${DEFAULT_CLASSNAME}_level-item_overall_title`}>{"6 уровень"}</div>
                                        <div>{"Групповой оборот"}</div>
                                        <div>{"237.870$"}</div>
                                    </div>
                                </div>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_next`}>
                                    <div className={`${DEFAULT_CLASSNAME}_level-item_next_title`}>{"Требуется для достижения следующего уровня"}</div>
                                    <div>{"Групповой оборот: 300.000$"}</div>
                                    <div>{"3 партнера 5 уровня"}</div>
                                </div>
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_level-item`}>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_overall`}>
                                    <div className={`${DEFAULT_CLASSNAME}_level-item_overall-container`}>
                                        <div className={`${DEFAULT_CLASSNAME}_level-item_overall_title`}>{"5 уровень"}</div>
                                        <div>{"Месячный оборот"}</div>
                                        <div>{"39.540$"}</div>
                                    </div>
                                </div>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_next`}>
                                    <div className={`${DEFAULT_CLASSNAME}_level-item_next_title`}>{"Получаемый в этом месяце процент выплаты"}</div>
                                    <div className={`${DEFAULT_CLASSNAME}_level-item_next_percent`}>{"19%"}</div>
                                </div>
                            </div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_content_cabinet_packages`}>
                            <div className={`${DEFAULT_CLASSNAME}_package`}>
                                <img src={bag} />
                                <div>{"Стартовый"}</div>
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_package`}>
                                <img src={fire} />
                                <div>{"Классик"}</div>
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_package`}>
                                <img src={crown} />
                                <div>{"Премиум"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <TrifectaFooter />
            </div>
        </div>
    )
}