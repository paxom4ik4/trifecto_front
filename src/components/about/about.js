import * as React from 'react';

import './about.scss';

import logo from './assets/logo.png';
import logoText from './assets/logo-text.png';
import background from './assets/background.png';
import pros from './assets/pros.png';
import plus from './assets/tick.png';
import {Goal} from "../../common/goal/goal";

const DEFAULT_CLASSNAME = 'about';

const prosItems = ['Начнёшь развиваться в трендовом и прибыльном бизнесе', 'Поднимешь свою личную эффективность', 'Окружишь себя амбициозными и целеустремлёнными людьми', 'Изменишь свою жизнь к лучшему'];

export const About = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <img className={`${DEFAULT_CLASSNAME}_background`} src={background} alt={'about-background'} />
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_logo`}>
                    <img src={logo} alt={'about-logo'}/>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_logo-text`}>
                    <img src={logoText} alt={'about-logo-text'} />
                </div>
                <div className={`${DEFAULT_CLASSNAME}_why`}>{"C нами ты"}</div>
                <div className={`${DEFAULT_CLASSNAME}_pros`}>
                    <div className={`${DEFAULT_CLASSNAME}_pros_items`}>
                        {prosItems.map(item => <div className={`${DEFAULT_CLASSNAME}_pros-item`}><img src={plus} /> {item}</div>)}
                    </div>
                    <img className={`${DEFAULT_CLASSNAME}_pros-image`} src={pros} alt={'pros'} />
                </div>
            </div>
            <Goal />
        </div>
    )
}