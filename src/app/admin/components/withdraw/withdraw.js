import React, {useEffect, useState} from 'react';

import './withdraw.scss';
import {toast} from "react-toastify";

const DEFAULT_CLASSNAME = 'admin-withdraw';

export const Withdraw = () => {
    const TOKEN = sessionStorage.getItem('accessToken');

    const [withdraws, setWithdraws] = useState([]);
    const [dataChanges, setDataChanges] = useState(0);

    useEffect(() => {
        fetch(`http://trifecta.by:5000/api/Administrator/GetWithdrawRequestList`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setWithdraws(data));
    }, [dataChanges])

    const acceptTransaction = (id) => {
        fetch('http://trifecta.by:5000/api/Administrator/AcceptUserWithdraw', {
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
            body: JSON.stringify({
                requestId: id,
            })
        })
            .then(res => res.json())
            .finally(() => {
                setDataChanges(dataChanges + 1);
                toast.info("Запрос подтвержден");
            })
    }

    const rejectTransaction = (id) => {
        fetch('http://trifecta.by:5000/api/Administrator/RejectUserWithdraw', {
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
            body: JSON.stringify({
                requestId: id,
            })
        })
            .then(res => res.json())
            .finally(() => {
                setDataChanges(dataChanges + 1);
                toast.info("Запрос отклнен");
            })
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Вывод средств"}</div>
                <div className={`${DEFAULT_CLASSNAME}_list`}>
                    {withdraws.length ? withdraws.map(item => {
                        return (
                            <div className={`${DEFAULT_CLASSNAME}_item`}>
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
                                    <div>{item.date}</div>
                                </div>
                            </div>
                        )
                    }): <div>{"Нет запросов на вывод средств"}</div>}
                </div>
            </div>
        </div>
    )
}