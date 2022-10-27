import * as React from 'react';

import '../withdraw/withdraw.scss';
import './charges.scss';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'withdraw';

const CURRENT_CURRENCY = 2.5;

export const Charges = ({ isVerified }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isVerified) {
            navigate('/app/settings');
        }
    }, [isVerified])

    const [withdraws, setWithdraws] = useState([]);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');
        const USER_ID = sessionStorage.getItem('userId');

        fetch(`https://trifecta.by/api/Withdraw/GetAccuralHistory?userId=${USER_ID}`, {
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

        fetch(`https://trifecta.by/api/Home/GetPersonalPageInfo?userId=${USER_ID}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setUserData(data));
    }, []);

    const [selectedCharges, setSelectedCharges] = useState([]);

    const chargeHandler = (item) => {
        if (selectedCharges.includes(item.id)) {
            const idx = selectedCharges.indexOf(item.id);
            const idsToSet = [...selectedCharges.slice(0, idx), ...selectedCharges.slice(idx + 1)];
            setSelectedCharges(idsToSet)
        } else {
            setSelectedCharges([...selectedCharges, item.id]);
        }
    }

    const withdrawCharges = () => {
        const USER_ID = sessionStorage.getItem('userId');
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch('https://trifecta.by/api/Withdraw/MakeWithdraw', {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            method: "POST",
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin',
            body: JSON.stringify({
                userId: USER_ID,
                accuralsId: selectedCharges,
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .finally(() => {
                toast.success("Запрос на вывод средств создан");
                setSelectedCharges([]);
            })
    }

    const [transactionStatus, setTransactionStatus] = useState(null);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');
        const USER_ID = sessionStorage.getItem('userId');

        let urlToFetch = `https://trifecta.by/api/Withdraw/GetAccuralHistory?userId=${USER_ID}`

        if (transactionStatus !== null) {
            urlToFetch = `${urlToFetch}&transactionStatus=${transactionStatus}`
        }

        fetch(urlToFetch, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setWithdraws(data));
    }, [transactionStatus])

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
                    <div className={`${DEFAULT_CLASSNAME}_header_title`}>
                        <div>{"История начислений"}</div>
                        <p>{"Доступ к выводу начислений появляется через 14 дней*"}</p>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_header_controls`}>
                        <div>
                            <label htmlFor={'status'}>{"Статус"}</label>
                            <select onChange={(e) => setTransactionStatus(e.currentTarget.value === "Все" ? null : e.currentTarget.value)} id={"status"}>
                                <option>{"Все"}</option>
                                <option value={1}>{"Accept"}</option>
                                <option value={2}>{"Failed"}</option>
                                <option value={4}>{"ReadyForWithdraw"}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_table`}>
                    <div className={`charges_table_header`}>
                        <div>{""}</div>
                        <div>{"Название начисления"}</div>
                        <div>{"ЗА КОГО"}</div>
                        <div>{"%"}</div>
                        <div>{"СТАТУС"}</div>
                        <div>{"ИСХОДНАЯ СУММА"}</div>
                        <div>{"К НАЧИСЛЕНИЮ"}</div>
                        <div>{"ДАТА"}</div>
                    </div>
                    {withdraws.length ? withdraws.map(item => (
                        <div className={`charges_table_item`} style={ !item.isAvailable && { pointerEvents: "none", opacity: '0.5'}}>
                            <div className={`charges_table_item_select ${!!selectedCharges.includes(item.id) && 'selected'} ${item.transactionStatus === 'Accept' && 'alreadyWithdraw selected'}`} onClick={() => chargeHandler(item)}/>
                            <div>{item.accuralName}</div>
                            <div>{item.referralName}</div>
                            <div>{item.accuralPercent}</div>
                            <div>{item.transactionStatus}</div>
                            <div>{item.initialAmount}</div>
                            <div>{item.accuralAmount}</div>
                            <div>{item.accuralDate.slice(0, 10)}</div>
                        </div>
                    )): <div className={`${DEFAULT_CLASSNAME}_table-empty`}>{"Начислений не совершалось"}</div>}
                </div>
                {!!selectedCharges.length && <div onClick={() => withdrawCharges()} className={`charges_withdraw`}>{"Вывести выбранное"}</div>}
            </div> </> : <div className={`trifecta-app_loading`}>{"Loading..."}</div>}
        </div>
    )
}