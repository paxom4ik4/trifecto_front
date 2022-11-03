import * as React from 'react';

import './goal.scss';

import trophy from './assets/trophy.png';
import target from './assets/target.png';

import sally from './assets/saly.png';

const DEFAULT_CLASSNAME = 'goal';

export const Goal = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`} style={{ backgroundImage: `url(${sally})` }}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img src={trophy} alt={'item-image'} />
                    <div className={`${DEFAULT_CLASSNAME}_item-title`}>{'Наша Цель'}</div>
                    <div className={`${DEFAULT_CLASSNAME}_item-text`}>{'Создать крупнейшую партнерскую сеть, где каждый с помощью полученных знаний может стать успешным'}</div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <div className={`${DEFAULT_CLASSNAME}_item-title`}>{'Наша Миссия'}</div>
                    <div className={`${DEFAULT_CLASSNAME}_item-text`}>{'Стать лучшими, чтобы с помощью инструментов компании раскрыть потенциал, цели каждого и реализовать их'}</div>
                    <img src={target} alt={'item-image'} />
                </div>
            </div>
        </div>
    )
}