import * as React from 'react';

import '../withdraw/withdraw.scss';
import './charges.scss';
import {useEffect, useState} from "react";

const DEFAULT_CLASSNAME = 'withdraw';

const CURRENT_CURRENCY = 2.5;

export const Charges = () => {
    const [withdraws, setWithdraws] = useState([]);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');
        const USER_ID = sessionStorage.getItem('userId');

        fetch(`https://trifecta-web-api.herokuapp.com/api/Withdraw/GetAccuralHistory?id=${USER_ID}`, {
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
            {userData ? <>
            <div className={`trifecta-app_content_cabinet_withdraw`}>
                <div className={`trifecta-app_withdraw_card`}>
                    <div className={`trifecta-app_withdraw_card_title`}>{"Доступно к выводу"}</div>
                    <div className={`trifecta-app_withdraw_card_amount`}>{userData?.availableForWithdrawal + "$" || "0"}</div>
                    <div className={`trifecta-app_withdraw_card_sub-amount`}>{(userData?.availableForWithdrawal * CURRENT_CURRENCY) + " BYN" || "0"}</div>
                    <div className={`trifecta-app_withdraw_card_withdraw`}>{"Вывести"}</div>
                </div>
                <div className={`trifecta-app_withdraw_card`}>
                    <div className={`trifecta-app_withdraw_card_title`}>{"Ожидает начисления"}</div>
                    <div className={`trifecta-app_withdraw_card_amount`}>{userData?.awaitingAccrual + "$"}</div>
                    <div className={`trifecta-app}_withdraw_card_sub-amount`}>{(userData?.awaitingAccrual * CURRENT_CURRENCY) + " BYN"}</div>
                </div>
                <div className={`trifecta-app_withdraw_card`}>
                    <div className={`trifecta-app_withdraw_card_title`}>{"Доход за всё время"}</div>
                    <div className={`trifecta-app_withdraw_card_amount`}>{userData?.allTimeIncome + "$"}</div>
                    <div className={`trifecta-app_withdraw_card_sub-amount`}>{(userData?.allTimeIncome * CURRENT_CURRENCY) + " BYN"}</div>
                </div>
            </div>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_header`}>
                    <div className={`${DEFAULT_CLASSNAME}_header_title`}>{"История начислений"}</div>
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
                    <div className={`charges_table_header`}>
                        <div>{"Название начисления"}</div>
                        <div>{"ЗА КОГО"}</div>
                        <div>{"%"}</div>
                        <div>{"СТАТУС"}</div>
                        <div>{"ИСХОДНАЯ СУММА"}</div>
                        <div>{"К НАЧИСЛЕНИЮ"}</div>
                        <div>{"ДАТА"}</div>
                    </div>
                    {withdraws.map(item => (
                        <div className={`charges_table_item`}>
                            <div>{item.accuralName}</div>
                            <div>{item.referralName}</div>
                            <div>{item.accuralPercent}</div>
                            <div>{item.transactionStatus}</div>
                            <div>{item.initialAmount}</div>
                            <div>{item.accuralAmount}</div>
                            <div>{item.accuralDate.slice(0, 10)}</div>
                        </div>
                    ))}
                </div>
            </div> </> : <div className={`trifecta-app_loading`}>{"Loading..."}</div>}
        </div>
    )
}