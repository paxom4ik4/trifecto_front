import * as React from 'react'

import '../../app.scss';
import './cabinet.scss';
import bag from "../../../assets/packeges/bag.png";
import fire from "../../../assets/packeges/fire.png";
import crown from "../../../assets/packeges/crown.png";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";

import { GradientCircularProgress } from "react-circular-gradient-progress";
const DEFAULT_CLASSNAME = 'trifecta-app';

export const Cabinet = ({ currentPackage }) => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    const [CURRENT_CURRENCY, setCurrentCurrency] = useState(2.5);

    useEffect(() => {
        const USER_ID = sessionStorage.getItem('userId');
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch(`https://trifecta.by/api/Home/GetPersonalPageInfo?userId=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setUserData(data));

        fetch("https://www.nbrb.by/api/exrates/rates/431")
            .then(res => res.json())
            .then(data => setCurrentCurrency(data.Cur_OfficialRate))
    }, []);

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {userData ?
            <>
                <div className={`${DEFAULT_CLASSNAME}_content_cabinet`}>
                    <div className={`${DEFAULT_CLASSNAME}_content_cabinet_withdraw`}>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Доступно к выводу"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{(userData?.availableForWithdrawal.toFixed(2) / CURRENT_CURRENCY.toFixed(2)).toFixed(2) + "$" || "0"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{userData?.availableForWithdrawal.toFixed(2)+ " BYN" || "0"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_withdraw`} onClick={() => navigate('/app/withdraw')}>{"Вывести"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Ожидает начисления"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{(userData?.awaitingAccrual.toFixed(2) / CURRENT_CURRENCY.toFixed(2)).toFixed(2) + "$"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_sub-amount`}>{userData?.awaitingAccrual.toFixed(2) + " BYN"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_withdraw_card`}>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_title`}>{"Доход за всё время"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_withdraw_card_amount`}>{(userData?.allTimeIncome.toFixed(2) / CURRENT_CURRENCY.toFixed(2)).toFixed(2) + "$"}</div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_content_cabinet_level`}>
                        <div className={`${DEFAULT_CLASSNAME}_level-item`}>
                            <GradientCircularProgress
                                startColor={"#48C5D6"}
                                middleColor={"#9473DC"}
                                endColor={"#394FC2"}
                                size={280}
                                progress={userData?.baseLevelInfo.currentTurnover / userData?.nextBasicLevelRequirements.groupTurnover * 100}
                                strokeWidth={5}
                            >
                                <div className={`${DEFAULT_CLASSNAME}_level-item_overall-container`}>
                                    <div className={`${DEFAULT_CLASSNAME}_level-item_overall_title`}>{userData?.baseLevelInfo.currentLevel.name}</div>
                                    <div>{"Групповой оборот"}</div>
                                    <div>{userData?.baseLevelInfo.currentTurnover + "$"}</div>
                                </div>
                            </GradientCircularProgress>
                            <div className={`${DEFAULT_CLASSNAME}_level-item_next`}>
                                <div className={`${DEFAULT_CLASSNAME}_level-item_next_title`}>{"Требуется для достижения следующего уровня"}</div>
                                <div>{"Групповой оборот: "}{userData?.nextBasicLevelRequirements.groupTurnover} $</div>
                                <div>{userData?.nextBasicLevelRequirements.partnersRequirementCount} {"партнера"} {userData?.nextBasicLevelRequirements.partnersRequirementLevel} {"уровня"}</div>
                            </div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_level-item`}>
                            <GradientCircularProgress
                                startColor={"#48C5D6"}
                                middleColor={"#9473DC"}
                                endColor={"#394FC2"}
                                size={280}
                                progress={userData?.mounthlyLevelInfo.currentTurnover / (userData?.mounthlyLevelInfo.requiredMonthlyTurnoverToNextLevel || 9000) * 100}
                                strokeWidth={5}
                            >
                                <div className={`${DEFAULT_CLASSNAME}_level-item_overall-container`}>
                                    <div className={`${DEFAULT_CLASSNAME}_level-item_overall_title`}>{userData?.mounthlyLevelInfo.currentLevel.name}</div>
                                    <div>{"Месячный оборот"}</div>
                                    <div>{userData?.mounthlyLevelInfo.currentTurnover + "$"}</div>
                                </div>
                            </GradientCircularProgress>
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
                        <div className={`bonus_data`}>
                            <div>Start Bonus активен ещё: <br /> {userData?.startBonusExpTime === null ? "" : userData?.startBonusExpTime} дней</div>
                            {userData?.dynamicBonusExpTime === 999 ? <div>Dynamic Bonus <br /> Активен постоянно</div> : <div>Dynamic Bonus активен ещё: <br /> {userData?.startBonusExpTime} дней</div>}
                        </div>
                    </div>
                </div>
            </> : <div className={`trifecta-app_loading`}>{"Loading..."}</div>
            }
        </div>
    )
}