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
                toast.success("???????????? ???? ?????????? ?????????????? ????????????");
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
        "??????????????": "Accept",
        "?? ??????????????????": "Pending",
        "??????????????????": "Failed",
        "???????????? ?? ????????????": "ReadyForWithdraw",
    }

    const translateObj2 = {
        "Accept": "??????????????",
        "Pending": "?? ??????????????????",
        "Failed": "??????????????????",
        "ReadyForWithdraw": "???????????? ?? ????????????",
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {userData ? <>
                <div className={`trifecta-app_content_cabinet_withdraw`}>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"???????????????? ?? ????????????"}</div>
                        <div className={`trifecta-app_withdraw_card_amount`}>{(userData?.availableForWithdrawal.toFixed(2) / CURRENT_CURRENCY.toFixed(2)).toFixed(2) + "$" || "0"}</div>
                        <div className={`trifecta-app_withdraw_card_sub-amount`}>{userData?.availableForWithdrawal.toFixed(2) + " BYN" || "0"}</div>
                        <div className={`trifecta-app_withdraw_card_withdraw`}>{"??????????????"}</div>
                    </div>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"?????????????? ????????????????????"}</div>
                        <div className={`trifecta-app_withdraw_card_amount`}>{(userData?.awaitingAccrual.toFixed(2) / CURRENT_CURRENCY.toFixed(2)).toFixed(2) + "$"}</div>
                        <div className={`trifecta-app}_withdraw_card_sub-amount`}>{userData?.awaitingAccrual.toFixed(2) + " BYN"}</div>
                    </div>
                    <div className={`trifecta-app_withdraw_card`}>
                        <div className={`trifecta-app_withdraw_card_title`}>{"?????????? ???? ?????? ??????????"}</div>
                        <div className={`trifecta-app_withdraw_card_amount`}>{(userData?.allTimeIncome.toFixed(2) / CURRENT_CURRENCY.toFixed(2)).toFixed(2) + "$"}</div>
                    </div>
                </div>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_header`}>
                    <div className={`${DEFAULT_CLASSNAME}_header_title`}>
                        <div>{"?????????????? ????????????????????"}</div>
                        <p>{"???????????? ?? ???????????? ???????????????????? ???????????????????? ?????????? 14 ????????*"}</p>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_header_controls`}>
                        <div>
                            <label htmlFor={'status'}>{"????????????"}</label>
                            <select onChange={(e) => setTransactionStatus(e.currentTarget.value === "??????" ? null : translateObj[e.currentTarget.value])} id={"status"}>
                                <option>{"??????"}</option>
                                <option value={"??????????????"}>{"??????????????"}</option>
                                <option value={"??????????????????"}>{"??????????????????"}</option>
                                <option value={"?? ??????????????????"}>{"?? ??????????????????"}</option>
                                <option value={"???????????? ?? ????????????"}>{"???????????? ?? ????????????"}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_table`}>
                    <div className={`charges_table_header`}>
                        <div>{""}</div>
                        <div>{"???????????????? ????????????????????"}</div>
                        <div>{"???? ????????"}</div>
                        <div>{"%"}</div>
                        <div>{"????????????"}</div>
                        <div>{"???????????????? ?????????? ($ / BYN)"}</div>
                        <div>{"?? ???????????????????? ($ / BYN)"}</div>
                        <div>{"????????"}</div>
                    </div>
                    {withdraws.length ? withdraws.map(item => (
                        <div className={`charges_table_item`} style={ !item.isAvailable && { pointerEvents: "none", opacity: '0.5'}}>
                                <div className={`charges_table_item_select ${!!selectedCharges.includes(item.id) && 'selected'} ${item.transactionStatus === 'Accept' && 'alreadyWithdraw selected'}`} onClick={() => chargeHandler(item)}/>
                            <div>{item.accuralName}</div>
                            <div>{item.referralName}</div>
                            <div>{item.accuralPercent}</div>
                            <div>{translateObj2[item.transactionStatus]}</div>
                            <div>{item.initialAmount + '/' + (item.initialAmount * CURRENT_CURRENCY).toFixed(1)}</div>
                            <div>{item.accuralAmount.toFixed(0) + '/' + (item.accuralAmount * CURRENT_CURRENCY).toFixed(1)}</div>
                            <div>{item.accuralDate.slice(0, 10)}</div>
                        </div>
                    )): <div className={`${DEFAULT_CLASSNAME}_table-empty`}>{"???????????????????? ???? ??????????????????????"}</div>}
                </div>
                {!!selectedCharges.length && <div onClick={() => isVerified ? withdrawCharges() : navigate('/app/settings')} className={`charges_withdraw`}>{isVerified ? "?????????????? ??????????????????" : "?????? ???????????? ?????????????? ?????????????????? ??????????????????????"}</div>}
            </div> </> : <div className={`trifecta-app_loading`}>{"Loading..."}</div>}
        </div>
    )
}