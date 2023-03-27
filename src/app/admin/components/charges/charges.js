import * as React from 'react';

import './charges.scss';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Tooltip} from "../../../common/tooltip";

const DEFAULT_CLASSNAME = 'admin-charges';

export const AdminCharges = () => {
    const TOKEN = sessionStorage.getItem('accessToken');

    const [withdraws, setWithdraws] = useState([]);
    const [CURRENT_CURRENCY, setCurrentCurrency] = useState(2.5);

    useEffect(() => {
        fetch(`https://trifecta.by/api/Administrator/GetAccuralHistory`, {
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

    const confirmTransactions = () => {
        if (selectedCharges.length) {

            fetch("https://trifecta.by/api/Administrator/SetSelectedAccurals", {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify({
                    accurIds: selectedCharges,
                })
            })
                .finally(() => {
                    toast.info("Начисления подтверждены")
                })
        }
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>
                    <span>{"Начисления"}</span>
                    <button disabled={!selectedCharges.length} onClick={() => confirmTransactions()} className={`${DEFAULT_CLASSNAME}_title_btn`}>{"Подтверить"}</button>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_table`}>
                        <div className={`charges_table_header`}>
                            <div />
                            <div>{"Название начисления"}</div>
                            <div>{"КТО ПОЛУЧАЕТ"}</div>
                            <div>{"ЗА КОГО"}</div>
                            <div>{"%"}</div>
                            <div>{"ИСХОДНАЯ СУММА ($ / BYN)"}</div>
                            <div>{"К НАЧИСЛЕНИЮ ($ / BYN)"}</div>
                            <div>{"ДАТА"}</div>
                        </div>
                        {withdraws.length ? withdraws.map(item => (
                            <div className={`charges_table_item`} style={{ pointerEvents: !item.isAvailable && "none", opacity: !item.isAvailable && '0.5'}}>
                                <div className={`charges_table_item_select ${item.selected && 'confirmed'} ${!!selectedCharges.includes(item.id) && 'selected'}`} onClick={() => chargeHandler(item)}/>
                                <div>{item.accuralName}</div>
                                <div>{item.userEmail}</div>
                                <Tooltip text={item.referralName}><div>{item.referralName}</div></Tooltip>
                                <div>{item.accuralPercent}</div>
                                <div>{item.initialAmount + ' / ' + (item.initialAmount * CURRENT_CURRENCY).toFixed(1)}</div>
                                <div>{(item?.accuralAmountUSD).toFixed(1) + ' / ' + item.accuralAmount.toFixed(0)}</div>
                                <div>{item.accuralDate.slice(0, 10)}</div>
                            </div>
                        )): <div className={`${DEFAULT_CLASSNAME}_table-empty`}>{"Начислений не совершалось"}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}