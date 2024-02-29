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
                        <a href={"https://trifecta.by/trifecto_Documents/Sogl.pdf"} target={"_blank"}>
                            <img src={file} alt={'docs-item'} />
                            <div className={`${DEFAULT_CLASSNAME}_item-text`}>{"Партнёрское соглашение"}</div>
                        </a>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <a href={"https://trifecta.by/trifecto_Documents/Pers.pdf"} target={"_blank"}>
                            <img src={file} alt={'docs-item'} />
                            <div className={`${DEFAULT_CLASSNAME}_item-text`}>{"Политика обработки персональных данных"}</div>
                        </a>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <a href={"https://trifecta.by/trifecto_Documents/Conf.pdf"} target={"_blank"}>
                            <img src={file} alt={'docs-item'} />
                            <div className={`${DEFAULT_CLASSNAME}_item-text`}>{"Политика конфиденциальности"}</div>
                        </a>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_text`}>
                    <div className={`${DEFAULT_CLASSNAME}_text-title`}>{"Юр. инфо."}</div>
                    <div className={`${DEFAULT_CLASSNAME}_text-content`}>
                        {"Название компании: ООО \"Онлайн прогресс\" УНП 193634118"} <br /> <br />
                        {"220004, Республика Беларусь, г. Минск, ул. Коллекторная 3, каб.509"} <br /> <br />
                        {"Свидетельство о государственной регистрации № 193634118 от 05.07.2022 выдано Минским горисполкомом"} <br /> <br />
                        {"Тел. +375 (44) 533-80-26"} <br /> <br />
                        {"e-mail: trifectacompany@mail.ru"}</div>
                </div>
            </div>
        </div>
    )
}
