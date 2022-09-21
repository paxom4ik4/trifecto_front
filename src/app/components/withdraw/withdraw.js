import * as React from 'react';

import './withdraw.scss';
import {useEffect, useState} from "react";

const DEFAULT_CLASSNAME = 'withdraw';

export const Withdraw = () => {
    const [withdraws, setWithdraws] = useState([]);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch('https://trifecta-web-api.herokuapp.com/api/Withdraw/GetWithdrawHistory?id=176d64e0-4f8c-4aea-ade1-783dabd1bbc6', {
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
            <div className={`trifecta-app_content_cabinet_withdraw`}>
                <div className={`trifecta-app_withdraw_card`}>
                    <div className={`trifecta-app_withdraw_card_title`}>{"Доступно к выводу"}</div>
                    <div className={`trifecta-app_withdraw_card_amount`}>{"4578.91$"}</div>
                    <div className={`trifecta-app_withdraw_card_sub-amount`}>{"11905.17 BYN"}</div>
                    <div className={`trifecta-app_withdraw_card_withdraw`}>{"Вывести"}</div>
                </div>
                <div className={`trifecta-app_withdraw_card`}>
                    <div className={`trifecta-app_withdraw_card_title`}>{"Ожидает начисления"}</div>
                    <div className={`trifecta-app_withdraw_card_amount`}>{"138.40$"}</div>
                    <div className={`trifecta-app}_withdraw_card_sub-amount`}>{"359.84 BYN"}</div>
                </div>
                <div className={`trifecta-app_withdraw_card`}>
                    <div className={`trifecta-app_withdraw_card_title`}>{"Доход за всё время"}</div>
                    <div className={`trifecta-app_withdraw_card_amount`}>{"4578.91$"}</div>
                    <div className={`trifecta-app_withdraw_card_sub-amount`}>{"11905.17 BYN"}</div>
                </div>
            </div>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_header`}>
                    <div className={`${DEFAULT_CLASSNAME}_header_title`}>{"Выводы"}</div>
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
                    <div className={`${DEFAULT_CLASSNAME}_table_header`}>
                        <div>{"Счёт на который производился вывод средств"}</div>
                        <div>{"СТАТУС"}</div>
                        <div>{"СУММА"}</div>
                        <div>{"ДАТА и время"}</div>
                    </div>
                    {withdraws.map(item => (
                        <div className={`${DEFAULT_CLASSNAME}_table_item`}>
                            <div>{item.cardCode}</div>
                            <div>{item.status}</div>
                            <div>{item.amount}</div>
                            <div>{item.dateTime.slice(0, 10)}</div>
                        </div>
                    ))}
                    {withdraws.map(item => (
                        <div className={`${DEFAULT_CLASSNAME}_table_item`}>
                            <div>{item.cardCode}</div>
                            <div>{item.status}</div>
                            <div>{item.amount}</div>
                            <div>{item.dateTime.slice(0, 10)}</div>
                        </div>
                    ))}
                    {withdraws.map(item => (
                        <div className={`${DEFAULT_CLASSNAME}_table_item`}>
                            <div>{item.cardCode}</div>
                            <div>{item.status}</div>
                            <div>{item.amount}</div>
                            <div>{item.dateTime.slice(0, 10)}</div>
                        </div>
                    ))}
                    {withdraws.map(item => (
                        <div className={`${DEFAULT_CLASSNAME}_table_item`}>
                            <div>{item.cardCode}</div>
                            <div>{item.status}</div>
                            <div>{item.amount}</div>
                            <div>{item.dateTime.slice(0, 10)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}