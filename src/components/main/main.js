import * as React from 'react';

import "swiper/css";
import "swiper/css/scrollbar";

import './main.scss';
import arrow from '../../assets/arrow.png';
import arrows from '../../assets/arrows.png';

import cardBag from '../../assets/cards/bag.png';
import group from '../../assets/cards/group.png';
import money from '../../assets/cards/money.png';

import diamond from '../../assets/diamond.png';

import { Goal } from "../../common/goal/goal";
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'main';

export const Main = () => {
    const navigate = useNavigate();

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_title`}>
                            <span className={'first-grad'}>{'Добро'}
                                <br /> {'пожаловать'}
                            </span>
                            <br />
                            <span className={'second-grad'}>
                                {'в сообщество'}
                            </span>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_text`}>
                            {'Развивайся и зарабатывай'}
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_btn`} onClick={() => navigate('/login')}>{'присоединиться'}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_right`}>
                        <img src={diamond} alt={'diamond'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_works`}>
                    <div className={`${DEFAULT_CLASSNAME}_works_title`}>{'Как это работает?'}</div>
                    <div className={`${DEFAULT_CLASSNAME}_works_cards`}>
                        <div className={'how-it-work-card'}>
                            <img src={cardBag} alt={'work-card'} />
                            <div className={'how-it-work-card-title'}>{'Используй'}</div>
                            <div className={'how-it-work-card-text'}>{'Получай уникальные знания и возможности'}</div>
                        </div>
                        <img className={'how-it-work-card-line'} src={arrow} />
                        <div className={'how-it-work-card'}>
                            <img src={group} alt={'work-card'} />
                            <div className={'how-it-work-card-title'}>{'Масштабируй'}</div>
                            <div className={'how-it-work-card-text'}>{'Рекомендуй другим и строй свое комьюнити'}</div>
                        </div>
                        <img className={'how-it-work-card-line'} src={arrow} />
                        <div className={'how-it-work-card'}>
                            <img src={money} alt={'work-card'} />
                            <div className={'how-it-work-card-title'}>{'Будь счаслив!'}</div>
                            <div className={'how-it-work-card-text'}>{'Получи от жизни всё с Trifecto Company!'}</div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_works_more`} onClick={() => navigate('/about')}>
                        <div>{'Подробнее'}</div>
                        <img src={arrows} />
                    </div>
                </div>
            </div>
            <Goal />
        </div>
    )
}