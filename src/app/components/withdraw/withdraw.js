import * as React from 'react';

import './withdraw.scss';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'withdraw';

export const Withdraw = ({ isVerified }) => {
    const navigate = useNavigate();

    const [CURRENT_CURRENCY, setCurrentCurrency] = useState(2.5);

    useEffect(() => {
        if (!isVerified) {
            navigate('/app/settings');
        }
    }, [isVerified])
    const [withdraws, setWithdraws] = useState([]);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');
        const USER_ID = sessionStorage.getItem('userId');

        fetch(`https://trifecta.by/api/Withdraw/GetWithdrawHistory?userId=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setWithdraws(data));

        fetch("https://www.nbrb.by/api/exrates/rates/431")
            .then(res => res.json())
            .then(data => setCurrentCurrency(data.Cur_OfficialRate))
    }, [])

    const [transactionStatus, setTransactionStatus] = useState(null);
    const [period, setPeriod] = useState(null);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');
        const USER_ID = sessionStorage.getItem('userId');

        let urlToFetch = `https://trifecta.by/api/Withdraw/GetWithdrawHistory?userId=${USER_ID}`;

        console.log(transactionStatus);

        if (transactionStatus !== null) {
            urlToFetch = `${urlToFetch}&transactionStatus=${transactionStatus}`;
        }

        if (period !== null) {
            urlToFetch = `${urlToFetch}&period=${period}`
        }

        fetch(urlToFetch, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setWithdraws(data));
    }, [transactionStatus, period]);

    const [userData, setUserData] = useState(null);

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
    }, []);

    const translateObj = {
        "Принято": "Accept",
        "В обработке": "Pending",
        "Отклонено": "Failed",
        "Готово к выводу": "ReadyForWithdraw",
    }

    const translateObj2 = {
        "Accept": "Принято",
        "Pending": "В обработке",
        "Failed": "Отклонено",
        "ReadyForWithdraw": "Готово к выводу",
    };

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {userData ? <>
                <div className={`trifecta-app_content_cabinet_withdraw`}>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"Доступно к выводу"}</div>
                        <div
                            className={`trifecta-app_withdraw_card_amount`}>{userData?.availableForWithdrawal.toFixed(2) + "$" || "0"}</div>
                        <div
                            className={`trifecta-app_withdraw_card_sub-amount`}>{(userData?.availableForWithdrawal.toFixed(2) * CURRENT_CURRENCY).toFixed(2) + " BYN" || "0"}</div>
                        <div className={`trifecta-app_withdraw_card_withdraw`}>{"Вывести"}</div>
                    </div>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"Ожидает начисления"}</div>
                        <div className={`trifecta-app_withdraw_card_amount`}>{userData?.awaitingAccrual.toFixed(2) + "$"}</div>
                        <div
                            className={`trifecta-app}_withdraw_card_sub-amount`}>{(userData?.awaitingAccrual.toFixed(2) * CURRENT_CURRENCY).toFixed(2) + " BYN"}</div>
                    </div>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"Доход за всё время"}</div>
                        <div className={`trifecta-app_withdraw_card_amount`}>{userData?.allTimeIncome.toFixed(2) + "$"}</div>
                    </div>
                </div>
                <div className={DEFAULT_CLASSNAME}>
                    <div className={`${DEFAULT_CLASSNAME}_header`}>
                        <div className={`${DEFAULT_CLASSNAME}_header_title`}>{"Выводы"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_header_controls`}>
                            <div>
                                <label htmlFor={'status'}>{"Статус"}</label>
                                <select onChange={(e) => setTransactionStatus(e.currentTarget.value === "Все" ? null : translateObj[e.currentTarget.value])} id={"status"}>
                                    <option value={null}>{"Все"}</option>
                                    <option value={"Принято"}>{"Приянто"}</option>
                                    <option value={"Отклонено"}>{"Отклонено"}</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={'period'}>{"Период"}</label>
                                <select onChange={(e) => setPeriod(e.currentTarget.value === "Все" ? null : e.currentTarget.value)} id={"period"}>
                                    <option>{"Все"}</option>
                                    <option value={1}>{"День"}</option>
                                    <option value={2}>{"Неделя"}</option>
                                    <option value={3}>{"Месяц"}</option>
                                    <option value={4}>{"3 Месяца"}</option>
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
                        {withdraws.length ? withdraws.map(item => (
                            <div className={`${DEFAULT_CLASSNAME}_table_item`}>
                                <div>{item.cardCode}</div>
                                <div>{translateObj2[item.status]}</div>
                                <div>{item.amount}</div>
                                <div>{item.dateTime.slice(0, 10)}</div>
                            </div>
                        )) : <div className={`${DEFAULT_CLASSNAME}_table-empty`}>{"Выводов не совершалось"}</div>}
                    </div>
                </div>
            </> : <div className={`trifecta-app_loading`}>{"Loading..."}</div>
            }
        </div>
    )
}