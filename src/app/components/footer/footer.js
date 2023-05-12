import * as React from 'react';

import './footer.scss';

import partners from './assets/partners.png';
import logo from '../../../assets/logo.png';

import inst from '../../../common/footer/inst.png';
import tg from '../../../common/footer/telegram.png';
import { useNavigate } from "react-router-dom";
import instagram from "../../../common/footer/inst.png";

const DEFAULT_CLASSNAME = 'trifecta-app-footer';

export const TrifectaFooter = () => {
    const navigate = useNavigate();

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <span className={`${DEFAULT_CLASSNAME}_copyright`}>{"Ⓒ Trifecta company, 2022"}</span>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <img className={`${DEFAULT_CLASSNAME}_logo`} src={logo} alt={'footer-logo'} />
                    <div>{"ООО \"Онлайн прогресс\", УНП 193634118 , 220004, Республика Беларусь, г. Минск, ул. Коллекторная 3а-10, каб.19"}</div>
                    <div className={`${DEFAULT_CLASSNAME}_content_mg`}>{"Зарегистрированы Минским горисполкомом 05.07.2022"}</div>
                    <div className={`${DEFAULT_CLASSNAME}_content_links`}>
                        <a target={"_blank"} href={"https://www.instagram.com/trifecta_company/"}><div className={`${DEFAULT_CLASSNAME}_content_links_item`}>
                            <img src={inst} alt={"img"} />
                        </div></a>
                        <a target={"_blank"} href={"https://t.me/Trifectacompany"}><div className={`${DEFAULT_CLASSNAME}_content_links_item`}>
                            <img src={tg} alt={"img"} />
                        </div></a>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_content_text`}>
                        <span onClick={() => navigate('/app/cookie')}>{"Cookie-файлы"}</span>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_partners`}>
                    <img src={partners} alt={'partners'} />
                </div>
            </div>
        </div>
    )
}