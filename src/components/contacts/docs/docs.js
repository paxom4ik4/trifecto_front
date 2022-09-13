import * as React from 'react';

import './docs.scss';

import file from './assets/file.png';

import sally from './assets/sally.png';

const DEFAULT_CLASSNAME = 'docs';

export const Docs = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <img className={`${DEFAULT_CLASSNAME}_sally`} src={sally} alt={'docs-back'} />
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Юридические документы"}</div>
                <div className={`${DEFAULT_CLASSNAME}_items`}>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <img src={file} alt={'docs-item'} />
                        <div className={`${DEFAULT_CLASSNAME}_item-text`}>{"Пользовательское соглашение"}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <img src={file} alt={'docs-item'} />
                        <div className={`${DEFAULT_CLASSNAME}_item-text`}>{"Политика обработки персональных данных"}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <img src={file} alt={'docs-item'} />
                        <div className={`${DEFAULT_CLASSNAME}_item-text`}>{"Политика конфиденциальности"}</div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_text`}>
                    <div className={`${DEFAULT_CLASSNAME}_text-title`}>{"Юр. инфо."}</div>
                    <div className={`${DEFAULT_CLASSNAME}_text-content`}>
                        {"Название компании: ООО \"Мебель плюс\" УНП 191123456"} <br /> <br />
                        {"Адрес: 220019, Республика Беларусь, г. Минск,"} <br /> <br />
                        {"ул. Тимирязева 72к2, 11 этаж, офис 907"} <br /> <br />
                        {"Свидетельство о государственной регистрации № 191123456 от 21.07.2014 выдано Минским горисполкомом"} <br /> <br />
                        {"Интернет-магазин зарегистрирован в Торговом реестре РБ 09.08.2016  Режим работы 10:00 – 20:00 Телефон: 375 (29) 111-22-33"} <br /> <br />
                        {"e-mail: сайт@домен.by"}</div>
                </div>
            </div>
        </div>
    )
}