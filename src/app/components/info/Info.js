import * as React from 'react';

import './info.scss';

import doc from './file.png';
import {useEffect, useState} from "react";

const DEFAULT_CLASSNAME ='info'

export const Info = () => {

    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch('https://trifecta.by/api/Info/GetThumbnails?userId=31703f65-5a6d-400e-ab87-d0d93981f34f', {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setDocs(data));
    }, []);

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Инфо"}</div>
                <div className={`${DEFAULT_CLASSNAME}_docs`}>
                    <a className={`${DEFAULT_CLASSNAME}_docs_item`} target={"_blank"} href={"https://trifecta.by/trifecto_Documents/Marketing.pdf"}>
                        <img src={doc} alt={'doc'} />
                        <div className={`${DEFAULT_CLASSNAME}_docs_item_text`}>{"Маркетинг-план"}</div>
                    </a>
                    <a className={`${DEFAULT_CLASSNAME}_docs_item`} target={"_blank"} href={"https://trifecta.by/trifecto_Documents/Codex.pdf"}>
                        <img src={doc} alt={'doc'} />
                        <div className={`${DEFAULT_CLASSNAME}_docs_item_text`}>{"Кодекс партнёра"}</div>
                    </a>
                    <a className={`${DEFAULT_CLASSNAME}_docs_item`} target={"_blank"} href={"https://trifecta.by/trifecto_Documents/Pers.pdf"}>
                        <img src={doc} alt={'doc'} />
                        <div className={`${DEFAULT_CLASSNAME}_docs_item_text`}>{"Обработка персональных данных"}</div>
                    </a>
                    <a className={`${DEFAULT_CLASSNAME}_docs_item`} target={"_blank"} href={"https://trifecta.by/trifecto_Documents/Sogl.pdf"}>
                        <img src={doc} alt={'doc'} />
                        <div className={`${DEFAULT_CLASSNAME}_docs_item_text`}>{"Партнёрское соглашение"}</div>
                    </a>
                    <a className={`${DEFAULT_CLASSNAME}_docs_item`} target={"_blank"} href={"https://trifecta.by/trifecto_Documents/Conf.pdf"}>
                        <img src={doc} alt={'doc'} />
                        <div className={`${DEFAULT_CLASSNAME}_docs_item_text`}>{"Политика конфиденциальности"}</div>
                    </a>
                    <a className={`${DEFAULT_CLASSNAME}_docs_item`} target={"_blank"} href={"https://trifecta.by/trifecto_Documents/CryptoSogl.pdf"}>
                        <img src={doc} alt={'doc'} />
                        <div className={`${DEFAULT_CLASSNAME}_docs_item_text`}>{"Договор об оказании услуг"}</div>
                    </a>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_text`}>
                    <div className={`${DEFAULT_CLASSNAME}_text_title`}>{"Навигация в кабинете:"}</div>
                    <div>{"Мой кабинет - показывает Ваше бонусное вознаграждение, базовый и структурный уровни, позволяет увидеть планируемый и прогнозируемый обороты, увидеть покупки.\n"}</div>
                    <div>{"Мои начисления - показывает Ваши бонусные вознаграждения за рекомендации.\n"}</div>
                    <div>{"Вывод средств - в этом разделе Вы можете вывести Ваше вознаграждение и увидеть предыдущие выводы.\n"}</div>
                    <div>{"Раздел «Структура» предназначен для работы с показателями Вашей реферальной структуры. Здесь Вы можете увидеть выполненный Вами оборот за выбранный период и обороты любого участника Вашей команды.\n"}</div>
                    <div>{"Прогресс - на данной странице отображаются данные о вашем текщем прогрессе и что нужно сделать для того, чтобы достичь той или иной цели.\n"}</div>
                    <div>{"Настройки - здесь можно сменить свой пароль или инфомацию об аккаунте.\n"}</div>
                    <div>{"Помощь - заполните форму на этой странице и наша поддержка поможет вам в кратчайшие сроки"}</div>
                </div>
            </div>
        </div>
    )
}
