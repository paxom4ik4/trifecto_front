import * as React from 'react';

import "swiper/css";
import "swiper/css/scrollbar";

import './main.scss';
import diamond from '../../assets/diamond.png';
// import { Swiper, SwiperSlide } from "swiper/react";
// import {PackageCard} from "../../common/package-card/packageCard";
//
// import crown from '../../assets/packeges/crown.png';
// import bag from '../../assets/packeges/bag.png'
// import lite from '../../assets/packeges/fire.png';

import cardBag from '../../assets/cards/bag.png';
import group from '../../assets/cards/group.png';
import money from '../../assets/cards/money.png';

// import events from '../../assets/packeges/events.png';
// import travel from '../../assets/packeges/travel.png';

import { Goal } from "../../common/goal/goal";

// import { Scrollbar } from "swiper";

const DEFAULT_CLASSNAME = 'main';

export const Main = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_title`}>{'Красивые'} <br /> {'пару слов'} <br /> {'о компании'}</div>
                        <div className={`${DEFAULT_CLASSNAME}_text`}>
                            {'Длинный, но понятный SEO-слоган для лучшего продвижения сайта который я пока не придумал'}
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_btn`}>{'присоединиться'}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_right`}>
                        <img src={diamond} alt={'diamond'} />
                    </div>
                </div>
                {/*<div className={`${DEFAULT_CLASSNAME}_packages`}>*/}
                {/*    <Swiper*/}
                {/*        scrollbar={{*/}
                {/*            hide: true,*/}
                {/*        }}*/}
                {/*        modules={[Scrollbar]}*/}
                {/*        spaceBetween={0}*/}
                {/*        slidesPerView={2}*/}
                {/*        className="mySwiper"*/}
                {/*    >*/}
                {/*        <SwiperSlide>*/}
                {/*            <PackageCard title={'Улётные ПУТЕШЕСТВИЯ'} image={travel} />*/}
                {/*        </SwiperSlide>*/}
                {/*        <SwiperSlide>*/}
                {/*            <PackageCard title={'Lite'} image={lite} />*/}
                {/*        </SwiperSlide>*/}
                {/*        <SwiperSlide>*/}
                {/*            <PackageCard title={'Classic'} image={bag} />*/}
                {/*        </SwiperSlide>*/}
                {/*        <SwiperSlide>*/}
                {/*            <PackageCard title={'Premium'} image={crown} />*/}
                {/*        </SwiperSlide>*/}
                {/*    </Swiper>*/}
                {/*    <div className={`${DEFAULT_CLASSNAME}_packages-title`}>{"Пакеты"}</div>*/}
                {/*</div>*/}
                <div className={`${DEFAULT_CLASSNAME}_works`}>
                    <div className={`${DEFAULT_CLASSNAME}_works_title`}>{'Как это работает?'}</div>
                    <div className={`${DEFAULT_CLASSNAME}_works_cards`}>
                        <div className={'how-it-work-card'}>
                            <img src={cardBag} alt={'work-card'} />
                            <div className={'how-it-work-card-title'}>{'Используй'}</div>
                            <div className={'how-it-work-card-text'}>{'Получай уникальные знания и возможности'}</div>
                        </div>
                        <div className={'how-it-work-card-line'}>{'>'}</div>
                        <div className={'how-it-work-card'}>
                            <img src={group} alt={'work-card'} />
                            <div className={'how-it-work-card-title'}>{'Масштабируй'}</div>
                            <div className={'how-it-work-card-text'}>{'Рекомендуй другим и строй свое комьюнити'}</div>
                        </div>
                        <div className={'how-it-work-card-line'}>{'>'}</div>
                        <div className={'how-it-work-card'}>
                            <img src={money} alt={'work-card'} />
                            <div className={'how-it-work-card-title'}>{'Будь счаслив!'}</div>
                            <div className={'how-it-work-card-text'}>{'Получи от жизни всё с Trifecto Company!'}</div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_works_more`}>{'Подробнее >>>'}</div>
                </div>
            </div>
            <Goal />
        </div>
    )
}