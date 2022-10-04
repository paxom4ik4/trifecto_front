import * as React from 'react'

import '../../app.scss';
import bag from "../../../assets/packeges/bag.png";
import fire from "../../../assets/packeges/fire.png";
import crown from "../../../assets/packeges/crown.png";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";

const DEFAULT_CLASSNAME = 'trifecta-app';

const CURRENT_CURRENCY = 2.5;

export const Cabinet = ({ currentPackage }) => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const USER_ID = sessionStorage.getItem('userId');
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch(`https://trifecta-web-api.herokuapp.com/api/Home/GetPersonalPageInfo?userId=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setUserData(data));
    }, []);

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {userData ?
            <>
                <div className={`${DEFAULT_CLASSNAME}_content_cabinet`}>
                    <div className={`${DEFAULT_CLASSNAME}_content_cabinet_withdraw`}>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Доступно к выводу"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{userData?.availableForWithdrawal + "$" || "0"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{(userData?.availableForWithdrawal * CURRENT_CURRENCY) + " BYN" || "0"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_withdraw`} onClick={() => navigate('/app/withdraw')}>{"Вывести"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Ожидает начисления"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{userData?.awaitingAccrual + "$"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{(userData?.awaitingAccrual * CURRENT_CURRENCY) + " BYN"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Доход за всё время"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{userData?.allTimeIncome + "$"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{(userData?.allTimeIncome * CURRENT_CURRENCY) + " BYN"}</div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_content_cabinet_level`}>
                        <div className={`${DEFAULT_CLASSNAME}_level-item`}>
                            <div className={`${DEFAULT_CLASSNAME}_level-item_overall`}>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_overall-container`}>
                                    <div className={`${DEFAULT_CLASSNAME}_level-item_overall_title`}>{userData?.baseLevelInfo.currentLevel.name}</div>
                                    <div>{"Групповой оборот"}</div>
                                    <div>{userData?.baseLevelInfo.currentTurnover + "$"}</div>
                                </div>
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_level-item_next`}>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_next_title`}>{"Требуется для достижения следующего уровня"}</div>
                                <div>{"Групповой оборот: "}{userData?.nextBasicLevelRequirements.groupTurnover} $</div>
                                <div>{userData?.nextBasicLevelRequirements.partnersRequirementCount} {"партнера"} {userData?.nextBasicLevelRequirements.partnersRequirementLevel} {"уровня"}</div>
                            </div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_level-item`}>
                            <div className={`${DEFAULT_CLASSNAME}_level-item_overall`}>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_overall-container`}>
                                    <div className={`${DEFAULT_CLASSNAME}_level-item_overall_title`}>{userData?.mounthlyLevelInfo.currentLevel.name}</div>
                                    <div>{"Месячный оборот"}</div>
                                    <div>{userData?.mounthlyLevelInfo.currentTurnover + "$"}</div>
                                </div>
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_level-item_next`}>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_next_title`}>{"Получаемый в этом месяце процент выплаты"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_next_percent`}>{userData?.receivedPayoutPercentage + "%"}</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_content_cabinet_packages`}>
                        {currentPackage?.name === "Start" && <div className={`${DEFAULT_CLASSNAME}_package`} onClick={() => navigate("/app/marketing")}>
                            <img src={bag} alt={"img"} />
                            <div>{"Пробный"}</div>
                        </div>}
                        {currentPackage?.name === "Classic" && <div className={`${DEFAULT_CLASSNAME}_package`} onClick={() => navigate("/app/marketing")}>
                            <img src={fire} alt={"img"} />
                            <div>{"Классик"}</div>
                        </div>}
                        {currentPackage?.name === "Premium" && <div className={`${DEFAULT_CLASSNAME}_package`} onClick={() => navigate("/app/marketing")}>
                            <img src={crown} alt={"img"} />
                            <div>{"Премиум"}</div>
                        </div>}
                    </div>
                </div>
            </> : <div className={`trifecta-app_loading`}>{"Loading..."}</div>

            }
        </div>
    )
}