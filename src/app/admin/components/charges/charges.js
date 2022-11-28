import * as React from 'react';

import './charges.scss';
import {useEffect, useState} from "react";

const DEFAULT_CLASSNAME = 'admin-charges';

export const AdminCharges = () => {
    const TOKEN = sessionStorage.getItem('accessToken');

    const [withdraws, setWithdraws] = useState([]);

    useEffect(() => {
        fetch(`https://trifecta.by/api/Administrator/GetAccuralHistory`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setWithdraws(data));
    }, [])

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Начисления"}</div>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_table`}>
                        <div className={`charges_table_header`}>
                            <div>{"Название начисления"}</div>
                            <div>{"КТО ПОЛУЧАЕТ"}</div>
                            <div>{"ЗА КОГО"}</div>
                            <div>{"%"}</div>
                            <div>{"ИСХОДНАЯ СУММА ($ / BYN)"}</div>
                            <div>{"К НАЧИСЛЕНИЮ ($ / BYN)"}</div>
                            <div>{"ДАТА"}</div>
                        </div>
                        {withdraws.length ? withdraws.map(item => (
                            <div className={`charges_table_item`}>
                                <div>{item.accuralName}</div>
                                <div>{item.userEmail}</div>
                                <div>{item.referralName}</div>
                                <div>{item.accuralPercent}</div>
                                <div>{item.initialAmount}</div>
                                <div>{item.accuralAmount}</div>
                                <div>{item.accuralDate.slice(0, 10)}</div>
                            </div>
                        )): <div className={`${DEFAULT_CLASSNAME}_table-empty`}>{"Начислений не совершалось"}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}