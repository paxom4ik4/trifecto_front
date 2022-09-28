import * as React from 'react';

import './withdraw.scss';
import {useEffect, useState} from "react";

const DEFAULT_CLASSNAME = 'withdraw';

const CURRENT_CURRENCY = 2.5;

export const Withdraw = () => {
    const [withdraws, setWithdraws] = useState([]);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');
        const USER_ID = sessionStorage.getItem('userId');

        fetch(`http://trifecta.by:5000/api/Withdraw/GetWithdrawHistory?id=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setWithdraws(data));
    }, [])

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const USER_ID = sessionStorage.getItem('userId');
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch(`http://trifecta.by:5000/api/Home/GetPersonalPageInfo?userId=${USER_ID}`, {
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
            {userData ? <>
                <div className={`trifecta-app_content_cabinet_withdraw`}>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"Доступно к выводу"}</div>
                        <div
                            className={`trifecta-app_withdraw_card_amount`}>{userData?.availableForWithdrawal + "$" || "0"}</div>
                        <div
                            className={`trifecta-app_withdraw_card_sub-amount`}>{(userData?.availableForWithdrawal * CURRENT_CURRENCY) + " BYN" || "0"}</div>
                        <div className={`trifecta-app_withdraw_card_withdraw`}>{"Вывести"}</div>
                    </div>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"Ожидает начисления"}</div>
                        <div className={`trifecta-app_withdraw_card_amount`}>{userData?.awaitingAccrual + "$"}</div>
                        <div
                            className={`trifecta-app}_withdraw_card_sub-amount`}>{(userData?.awaitingAccrual * CURRENT_CURRENCY) + " BYN"}</div>
                    </div>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"Доход за всё время"}</div>
                        <div className={`trifecta-app_withdraw_card_amount`}>{userData?.allTimeIncome + "$"}</div>
                        <div
                            className={`trifecta-app_withdraw_card_sub-amount`}>{(userData?.allTimeIncome * CURRENT_CURRENCY) + " BYN"}</div>
                    </div>
                </div>
                <div className={DEFAULT_CLASSNAME}>
                    <div className={`${DEFAULT_CLASSNAME}_header`}>
                        <div className={`${DEFAULT_CLASSNAME}_header_title`}>{"Выводы"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_header_controls`}>
                            <div>
                                <label htmlFor={'period'}>{"Период"}</label>
                                <select id={"period"}>
                                    <option>{"Все"}</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={'status'}>{"Статус"}</label>
                                <select id={"status"}>
                                    <option>{"Все"}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_table`}>
                        <div className={`${DEFAULT_CLASSNAME}_table_header`}>
                            <div>{"Счёт на который производился вывод средств"}</div>
                            <div>{"СТАТУС"}</div>
                            <div>{"СУММА"}</div>
                            <div>{"ДАТА и время"}</div>
                        </div>
                        {withdraws.map(item => (
                            <div className={`${DEFAULT_CLASSNAME}_table_item`}>
                                <div>{item.cardCode}</div>
                                <div>{item.status}</div>
                                <div>{item.amount}</div>
                                <div>{item.dateTime.slice(0, 10)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </> : <div className={`trifecta-app_loading`}>{"Loading..."}</div>
            }
        </div>
    )
}