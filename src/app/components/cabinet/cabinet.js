import * as React from 'react'

import '../../app.scss';
import bag from "../../../assets/packeges/bag.png";
import fire from "../../../assets/packeges/fire.png";
import crown from "../../../assets/packeges/crown.png";
import { useNavigate } from "react-router-dom";

const DEFAULT_CLASSNAME = 'trifecta-app';

export const Cabinet = () => {
    const navigate = useNavigate();

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={`${DEFAULT_CLASSNAME}_content_cabinet`}>
                <div className={`${DEFAULT_CLASSNAME}_content_cabinet_withdraw`}>
                    <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Доступно к выводу"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{"4578.91$"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{"11905.17 BYN"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card_withdraw`} onClick={() => navigate('/app/withdraw')}>{"Вывести"}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Ожидает начисления"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{"138.40$"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{"359.84 BYN"}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Доход за всё время"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{"4578.91$"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{"11905.17 BYN"}</div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_content_cabinet_level`}>
                    <div className={`${DEFAULT_CLASSNAME}_level-item`}>
                        <div className={`${DEFAULT_CLASSNAME}_level-item_overall`}>
                            <div className={`${DEFAULT_CLASSNAME}_level-item_overall-container`}>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_overall_title`}>{"6 уровень"}</div>
                                <div>{"Групповой оборот"}</div>
                                <div>{"237.870$"}</div>
                            </div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_level-item_next`}>
                            <div className={`${DEFAULT_CLASSNAME}_level-item_next_title`}>{"Требуется для достижения следующего уровня"}</div>
                            <div>{"Групповой оборот: 300.000$"}</div>
                            <div>{"3 партнера 5 уровня"}</div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_level-item`}>
                        <div className={`${DEFAULT_CLASSNAME}_level-item_overall`}>
                            <div className={`${DEFAULT_CLASSNAME}_level-item_overall-container`}>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_overall_title`}>{"5 уровень"}</div>
                                <div>{"Месячный оборот"}</div>
                                <div>{"39.540$"}</div>
                            </div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_level-item_next`}>
                            <div className={`${DEFAULT_CLASSNAME}_level-item_next_title`}>{"Получаемый в этом месяце процент выплаты"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_level-item_next_percent`}>{"19%"}</div>
                        </div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_content_cabinet_packages`}>
                    <div className={`${DEFAULT_CLASSNAME}_package`} onClick={() => navigate("/app/marketing")}>
                        <img src={bag} alt={"img"} />
                        <div>{"Стартовый"}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_package`} onClick={() => navigate("/app/marketing")}>
                        <img src={fire} alt={"img"} />
                        <div>{"Классик"}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_package`} onClick={() => navigate("/app/marketing")}>
                        <img src={crown} alt={"img"} />
                        <div>{"Премиум"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}