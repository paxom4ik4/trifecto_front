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

    (function() {
        function decimalAdjust(type, value, exp) {
            // Если степень не определена, либо равна нулю...
            if (typeof exp === 'undefined' || +exp === 0) {
                return Math[type](value);
            }
            value = +value;
            exp = +exp;
            // Если значение не является числом, либо степень не является целым числом...
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                return NaN;
            }
            // Сдвиг разрядов
            value = value.toString().split('e');
            value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
            // Обратный сдвиг
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
        }

        // Десятичное округление к ближайшему
        if (!Math.round10) {
            Math.round10 = function(value, exp) {
                return decimalAdjust('round', value, exp);
            };
        }
        // Десятичное округление вниз
        if (!Math.floor10) {
            Math.floor10 = function(value, exp) {
                return decimalAdjust('floor', value, exp);
            };
        }
        // Десятичное округление вверх
        if (!Math.ceil10) {
            Math.ceil10 = function(value, exp) {
                return decimalAdjust('ceil', value, exp);
            };
        }
    })();

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
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accurIds: selectedCharges,
                })
            })
                .finally(() => {
                    toast.info("Начисления подтверждены")
                    setSelectedCharges([]);
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
                            <div className={`charges_table_item`} style={{ pointerEvents: (item.selected) && "none", opacity: (item.selected) && '0.5'}}>
                                <div className={`charges_table_item_select ${item.selected && 'confirmed'} ${!!selectedCharges.includes(item.id) && 'selected'}`} onClick={() => chargeHandler(item)}/>
                                <div>{item.accuralName}</div>
                                <div>{`${item.userFirstName} ${item.userLastName}`}</div>
                                <Tooltip text={item.referralName}><div>{item.referralName}</div></Tooltip>
                                <div>{item.accuralPercent}</div>
                                <div>{item.initialAmount  + ' / ' + item.initialAmountByn}</div>
                                <div>{item?.accuralAmountUSD + ' / ' + item.accuralAmount}</div>
                                <div>{new Date(item?.accuralDate).toLocaleDateString('ru')}</div>
                            </div>
                        )): <div className={`${DEFAULT_CLASSNAME}_table-empty`}>{"Начислений не совершалось"}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
