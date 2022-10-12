import * as React from 'react';

import './help.scss';

import info from './info.png';
import help from './help.png';
import pointer from './pointer.png';

import tg from '../../../common/footer/telegram.png';
import {useState} from "react";

const DEFAULT_CLASSNAME = 'help';

export const Help = () => {
    const [itemOpened, setItemOpened] = useState(false);

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_header`}>
                    <img className={`${DEFAULT_CLASSNAME}_header_info`} src={info} alt={'info'} />
                    <div className={`${DEFAULT_CLASSNAME}_card`}>
                        <div className={`${DEFAULT_CLASSNAME}_card_title`}>{"Связаться с технической поддержкой"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_card_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_card_text_title`}>{"Телефоны"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_card_text_item`}>{"+375(25) 533-80-26"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_card_text_title`}>{"E-mail"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_card_text_item`}>{"trifectacompany@mail.ru"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_content_links_item`}>
                                <img src={tg} alt={"img"} />
                            </div>
                            <img className={`${DEFAULT_CLASSNAME}_back`} src={help} alt={'help'} />
                        </div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_faq`}>
                    <div className={`${DEFAULT_CLASSNAME}_faq_title`}><span>{"FAQ"}</span></div>
                    <div className={`${DEFAULT_CLASSNAME}_faq_item`} onClick={() => setItemOpened(!itemOpened)}>
                        <div className={`${DEFAULT_CLASSNAME}_faq_item_content`}>
                            <span>{"Я не могу купить пакет, что мне делать?"}</span>
                            <img className={itemOpened ? 'pointer-opened' : 'pointer-closed'} src={pointer} alt={'pointer'} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_faq_item_text ${itemOpened ? 'opened' : 'closed'}`}>{"Перед совершением каких либо действий в личном кабинете требуется полное заполнение профиля с верификацией аккаунта. Для заполнения аккаунта перейдите на страницу “Настройки”"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}