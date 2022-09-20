import * as React from 'react';

import './info.scss';

import doc from './file.png';

const DEFAULT_CLASSNAME ='info'

export const Info = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Инфо"}</div>
                <div className={`${DEFAULT_CLASSNAME}_docs`}>
                    <div className={`${DEFAULT_CLASSNAME}_docs_item`}>
                        <img src={doc} alt={'doc'} />
                        <div className={`${DEFAULT_CLASSNAME}_docs_item_text`}>{"Информационная программа пакетов"}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_docs_item`}>
                        <img src={doc} alt={'doc'} />
                        <div className={`${DEFAULT_CLASSNAME}_docs_item_text`}>{"Кодекс партнёра"}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_docs_item`}>
                        <img src={doc} alt={'doc'} />
                        <div className={`${DEFAULT_CLASSNAME}_docs_item_text`}>{"Партнерское соглашение"}</div>
                    </div>
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