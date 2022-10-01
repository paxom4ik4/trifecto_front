import * as React from 'react';

import './verification.scss';
import {useEffect, useState} from "react";

const DEFAULT_CLASSNAME = 'verification';

export const Verification = () => {
    const [verificationList, setVerificationList] = useState([]);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem("accessToken");

        fetch(`https://trifecta-web-api.herokuapp.com/api/Administrator/GetDocumentVerificationList`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setVerificationList(data));
    }, [])

    const GetUserInfo = ({ user }) => {
        const [userData, setUserData] = useState(null);

        const TOKEN = sessionStorage.getItem("accessToken");

        useEffect(() => {
            fetch(`https://trifecta-web-api.herokuapp.com/api/UserDocument/GetVerifiedData?userId=${user.userId}`, {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${TOKEN}`
                }
            })
                .then(res => res.json())
                .then(data => setUserData(data));
        }, []);

        return (
            <div className={`${DEFAULT_CLASSNAME}_item`}>
                <div className={`${DEFAULT_CLASSNAME}_item_default`}>
                    <div>{"Илларион"}</div>
                    <div>{"Василевский"}</div>
                    <div>{"user@gmail.com"}</div>
                    <div>{"+375 (44) 777-77-77"}</div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item_status`}>
                    <div>{""}</div>
                    <div>{""}</div>
                    <div>{""}</div>
                    <div>{""}</div>
                </div>
            </div>
        )
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Верификация"}</div>
                <div className={`${DEFAULT_CLASSNAME}_list`}>
                    {verificationList.length ? verificationList.map(item => <GetUserInfo user={item} />) : <div>{"Нет запросов на верификацию"}</div>}
                </div>
            </div>
        </div>
    )
}