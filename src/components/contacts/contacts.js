import * as React from 'react';

import './contacts.scss';
import background from './assets/background.png';

import hash from './assets/hash.png';
import email from './assets/email.png';

import instagram from './assets/instagram.png';
import telegram from './assets/telegram.png';

import sally from './assets/sally.png';

const DEFAULT_CLASSNAME = 'contacts';

export const Contacts = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`} style={{ backgroundImage: `url(${background})`}}>
            <img src={sally} className={`${DEFAULT_CLASSNAME}_sally`} alt={'background-sally'} />
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_block`}>
                    <img alt='smart-technology' src={hash} className={`${DEFAULT_CLASSNAME}_hash-image`}/>
                    <img alt='fast-earning' src={email} className={`${DEFAULT_CLASSNAME}_email-image`}/>

                    <div className={`${DEFAULT_CLASSNAME}_block-title`}>{"Контакты"}</div>

                    <div className={`${DEFAULT_CLASSNAME}_block-phones`}>{"Телефоны:"}</div>
                    <span>{"+375 (29) 519-09-88"}</span>

                    <div className={`${DEFAULT_CLASSNAME}_block-email`}>
                        <div>{'E-mail:'}</div>
                        <div>{"trifectacompany@mail.ru"}</div>
                    </div>
                </div>

                <div className={`${DEFAULT_CLASSNAME}_block block-right`}>
                    <div className={`${DEFAULT_CLASSNAME}_block-title-center`}>{"Где нас найти?"}</div>

                    <div className={`${DEFAULT_CLASSNAME}_block-text`}>{"Республика Беларусь, г. Минск, 220069, пр. Держинского, д. 3Б-115"}</div>

                    <div className={`${DEFAULT_CLASSNAME}_block-links`}>
                        <img src={instagram} alt={'contacts-link'}/>
                        <img src={telegram} alt={'contacts-link'}/>
                    </div>

                    <a href={"https://www.google.com/maps/place/vulica+Kaliektarnaja+3,+Minsk,+Minskaja+voblas%C4%87/"} target={"_blank"} className={`${DEFAULT_CLASSNAME}_block-btn`}>{"Показать на карте"}</a>
                </div>
            </div>
        </div>
    )
}
