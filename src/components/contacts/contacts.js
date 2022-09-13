import * as React from 'react';

import './contacts.scss';
import map from './assets/map.png'

import hash from './assets/hash.png';
import email from './assets/email.png';

import instagram from './assets/instagram.png';
import telegram from './assets/telegram.png';
import twitter from './assets/twitter.png';

import sally from './assets/sally.png';

import trif from './assets/trif.png';
import vect from './assets/vector.png';

const DEFAULT_CLASSNAME = 'contacts';

export const Contacts = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <img src={sally} className={`${DEFAULT_CLASSNAME}_sally`} alt={'background-sally'} />
            <img src={map} className={`${DEFAULT_CLASSNAME}_background`} alt={'background-map'} />

            <img src={trif} className={`${DEFAULT_CLASSNAME}_trif`} />
            <img src={vect} className={`${DEFAULT_CLASSNAME}_vect`} />
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_block`}>
                    <img src={hash} className={`${DEFAULT_CLASSNAME}_hash-image`}/>
                    <img src={email} className={`${DEFAULT_CLASSNAME}_email-image`}/>

                    <div className={`${DEFAULT_CLASSNAME}_block-title`}>{"Контакты"}</div>

                    <div className={`${DEFAULT_CLASSNAME}_block-phones`}>{"Телефоны:"}</div>
                    <span>{"+375 (44) 999-99-99"}</span>
                    <span>{"+375 (44) 999-99-99"}</span>

                    <div className={`${DEFAULT_CLASSNAME}_block-email`}>
                        <div>{'E-mail:'}</div>
                        <div>{"trifecto@gmail.com"}</div>
                    </div>
                </div>

                <div className={`${DEFAULT_CLASSNAME}_block block-right`}>
                    <div className={`${DEFAULT_CLASSNAME}_block-title-center`}>{"Где нас найти?"}</div>

                    <div className={`${DEFAULT_CLASSNAME}_block-text`}>{"Республика Беларусь, г. Минск, ул. Тимирязева 72к2, 11 этаж, офис 907"}</div>

                    <div className={`${DEFAULT_CLASSNAME}_block-links`}>
                        <img src={instagram} alt={'contacts-link'}/>
                        <img src={telegram} alt={'contacts-link'}/>
                        <img src={twitter} alt={'contacts-link'}/>
                    </div>

                    <div className={`${DEFAULT_CLASSNAME}_block-btn`}>{"Показать на карте"}</div>
                </div>
            </div>
        </div>
    )
}