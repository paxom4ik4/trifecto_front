import * as React from 'react';

import '../withdraw/withdraw.scss';
import './charges.scss';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'withdraw';

export const Charges = ({ isVerified }) => {
    const [CURRENT_CURRENCY, setCurrentCurrency] = useState(2.5);

    const navigate = useNavigate();

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


        fetch("https://www.nbrb.by/api/exrates/rates/431")
            .then(res => res.json())
            .then(data => setCurrentCurrency(data.Cur_OfficialRate))
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
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {userData ? <>
            <div className={`trifecta-app_content_cabinet_withdraw`}>
                <div className={`trifecta-app_withdraw_card`}>
                    <div className={`trifecta-app_withdraw_card_title`}>{"Доступно к выводу"}</div>
                    <div className={`trifecta-app_withdraw_card_amount`}>{userData?.availableForWithdrawal.toFixed(2) + "$" || "0"}</div>
                    <div className={`trifecta-app_withdraw_card_sub-amount`}>{(userData?.availableForWithdrawal.toFixed(2) * CURRENT_CURRENCY).toFixed(2) + " BYN" || "0"}</div>
                    <div className={`trifecta-app_withdraw_card_withdraw`}>{"Вывести"}</div>
                </div>
                <div className={`trifecta-app_withdraw_card`}>
                    <div className={`trifecta-app_withdraw_card_title`}>{"Ожидает начисления"}</div>
                    <div className={`trifecta-app_withdraw_card_amount`}>{userData?.awaitingAccrual.toFixed(2) + "$"}</div>
                    <div className={`trifecta-app}_withdraw_card_sub-amount`}>{(userData?.awaitingAccrual.toFixed(2) * CURRENT_CURRENCY).toFixed(2) + " BYN"}</div>
                </div>
                <div className={`trifecta-app_withdraw_card`}>
                    <div className={`trifecta-app_withdraw_card_title`}>{"Доход за всё время"}</div>
                    <div className={`trifecta-app_withdraw_card_amount`}>{userData?.allTimeIncome.toFixed(2) + "$"}</div>
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
                            <select onChange={(e) => setTransactionStatus(e.currentTarget.value === "Все" ? null : translateObj[e.currentTarget.value])} id={"status"}>
                                <option>{"Все"}</option>
                                <option value={"Принято"}>{"Принято"}</option>
                                <option value={"Отклонено"}>{"Отклонено"}</option>
                                <option value={"В обработке"}>{"В обработке"}</option>
                                <option value={"Готово к выводу"}>{"Готово к выводу"}</option>
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
                            <div>{translateObj2[item.transactionStatus]}</div>
                            <div>{item.initialAmount}</div>
                            <div>{item.accuralAmount}</div>
                            <div>{item.accuralDate.slice(0, 10)}</div>
                        </div>
                    )): <div className={`${DEFAULT_CLASSNAME}_table-empty`}>{"Начислений не совершалось"}</div>}
                </div>
                {!!selectedCharges.length && <div onClick={() => isVerified ? withdrawCharges() : navigate('/app/settings')} className={`charges_withdraw`}>{isVerified ? "Вывести выбранное" : "Для вывода средств требуется верификация"}</div>}
            </div> </> : <div className={`trifecta-app_loading`}>{"Loading..."}</div>}
        </div>
    )
}