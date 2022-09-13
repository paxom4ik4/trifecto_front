import * as React from 'react';

import './about.scss';

import logo from './assets/logo.png';
import logoText from './assets/logo-text.png';
import background from './assets/background.png';
import alfaTest from './assets/alfa-test.png';
import pros from './assets/pros.png';
import plus from './assets/plus.png';
import {Goal} from "../../common/goal/goal";

const DEFAULT_CLASSNAME = 'about';

const prosItems = ['Мы мотивированная, стремящаяся покорять вершины команда професионалов', 'За нашими плечами годы работы в сфере', 'Мы хотим реализовать все наши идеи и не остановимся ни перед чем', 'Всегда добиваемя поставленых целей'];

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
                <div className={`${DEFAULT_CLASSNAME}_partners`}>{"Наши Партнеры"}</div>
                <img src={alfaTest} alt={'alfa-test'} className={`${DEFAULT_CLASSNAME}_alfa`} />

                <div className={`${DEFAULT_CLASSNAME}_why`}>{"Почему Мы?"}</div>
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