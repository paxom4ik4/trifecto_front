import * as React from 'react';

import './progress.scss';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'progress';

export const Progress = ({ isVerified }) => {
    const navigate = useNavigate();

    const [CURRENT_CURRENCY, setCurrentCurrency] = useState(2.5);

    useEffect(() => {
        if (!isVerified) {
            navigate('/app/settings');
        }
    }, [isVerified])

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const USER_ID = sessionStorage.getItem('userId');
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch(`https://trifecta.by/api/Progress/GetUserProgress?userId=${USER_ID}`, {
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
                <div className={`trifecta-app_content_cabinet_withdraw`}>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"Доступно к выводу"}</div>
                        <div
                            className={`trifecta-app_withdraw_card_amount`}>{userData?.availableForWithdrawal + "$" || "0"}</div>
                        <div
                            className={`trifecta-app_withdraw_card_sub-amount`}>{(userData?.availableForWithdrawal * CURRENT_CURRENCY).toFixed(2) + " BYN" || "0"}</div>
                        <div className={`trifecta-app_withdraw_card_withdraw`}>{"Вывести"}</div>
                    </div>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"Ожидает начисления"}</div>
                        <div className={`trifecta-app_withdraw_card_amount`}>{userData?.awaitingAccrual + "$"}</div>
                        <div
                            className={`trifecta-app}_withdraw_card_sub-amount`}>{(userData?.awaitingAccrual * CURRENT_CURRENCY).toFixed(2) + " BYN"}</div>
                    </div>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"Доход за всё время"}</div>
                        <div className={`trifecta-app_withdraw_card_amount`}>{userData?.allTimeIncome + "$"}</div>
                    </div>
                </div>
                <div className={DEFAULT_CLASSNAME}>
                    <div className={`${DEFAULT_CLASSNAME}_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_content_item`}>
                            <div className={`${DEFAULT_CLASSNAME}_content_item_title`}>{`Базовый - ${userData?.baseLevelProgress.baseLevel.name}`}</div>
                            <div className={`${DEFAULT_CLASSNAME}_bar`}>
                                <div className={`${DEFAULT_CLASSNAME}_bar_title`}>{"Групповой оборот"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_bar_content`}>
                                    <div className={`${DEFAULT_CLASSNAME}_bar_content_progress`}
                                         style={{width: `${userData?.baseLevelProgress.currentCommonTurnover / userData?.baseLevelProgress.nextBasicLevelRequirements.groupTurnover * 100}%`}}/>
                                </div>
                                <div
                                    className={`${DEFAULT_CLASSNAME}_bar_subtitle`}>{`${userData?.baseLevelProgress.currentCommonTurnover}.00$ / ${userData?.baseLevelProgress.nextBasicLevelRequirements.groupTurnover}.00$`}</div>
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_bar`}>
                                <div
                                    className={`${DEFAULT_CLASSNAME}_bar_title`}>{`Рефералов ${userData?.baseLevelProgress.baseLevel.name.slice(0, 2)}уровня`}</div>
                                <div className={`${DEFAULT_CLASSNAME}_bar_content`}>
                                    <div className={`${DEFAULT_CLASSNAME}_bar_content_progress`}
                                         style={{width: `${userData?.baseLevelProgress.countOfRefferralRequiredFoNextLevel / userData?.baseLevelProgress.nextBasicLevelRequirements.partnersRequirementCount * 100}%`}}/>
                                </div>
                                <div
                                    className={`${DEFAULT_CLASSNAME}_bar_subtitle`}>{`${userData?.baseLevelProgress.countOfRefferralRequiredFoNextLevel} / ${userData?.baseLevelProgress.nextBasicLevelRequirements.partnersRequirementCount}`}</div>
                            </div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_content_item`}>
                            <div className={`${DEFAULT_CLASSNAME}_content_item_title`}>{`Структурный - ${userData?.structuralLevelProgress.currentLevel.name}`}</div>
                            <div className={`${DEFAULT_CLASSNAME}_bar`}>
                                <div className={`${DEFAULT_CLASSNAME}_bar_title`}>{"Оборот текущего месяца"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_bar_content`}>
                                    <div className={`${DEFAULT_CLASSNAME}_bar_content_progress`}
                                         style={{width: `${userData?.structuralLevelProgress?.currentMonthlyTurnover / userData?.structuralLevelProgress.requiredMonthlyTurnoverToNextLevel * 100}%`}}/>
                                </div>
                                <div
                                    className={`${DEFAULT_CLASSNAME}_bar_subtitle`}>{`${userData?.structuralLevelProgress?.currentMonthlyTurnover}.00$ / ${userData?.structuralLevelProgress.requiredMonthlyTurnoverToNextLevel}.00$`}</div>
                            </div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_content_item`}>
                            <div className={`${DEFAULT_CLASSNAME}_content_item_title`}>{`Auto`}</div>
                            {userData?.autoBonusProgress.baseLevel.level >= 5 ?
                                <>
                                    <div className={`${DEFAULT_CLASSNAME}_bar`}>
                                        <div
                                            className={`${DEFAULT_CLASSNAME}_bar_title`}>{"Базовый уровень"}</div>
                                        <div className={`${DEFAULT_CLASSNAME}_bar_content`}>
                                            <div className={`${DEFAULT_CLASSNAME}_bar_content_progress`}
                                                 style={
                                                    { width: `${userData?.autoBonusProgress.baseLevel.level / 10 * 100}%`, background: userData?.autoBonusProgress.baseLevel.level / 10 * 100 === 100 && "linear-gradient(87.57deg, #3F87F6 0%, #4CE9C1 94.44%)"}
                                                }
                                            />
                                        </div>
                                        <div className={`${DEFAULT_CLASSNAME}_bar_subtitle`}>{`${userData?.autoBonusProgress.baseLevel.level} / 10`}</div>
                                    </div>
                                    <div className={`${DEFAULT_CLASSNAME}_bar`}>
                                        <div className={`${DEFAULT_CLASSNAME}_bar_title`}>{"Оборот текущего месяца"}</div>
                                        <div className={`${DEFAULT_CLASSNAME}_bar_content`}>
                                            <div className={`${DEFAULT_CLASSNAME}_bar_content_progress`}
                                                 style={
                                                    { width: `${userData?.autoBonusProgress.currentMonthlyTurnover / userData?.autoBonusProgress.requiredMonthlyTurnoverToNextLevel * 100}%`, background: userData?.autoBonusProgress.currentMonthlyTurnover / userData?.autoBonusProgress.requiredMonthlyTurnoverToNextLevel * 100 && "linear-gradient(87.57deg, #3F87F6 0%, #4CE9C1 94.44%)"}
                                                }
                                            />
                                        </div>
                                        <div
                                            className={`${DEFAULT_CLASSNAME}_bar_subtitle`}>{`${userData?.autoBonusProgress.currentMonthlyTurnover}.00$ / ${userData?.autoBonusProgress.requiredMonthlyTurnoverToNextLevel}.00$`}</div>
                                    </div>
                                </> : <div className={`${DEFAULT_CLASSNAME}_bar_title`}>{"Необходимо достичь 5 уровня"}</div>
                            }
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_content_item`}>
                            <div className={`${DEFAULT_CLASSNAME}_content_item_title`}>{`Travel`}</div>
                            <div className={`${DEFAULT_CLASSNAME}_bar`}>
                                <div className={`${DEFAULT_CLASSNAME}_bar_title`}>{"Личный оборот текущего месяца"}</div>
                                <div className={`${DEFAULT_CLASSNAME}_bar_content`}>
                                    <div className={`${DEFAULT_CLASSNAME}_bar_content_progress`}
                                         style={{width: `${(userData?.travelBonusInfo.userPersonalMonthlyTurnover / userData?.travelBonusInfo.travelBonusTurnover * 100)}%`, background: (userData?.travelBonusInfo.userPersonalMonthlyTurnover / userData?.travelBonusInfo.travelBonusTurnover * 100) === 100 && "linear-gradient(87.57deg, #3F87F6 0%, #4CE9C1 94.44%)"}}/>
                                </div>
                                <div
                                    className={`${DEFAULT_CLASSNAME}_bar_subtitle`}>{`${userData?.travelBonusInfo.userPersonalMonthlyTurnover}.00$ / ${userData?.travelBonusInfo.travelBonusTurnover}.00$`}</div>
                            </div>
                        </div>
                    </div>
                </div>
                </> : <div className={`trifecta-app_loading`}>{"Loading..."}</div>
            }
        </div>
    )
}