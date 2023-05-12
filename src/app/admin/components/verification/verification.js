import * as React from 'react';

import './verification.scss';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const DEFAULT_CLASSNAME = 'verification';

export const Verification = () => {
    const [verificationList, setVerificationList] = useState([]);
    const [dataChanges, setDataChanged] = useState(0);

    const verifyPerson = (userId, requestId) => {
        const TOKEN = sessionStorage.getItem("accessToken");

        fetch(`https://trifecta.by/api/Administrator/AcceptUserVerification?requestId=${requestId}&userId=${userId}`, {
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
                toast.info("Данный пользователь подтвержден");
                setDataChanged(dataChanges + 1)
            })
    }

    const rejectPerson = (userId, requestId) => {
        const TOKEN = sessionStorage.getItem("accessToken");

        fetch(`https://trifecta.by/api/Administrator/RejectUserVerification?requestId=${requestId}&userId=${userId}`, {
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
                toast.info("Данный пользователь отклонен")
                setDataChanged(dataChanges + 1)
            });
    }

    useEffect(() => {
        const TOKEN = sessionStorage.getItem("accessToken");

        fetch(`https://trifecta.by/api/Administrator/GetDocumentVerificationList`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setVerificationList(data));
    }, [dataChanges])

    const getPersonStatus = (status) => {
        switch (status) {
            case 'LegalEntity': return 'НПД';
            case 'IndividualEntity': return 'Юр. лицо';
            case 'IndividualEntrepreneur': return 'ИП';
        }
    }

    const GetUserInfo = ({ user }) => {
        const [userData, setUserData] = useState(null);

        const TOKEN = sessionStorage.getItem("accessToken");

        useEffect(() => {
            fetch(`https://trifecta.by/api/UserDocument/GetVerifiedData?userId=${user.userId}`, {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${TOKEN}`
                }
            })
                .then(res => res.json())
                .then(data => setUserData(data));
        }, []);

        const [photoFullSize, setPhotoFullSize] = useState(false);
        const [photoFullSize2, setPhotoFullSize2] = useState(false);
        const [photoFullSize3, setPhotoFullSize3] = useState(false);

        return (
            <div className={`${DEFAULT_CLASSNAME}_item`}>
                <div className={`${DEFAULT_CLASSNAME}_item_controls`}>
                    <button className={`${DEFAULT_CLASSNAME}_item_controls_approve`} onClick={() => verifyPerson(user?.userId, user?.requestId)}>{"Подтвердить"}</button>
                    <button className={`${DEFAULT_CLASSNAME}_item_controls_reject`} onClick={() => rejectPerson(user?.userId, user?.requestId)}>{"Отказать"}</button>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_item_default`}>
                        <div className={'colored'}>{user?.name}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_email`}>{user?.email}</div>
                        <div>{user?.phoneNumber || "+375 (44) 777-77-77"}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item_status`}>
                        <div>{"Статус лица"}</div>
                        <div>{getPersonStatus(user?.typeOfEmployment)}</div>
                        <br />
                        <div>{"Идентификационный номер"}</div>
                        <div>{user?.identityNumber}</div>
                    </div>
                    {(!user?.number || user?.certificateDateIssue) && <div className={`${DEFAULT_CLASSNAME}_item_account`}>
                        <>
                            <div>{"Дата выдачи паспорта"}</div>
                            <div>{user?.certificateDateIssue}</div>
                        </>
                        <br />
                        <>
                            <div>{"Серия и номер пасспорта"}</div>
                            <div>{user?.number}</div>
                        </>
                    </div>}
                    {(userData?.checkingAccount || user?.checkingAccount) && <div className={`${DEFAULT_CLASSNAME}_item_account`}>
                        {userData?.headFullName && <>
                            <div>{"Полное наименование"}</div>
                            <div>{userData?.headFullName}</div>
                            <br />
                        </>
                        }
                        <div>{"Номер счета"}</div>
                        <div>{userData?.checkingAccount || user?.checkingAccount}</div>
                        <br/>
                        <div>{"BIC/SWIFT"}</div>
                        <div>{userData?.swift || user?.swift}</div>
                    </div>}
                    {user?.verivicationPhoto && <div className={`${DEFAULT_CLASSNAME}_item_photo`}>
                        {photoFullSize &&
                            <div className={`${DEFAULT_CLASSNAME}_photoFullSize`}>
                                <img className={photoFullSize && 'photo-full-size'}
                                     onClick={() => setPhotoFullSize(!photoFullSize)}
                                     src={`https://trifecta.by${user?.verivicationPhoto}`}/>
                            </div>
                        }
                        <img onClick={() => setPhotoFullSize(!photoFullSize)} src={`https://trifecta.by${user?.verivicationPhoto}`}/>
                    </div>}
                    {userData?.unp && <div className={`${DEFAULT_CLASSNAME}_item_svid`}>
                        {userData?.certificateNumber && <>
                            <div>{"На основании"}</div>
                            <div>{userData?.certificateNumber && "Свидетельства"}</div>
                        </>
                        }
                        <br />
                        <div>{"УНП"}</div>
                        <div>{userData?.unp}</div>
                    </div>}
                    {userData?.registrationAuthority && <div className={`${DEFAULT_CLASSNAME}_item_svid`}>
                        {userData?.certificateNumber && <>
                            <div>{"Регистрирующий орган"}</div>
                            <div>{userData?.registrationAuthority}</div>
                        </>
                        }
                        <br />
                        <div>{"Номер свидетельства"}</div>
                        <div>{userData?.certificateNumber}</div>
                    </div>}
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item_photos`}>
                    <img className={photoFullSize && "photo-full-size"} onClick={() => setPhotoFullSize(!photoFullSize)} src={`https://trifecta.by${user?.verivicationPhoto2}`} alt={'/'} />
                    <img className={photoFullSize2 && "photo-full-size"} onClick={() => setPhotoFullSize(!photoFullSize2)} src={`https://trifecta.by${user?.verivicationPhoto3}`} alt={'/'} />
                    <img className={photoFullSize3 && "photo-full-size"} onClick={() => setPhotoFullSize(!photoFullSize3)} src={`https://trifecta.by${user?.verivicationPhoto4}`} alt={'/'} />
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