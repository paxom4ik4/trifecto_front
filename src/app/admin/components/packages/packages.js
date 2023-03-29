import * as React from 'react';

import './packages.scss';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const DEFAULT_CLASSNAME = 'admin-packages';

export const Packages = () => {
    const TOKEN = sessionStorage.getItem('accessToken');

    const [packages, setPackages] = useState([]);
    const [dataChanges, setDataChanges] = useState(0);

    useEffect(() => {
        fetch(`https://trifecta.by/api/Administrator/GetCashRequests`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setPackages(data));
    }, [dataChanges])

    const acceptRequest = (userId, requestId, packageId) => {
        fetch(`https://trifecta.by/api/Administrator/AcceptCashRequests?requestId=${requestId}&userId=${userId}&packageId=${packageId}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            },
            method: "POST",
        })
            .finally(() => {
                toast("Запрос подтвержден!");
                setDataChanges(dataChanges + 1)
            })
    }

    const rejectRequest = (requestId) => {
        fetch(`https://trifecta.by/api/Administrator/RejectCashRequests?requestId=${requestId}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            },
            method: "POST",
        })
            .finally(() => {
                toast("Запрос отклонен!");
                setDataChanges(dataChanges + 1)
            })
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Подтверждение покупки пакетов"}</div>
                <div className={`admin-withdraw_list`}>
                {!!packages.length ? packages.map(item => {
                    return (
                        <div className={`admin-withdraw_item`}>
                            <div className={`admin-withdraw_left`}>
                                <div>{item.firstName}</div>
                                <div>{item.lastName}</div>
                                <br />
                                <div>{"Email: "} {item.email}</div>
                                <br />
                                <div>{"Тип пакета:"} {item.packageName}</div>
                                <br />
                                <div>{"Цена:"} {item.packagePriceUSD + "$"} / {item?.packagePriceBYN + "BYN"}</div>
                                <br />
                                <div className={`admin-withdraw_approve`} onClick={() => acceptRequest(item.userId, item.requestId, item.packageId)}>{"Подтвердить"}</div>
                                <div className={`admin-withdraw_reject`} onClick={() => rejectRequest(item.requestId)}>{"Отказать"}</div>
                            </div>
                        </div>
                    )
                }) : <div>{"Нет запросов на покупку пакетов"}</div>}
                </div>
            </div>
        </div>
    )
}