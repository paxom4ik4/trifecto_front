import React, {useEffect, useState} from 'react';

import './withdraw.scss';
import {toast} from "react-toastify";

import arrow from './arrow.png';

const DEFAULT_CLASSNAME = 'admin-withdraw';

export const Withdraw = () => {
    const TOKEN = sessionStorage.getItem('accessToken');

    const [withdraws, setWithdraws] = useState([]);
    const [dataChanges, setDataChanges] = useState(0);

    useEffect(() => {
        fetch(`https://trifecta.by/api/Administrator/GetWithdrawRequestList`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setWithdraws(data));
    }, [dataChanges])

    const acceptTransaction = (id) => {
        fetch(`https://trifecta.by/api/Administrator/AcceptUserWithdraw?requestId=${id}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            },
            method: "POST",
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin',
        })
            .then(res => res.json())
            .finally(() => {
                setDataChanges(dataChanges + 1);
                toast.info("Запрос подтвержден");
            })
    }

    const rejectTransaction = (id) => {
        fetch(`https://trifecta.by/api/Administrator/RejectUserWithdraw?requestId=${id}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            },
            method: "POST",
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin',
        })
            .then(res => res.json())
            .finally(() => {
                setDataChanges(dataChanges + 1);
                toast.info("Запрос отклнен");
            })
    }

    const [cardExpanded, setCardExpanded] = useState(false);

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Вывод средств"}</div>
                <div className={`${DEFAULT_CLASSNAME}_list`}>
                    {withdraws.length ? withdraws.map(item => {
                        return (
                            <div className={`${DEFAULT_CLASSNAME}_item`}>
                                <img onClick={() => setCardExpanded(!cardExpanded)} className={`${DEFAULT_CLASSNAME}_item_expand ${cardExpanded && "expanded"}`} src={arrow} />
                                <div className={`${DEFAULT_CLASSNAME}_item_full ${!cardExpanded && 'hidden'}`}>
                                    {item.accurals.map(accural => {
                                        return (
                                            <div>
                                                <span>{accural.accuralName}</span>
                                                <span>{accural?.referralName}</span>
                                                <span>{new Date(accural?.accuralDate).toLocaleDateString()}</span>
                                                <span>{accural.accuralAmount + " BYN"}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={`${DEFAULT_CLASSNAME}_left`}>
                                    <div>{item.name}</div>
                                    <div>{item.surname}</div>
                                    <br /><
                                    div>{item.email}</div>
                                    <div>{item.phoneNumber}</div>
                                    <br />
                                    <div className={`${DEFAULT_CLASSNAME}_approve`} onClick={() => acceptTransaction(item.id)}>{"Подтвердить"}</div>
                                    <div className={`${DEFAULT_CLASSNAME}_reject`} onClick={() => rejectTransaction(item.id)}>{"Отказать"}</div>
                                </div>
                                <div className={`${DEFAULT_CLASSNAME}_right`}>
                                    <div>{"Запрашиваемая сумма"}</div>
                                    <div>{item.withdrawSum}</div>
                                    <br /><
                                    div>{"Номер счета"}</div>
                                    <div>{item.checkingAccount}</div>
                                    <br />
                                    <div>{"Дата инициализации вывода"}</div>
                                    <div>{new Date(item.date).toDateString()}</div>
                                </div>
                            </div>
                        )
                    }): <div>{"Нет запросов на вывод средств"}</div>}
                </div>
            </div>
        </div>
    )
}