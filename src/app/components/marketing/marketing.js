import * as React from 'react';

import './marketing.scss';

import back from './assets/Subtract.png';

import start from './assets/start.png';
import classic from './assets/classic.png';
import premium from './assets/premium.png';

const DEFAULT_CLASSNAME = 'marketing';

export const Marketing = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет СТАРТОВЫЙ"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Dynamic Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_buy`}>{"Приобрести"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{"199$"}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={start} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                        <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет КЛАССИК"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Level Bonus 50%"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Dynamic Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Auto Bonus с 7 уровня"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_buy`}>{"Приобрести"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{"999$"}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={classic} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет ПРЕМИУМ"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Level Bonus 100%"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Dynamic Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Auto Bonus с 5 уровня"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Bun Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Bonus Overall"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_buy`}>{"Приобрести"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{"1999$"}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={premium} alt={'item'} />
                    </div>
                </div>
            </div>
        </div>
    )
}