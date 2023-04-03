import * as React from 'react';

import './docs.scss';
import sally from "../../../components/contacts/docs/assets/sally.png";
import file from "../../../components/contacts/docs/assets/file.png";

const DEFAULT_CLASSNAME = 'app-docs';

export const Docs = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <img className={`${DEFAULT_CLASSNAME}_sally`} src={sally} alt={'docs-back'} />
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Юридические документы"}</div>
                <div className={`${DEFAULT_CLASSNAME}_items`}>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <img src={file} alt={'docs-item'} />
                        <div className={`${DEFAULT_CLASSNAME}_item-text`}>{"Партнёрское соглашение"}</div>
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
                        {"Название компании: ООО \"Онлайн прогресс\" УНП 193634118"} <br /> <br />
                        {"Адрес: 220035, Республика Беларусь, г. Минск,"} <br /> <br />
                        {"ул. Тимирязева 72, пом.48в"} <br /> <br />
                        {"Свидетельство о государственной регистрации № 193634118 от 05.07.2022 выдано Минским горисполкомом"} <br /> <br />
                        {"ел. +375 (44) 533-80-26"} <br /> <br />
                        {"e-mail: trifectacompany@mail.ru"}</div>
                </div>
            </div>
        </div>
    )
}