import * as React from 'react';

import './footer.scss';

import partners from './assets/partners.png';
import logo from '../../../assets/logo.png';

import inst from '../../../common/footer/inst.png';
import tg from '../../../common/footer/telegram.png';
import twitter from '../../../common/footer/twitter.png';
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'trifecta-app-footer';

export const TrifectaFooter = () => {
    const navigate = useNavigate();

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <span className={`${DEFAULT_CLASSNAME}_copyright`}>{"Ⓒ Trifecta company, 2022"}</span>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <img className={`${DEFAULT_CLASSNAME}_logo`} src={logo} alt={'footer-logo'} />
                    <div>{"ООО \"Мебель плюс\", УНП 191123456, 220019, Республика Беларусь, г. Минск, ул. Тимирязева 72к2, 11 этаж, офис 907"}</div>
                    <div className={`${DEFAULT_CLASSNAME}_content_mg`}>{"Зарегистрированы Минским горисполкомом 21.07.2014"}</div>
                    <div className={`${DEFAULT_CLASSNAME}_content_links`}>
                        <div className={`${DEFAULT_CLASSNAME}_content_links_item`}>
                            <img src={inst} alt={"img"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_content_links_item`}>
                            <img src={tg} alt={"img"} />
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