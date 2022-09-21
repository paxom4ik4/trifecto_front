import * as React from 'react';

import './products.scss';

import travel from './assets/travel.png';
import event from './assets/event.png';
import beauty from './assets/Beauty.png';
import eventBack from './assets/event_back.png'
import marketplace from './assets/marketplace.png';

import bubbles from './assets/bubbles.png';
import arrows from './assets/arrows.png';

const DEFAULT_CLASSNAME = 'products';

export const Products = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img src={travel} alt={'img'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_box`}>
                        <img src={bubbles} alt={'bubbles'} className={`${DEFAULT_CLASSNAME}_bubbles`}/>
                        <div>
                            <div className={`${DEFAULT_CLASSNAME}_item_box_title`}>{"Travel"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_box_text`}>{"Наш девиз - качество и безопасность. Наша команда посетила более 38 стран и искренне позаботится о том, чтобы сделать Ваш отдых увлекательным и насыщенным. При этом в своей работе исключительно используем индивидуальный подход и профессионализм в сфере туруслуг. С нами, Ваше путешествие - в надёжных руках."}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_box_more`}><span>{"подробнее"}</span> <img src={arrows} alt={'more'} /></div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <div className={`${DEFAULT_CLASSNAME}_item_box`}>
                    <img src={bubbles} alt={'bubbles'} className={`${DEFAULT_CLASSNAME}_bubbles`}/>
                        <div>
                            <div className={`${DEFAULT_CLASSNAME}_item_box_title`}>{"Event"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_box_text`}>{"За плечами нашей команды более 1000 проведенных мероприятий различной сложности в РБ и за ее пределами. Если вы нуждаетесь в организации детского праздника, дня рождения, корпоративной встречи или тимбилдинга, тренинга, загародного пикника, выпускного вечера, тогда Мы идем к ВАМ!"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_box_more`}><span>{"подробнее"}</span> <img src={arrows} alt={'more'} /></div>
                    </div>
                    <img src={event} alt={'img'} />
                    <img src={eventBack} alt={'img'} className={`${DEFAULT_CLASSNAME}_item_box_event-back`}/>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img src={beauty} alt={'img'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_box`}>
                        <img src={bubbles} alt={'bubbles'} className={`${DEFAULT_CLASSNAME}_bubbles`}/>
                        <div>
                            <div className={`${DEFAULT_CLASSNAME}_item_box_title`}>{"Beauty"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_box_text`}>{"Красота спасёт мир! \n" +
                            "Наши специалисты проведут тебя от азов этой индустрии, до профессионала своего любимого дела, а так же уникального мастера в сфере красоты."}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_box_more`}><span>{"подробнее"}</span> <img src={arrows} alt={'more'} /></div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <div className={`${DEFAULT_CLASSNAME}_item_box`}>
                        <img src={bubbles} alt={'bubbles'} className={`${DEFAULT_CLASSNAME}_bubbles`}/>
                        <div>
                            <div className={`${DEFAULT_CLASSNAME}_item_box_title`}>{"Marketplace"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_box_text`}>{"Платформа самых совремемнных направлений в сфере онлайн образования , с помощью которой ты сможешь развиваться и зарабатывать"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_box_more`}><span>{"подробнее"}</span> <img src={arrows} alt={'more'} /></div>
                    </div>
                    <img src={marketplace} alt={'img'} />
                </div>
            </div>
        </div>
    )
}