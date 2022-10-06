import * as React from 'react';

import './contactInfo.scss';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const DEFAULT_CLASSNAME = 'contact-info';

export const ContactInfo = () => {
    const [contactList, setContactList] = useState([]);
    const [dataChanged, setDataChanged] = useState(0);

    const TOKEN = sessionStorage.getItem("accessToken");

    useEffect(() => {
        fetch(`https://trifecta.by/api/Administrator/GetUserContactsVerivicationList`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setContactList(data));
    }, [dataChanged])

    const verifyChange = (requestId, userId) => {
        fetch(`https://trifecta.by/api/Administrator/AcceptUserContactVerification?requestId=${requestId}&userId=${userId}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })
            .then(res => res.json())
            .finally(() => {
                toast.info('Смена данных подтверждена');
                setDataChanged(dataChanged + 1);
            })
    }

    const rejectChange = (requestId, userId) => {
        fetch(`https://trifecta.by/api/Administrator/RejectUserContactVerification?requestId=${requestId}&userId=${userId}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })
            .then(res => res.json())
            .finally(() => {
                toast.info('Смена данных отклонена');
                setDataChanged(dataChanged + 1);
            })
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Изменение контактых данных"}</div>
                <div className={`${DEFAULT_CLASSNAME}_list`}>
                    {contactList.length ? contactList.map(item => {
                        return (
                            <div className={`${DEFAULT_CLASSNAME}_item`}>
                                <div className={`verification_item_controls`}>
                                    <button className={`verification_item_controls_approve`} onClick={() => verifyChange(item?.requestId, item?.userId)}>{"Подтвердить"}</button>
                                    <button className={`verification_item_controls_reject`} onClick={() => rejectChange(item?.requestId, item?.userId)}>{"Отказать"}</button>
                                </div>
                                <div className={`${DEFAULT_CLASSNAME}_item_minWidth`}>
                                    <div>{item?.firstName}</div>
                                    <div>{item?.lastName}</div>
                                    <br />
                                    <div>{item?.emailAddress}</div>
                                    <div>{item?.phoneNumber}</div>
                                </div>
                                <div className={`${DEFAULT_CLASSNAME}_item_minWidth`}>
                                    <div>{"Изменение почты на:"}</div>
                                    <div>{item?.newData}</div>
                                    <br />
                                    <div>{"Изменение номера на:"}</div>
                                    <div>{item?.newData}</div>
                                </div>
                            </div>
                        )
                    }) : <div>{"Нет запросов на смену контактных данных"}</div>}
                </div>
            </div>
        </div>
    )
}