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
                    <div>{"ООО \"Онлайн прогресс\", УНП 193634118 , 220035, Республика Беларусь, г. Минск, ул. Тимирязева 72-48в"}</div>
                    <div className={`${DEFAULT_CLASSNAME}_content_mg`}>{"Зарегистрированы Минским горисполкомом 05.07.2022"}</div>
                    <div className={`${DEFAULT_CLASSNAME}_content_links`}>
                        <div className={`${DEFAULT_CLASSNAME}_content_links_item`}>
                            <a target={"_blank"} href={"https://www.instagram.com/trifecta_company/"}><img src={inst} alt={"img"} /></a>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_content_links_item`}>
                            <a target={"_blank"} href={"https://t.me/Trifectacompany"}><img src={tg} alt={"img"} /></a>
                        </div>
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