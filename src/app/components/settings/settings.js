import * as React from 'react';
import { useEffect } from 'react';

import moment from 'moment';

import './settings.scss';

import password from './password.png';
import noMatch from './notMatch.png';

import photoUpload from './photoUpload.png';

import phone from './phone.png';
import email from './email.png';
import { useState } from "react";
import { toast } from "react-toastify";

import noPhoto from './noPhoto.png';

const DEFAULT_CLASSNAME = 'settings';

export const Settings = ({ userInfo }) => {

    console.log(userInfo);

    const [activeSection, setActiveSection] = useState("Профиль");

    const [uploadedFile, setUploadedFile] = useState(null);
    const [clearData, setClearData] = useState(0);

    const sections = ["Профиль", "Безопасность и вход", "Проверка документов"];

    const [dataChanges, setDataChanges] = useState(1);

    const [uploadedPhoto, setUploadedPhoto] = useState(null);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');

        if (uploadedFile) {
            fetch('https://trifecta.by/api/UserProfile/UploadProfilePhoto', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: uploadedFile,
            })
                .then(res => res.json())
                .then(data => setDataChanges(dataChanges))
                .finally(() => {
                    setUploadedFile(null);
                })
        }
    }, [uploadedFile]);

    const uploadUserPhoto = (event) => {
        const USER_ID = sessionStorage.getItem('userId');

        setUploadedPhoto(URL.createObjectURL(event.target.files[0]));

        const formData = new FormData();
        formData.append('ProfilePhoto', event.target.files[0]);
        formData.append('UserId', USER_ID);
        setUploadedFile(formData);
    }

    const Profile = () => {
        const dateOfBirth = moment(new Date(userInfo?.dateOfBirth)).format("DD / MM / YYYY");

        return (
            !!dataChanges && <div className={`${DEFAULT_CLASSNAME}_profile`}>
                <div className={`${DEFAULT_CLASSNAME}_profile_left`}>
                    <div className={`${DEFAULT_CLASSNAME}_profile_photo`}>
                        <div style={{ backgroundImage: userInfo?.profilePhoto ? `url(https://trifecta.by${userInfo?.profilePhoto})` : `url(${uploadedPhoto ? uploadedPhoto : noPhoto})` }} className={`${DEFAULT_CLASSNAME}_profile_photo_image`}></div>
                        <input type={'file'} alt={'profile-info'} onChange={(event) => uploadUserPhoto(event)}/>
                    </div>
                    {userInfo?.packageName &&
                        <div className={`${DEFAULT_CLASSNAME}_profile_referral`}>
                            <label htmlFor={'referral-link'}>{"Ссылка партнера"}</label>
                            <input disabled={true} value={userInfo?.packageName ? userInfo?.personalReferral : ""}
                                   type={'text'} id={'referral-link'}/>
                        </div>
                    }
                </div>
                <div className={`${DEFAULT_CLASSNAME}_profile_right`}>
                    <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                        <label htmlFor={'lastName'}>{"Фамилия"}</label>
                        <input disabled={true} value={userInfo?.lastName} type={"text"} id={"lastName"} />
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                        <label htmlFor={'firstName'}>{"Имя"}</label>
                        <input disabled={true} value={userInfo?.firstName} type={"text"} id={"firstName"} />
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                        <label htmlFor={'patronymic'}>{"Отчество"}</label>
                        <input disabled={true} value={userInfo?.patronymic} type={"text"} id={"patronymic"} />
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                        <label htmlFor={'birthDate'}>{"Дата Рождения"}</label>
                        <input disabled={true} value={dateOfBirth} type={"text"} id={"birthDate"} />
                    </div>
                </div>
            </div>
        )
    }

    const Security = ({ userInfo }) => {
        const USER_ID = sessionStorage.getItem('userId');
        const TOKEN = sessionStorage.getItem('accessToken');

        const [currentPassword, setCurrentPassword] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [newPasswordMatch, setNewPasswordMatch] = useState('');

        const [currentUserData, setCurrentUserData] = useState(null);

        useEffect(() => {
            fetch(`https://trifecta.by/api/UserProfile/GetProfileInfo?userId=${USER_ID}`, {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${TOKEN}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setCurrentUserData(data)
                });
        }, []);

        const currentHandler = (value) => {
            setCurrentPassword(value)
        }

        const newHandler = (value) => {
            setNewPassword(value)
        }

        const newMatchHandler = (value) => {
            setNewPasswordMatch(value)
        }

        const changePasswordHandler = () => {
            fetch(`https://trifecta.by/api/UserProfile/ChangePassword`, {
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
                referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({
                    "userId": USER_ID,
                    "oldPassword": currentPassword,
                    "newPassword": newPassword,
                    "confirmPassword": newPasswordMatch
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.oldPassword) {
                        toast.info("Пароль успешно сменен");
                    } else {
                        toast.error("Попробуйте ещё раз!")
                    }
                })
                .finally(() => {
                    setCurrentPassword('');
                    setNewPassword('');
                    setNewPasswordMatch('');
                })
        }

        const [newPhoneNumber, setNewPhoneNumber] = useState(userInfo?.phoneNumber || "");
        const [newEmail, setNewEmail] = useState(userInfo?.email || "");

        const changePhoneHandler = () => {
            fetch(`https://trifecta.by/api/UserProfile/UploadPhoneNumber`, {
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
                referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({
                    "userId": USER_ID,
                    "newPhoneNumber": newPhoneNumber,
                })
            })
                .then(res => res.json())
                .finally(() => {
                    toast.info("Запрос на изменение телефона отправлен")
                    setNewPhoneNumber('');
                })
        }

        const changeEmailHandler = () => {
            fetch(`https://trifecta.by/api/UserProfile/ChangeEmailAdress`, {
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
                referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({
                    "userId": USER_ID,
                    "newEmailAdress": newEmail,
                })
            })
                .then(res => res.json())
                .finally(() => {
                    toast.info("Запрос на изменения почты отправлен")
                    setNewEmail('');
                })
        }

        return (
            <div className={`${DEFAULT_CLASSNAME}_security`}>
                <div className={`${DEFAULT_CLASSNAME}_security_password`}>
                    <div className={`${DEFAULT_CLASSNAME}_security_password_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_security_password_title`}>{"Смена пароля"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'password'}>{"Текущий пароль"}</label>
                            <input value={currentPassword} onChange={(e) => currentHandler(e.currentTarget.value)} type={"password"} id={"password"} placeholder={'Введите текущий пароль...'} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'newPassword'}>{"Новый пароль"}</label>
                            <input value={newPassword} onChange={(e) => newHandler(e.currentTarget.value)} type={"password"} id={"newPassword"} placeholder={"Введите новый пароль..."} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'confirmPassword'}>{"Подтверждение пароля"}</label>
                            <input value={newPasswordMatch} onChange={(e) => newMatchHandler(e.currentTarget.value)} type={"password"} id={"confirmPassword"} placeholder={"Повторите новый пароль..."} />
                        </div>
                        <button disabled={!currentPassword.length >= 4 || newPassword.length < 8 || newPasswordMatch.length < 8 || newPassword !== newPasswordMatch} className={`${DEFAULT_CLASSNAME}_btn`} onClick={() => changePasswordHandler()}>{"Сменить пароль"}</button>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_security_password_right`}>
                        {newPassword.length >= 8 && newPasswordMatch.length >= 8 && (newPassword !== newPasswordMatch) && <img src={noMatch} alt={'noMatch'} /> || <img src={password} alt={'password'} />}
                        {newPassword.length >= 8 && newPasswordMatch.length >= 8 && (newPassword !== newPasswordMatch) && <div>{"Пароли не совпадают"}</div>}
                        {newPassword.length >= 8 && newPasswordMatch === newPassword && newPassword.match(/(?=.*[0-9])/g) && newPassword.match(/(?=.*[A-Z])/g) && !newPassword.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g) && <div>{"Хороший пароль"}</div>}
                        {newPassword.length >= 8 && newPasswordMatch === newPassword && newPassword.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g) && <div>{"Отличный пароль"}</div>}
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_security_contacts`}>
                    <div className={`${DEFAULT_CLASSNAME}_security_contacts_title`}>{"Контактные данные"}</div>
                    <div className={`${DEFAULT_CLASSNAME}_security_contacts_item`}>
                        <img className={'hide-small'} src={phone} alt={'phone'} />
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'phone'}>{"Номер телефона"}</label>
                            <input value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.currentTarget.value)} placeholder={"+375 (44) 999-99-99"} type={"phone"} id={"phone"} />
                        </div>
                        <button onClick={() => changePhoneHandler()} disabled={newPhoneNumber.length < 9} className={`${DEFAULT_CLASSNAME}_security_btn`}>{"Сменить номер"}</button>
                        <div className={'hide-small'}>{"Для смены контактных данных нажмите кнопку напротив данных требующих изменения и введите новые данные."}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_security_contacts_item`}>
                        <img className={'hide-small'} src={email} alt={'email'} />
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'email'}>{"Электронный адрес"}</label>
                            <input value={newEmail} onChange={(e) => setNewEmail(e.currentTarget.value)} placeholder={currentUserData?.email} type={"email"} id={"email"} />
                        </div>
                        <button onClick={() => changeEmailHandler()} disabled={!newEmail.includes('@')} className={`${DEFAULT_CLASSNAME}_security_btn`}>{"Сменить E-mail"}</button>
                        <div className={'hide-small'}>{"После прохождения модерации данные будут изменены."}</div>
                    </div>
                </div>
            </div>
        )
    }

    const Docs = iterable => {
        const [bankRegion, setBankRegion] = useState('');
        const [bankLocality, setBankLocality] = useState('');
        const [bankStreet, setBankStreet] = useState('');
        const [bankHouseNumber, setBankHouseNumber] = useState('');
        const [beneficiaryBankName, setBeneficiaryBankName] = useState('');
        const [checkingAccount, setCheckingAccount] = useState('');
        const [swift, setSwift] = useState('');
        const [UNP, setUNP] = useState('');

        const [liveObl, setLiveObl] = useState('');
        const [liveUlb, setLiveUlb] = useState('');
        const [liveNameB, setLiveNameB] = useState('');
        const [liveCity, setLiveCity] = useState('');
        const [liveDomB, setLiveDomB] = useState('');
        const [liveKV, setLiveKV] = useState('');

        const [legalEntityFullName, setLegalEntityFullName] = useState("")
        const [headFullName, setHeadFullName] = useState("")
        const [legalEntityAbbreviatedName, setLegalEntityAbbreviatedName] = useState("")
        const [headPosition, setHeadPosition] = useState("")
        const [unp, setUnp] = useState("")
        const [baseOrganization, setBaseOrganization] = useState("")
        const [accountantName, setAccountantName] = useState("")

        const [region, setRegion] = useState("");
        const [locality, setLocality] = useState("");
        const [index, setIndex] = useState("");
        const [street, setStreet] = useState("");
        const [houseNumber, setHouseNumber] = useState("");
        const [location, setLocation] = useState("");
        const [roomNumber, setRoomNumber] = useState("");

        const [eLegalEntityFullName, setELegalEntityFullName] = useState("")
        const [eHeadFullName, setEHeadFullName] = useState("")
        const [eLegalEntityAbbreviatedName, setELegalEntityAbbreviatedName] = useState("")
        const [eHeadPosition, setEHeadPosition] = useState("")
        const [eUnp, setEUnp] = useState("")
        const [eBaseOrganization, setEBaseOrganization] = useState("")
        const [eAccountantName, setEAccountantName] = useState("")

        const [certificateNumber, setCertificateNumber] = useState("");
        const [registrationAuthority, setRegistrationAuthority] = useState("");
        const [certificateDateIssue, setCertificateDateIssue] = useState("");

        const [passportNumber, setPassportNumber] = useState("");
        const [passportIdentityNumber, setPassportIdentityNumber] = useState("");
        const [passportRegistrationAuthority, setPassportRegistrationAuthority] = useState("");
        const [passportCertificateDateIssue, setPassportCertificateDateIssue] = useState("");

        const [userAlreadyUpload, setUserAlreadyUpload] = useState(false);
        const [userData, setUserData] = useState(null);

        const TOKEN = sessionStorage.getItem('accessToken');

        const [commonUNP, setCommonUNP] = useState('');

        useEffect(() => {
            setCommonUNP(UNP);
        }, [UNP])

        useEffect(() => {
            setCommonUNP(eUnp);
        }, [eUnp])

        useEffect(() => {
            setCommonUNP(unp);
        }, [unp])

        const [uploadedCert1, setUploadedCert1] = useState(null);
        const [uploadedCert2, setUploadedCert2] = useState(null);
        const [uploadedCert3, setUploadedCert3] = useState(null);

        const uploadCertificate = (event) => {
            setUploadedCert1(URL.createObjectURL(event.target.files[0]));

            const USER_ID = sessionStorage.getItem('userId');

            const formData = new FormData();
            formData.append('ProfilePhoto', event.target.files[0]);
            formData.append('UserId', USER_ID);

            fetch('https://trifecta.by/api/UserDocument/SendPhotoForVerification2', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: formData,
            })
                .finally(() => {
                    toast.info("Фото успешно загружено.")
                })
        }

        const uploadCertificate2 = (event) => {
            setUploadedCert2(URL.createObjectURL(event.target.files[0]));

            const USER_ID = sessionStorage.getItem('userId');

            const formData = new FormData();
            formData.append('ProfilePhoto', event.target.files[0]);
            formData.append('UserId', USER_ID);

            fetch('https://trifecta.by/api/UserDocument/SendPhotoForVerification3', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: formData,
            })
                .finally(() => {
                    toast.info("Фото успешно загружено.")
                })
        }

        const uploadCertificate3 = (event) => {
            setUploadedCert3(URL.createObjectURL(event.target.files[0]));

            const USER_ID = sessionStorage.getItem('userId');

            const formData = new FormData();
            formData.append('ProfilePhoto', event.target.files[0]);
            formData.append('UserId', USER_ID);

            fetch('https://trifecta.by/api/UserDocument/SendPhotoForVerification4', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: formData,
            })
                .finally(() => {
                    toast.info("Фото успешно загружено.")
                })
        }

        useEffect(() => {
            fetch(`https://trifecta.by/api/UserDocument/GetVerifiedData?userId=${USER_ID}`, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
            }).then(res => res.json())
                .then(data => {
                    if (!(data.success === false)) {
                        setUserData(data);
                    }
                });
        }, [])

        const [currentUserData, setCurrentUserData] = useState(null);

        useEffect(() => {
            fetch(`https://trifecta.by/api/UserProfile/GetProfileInfo?userId=${USER_ID}`, {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${TOKEN}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setCurrentUserData(data)
                });
        }, []);

        const passportData = <>
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Пасспортные данные"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Серия и номер пасспорта"}</label>
                            <input value={passportNumber} onChange={(e) => setPassportNumber(e.currentTarget.value)} type={"text"} id={"obl"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Идентификационный номер"}</label>
                            <input value={passportIdentityNumber} onChange={(e) => setPassportIdentityNumber(e.currentTarget.value)} type={"text"} id={"obl"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"УНП"}</label>
                            <input value={UNP} onChange={(e) => setUNP(e.currentTarget.value)} type={"text"} id={"unp"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Регистрационный орган"}</label>
                            <input value={passportRegistrationAuthority} onChange={(e) => setPassportRegistrationAuthority(e.currentTarget.value)} type={"text"} id={"obl"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Дата выдачи"}</label>
                            <input value={passportCertificateDateIssue} onChange={(e) => setPassportCertificateDateIssue(e.currentTarget.value)} type={"text"} id={"obl"} />
                        </div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_profile_item passport_upload`}>
                    <div>
                        <label >{"Ваше фото с паспортом"}</label>
                        <img src={uploadedCert1 ? uploadedCert1 : photoUpload} alt={'upload-photo'} />
                        <input className={'upload-photo-input'} type={"file"} onChange={(e) => uploadCertificate(e)}/>
                    </div>
                    <div>
                        <label >{"Фото 31 страницы"}</label>
                        <img src={uploadedCert2 ? uploadedCert2 : photoUpload} alt={'upload-photo'} />
                        <input className={'upload-photo-input'} type={"file"} onChange={(e) => uploadCertificate2(e)}/>
                    </div>
                    <div>
                        <label >{"Фото прописки"}</label>
                        <img src={uploadedCert3 ? uploadedCert3 : photoUpload} alt={'upload-photo'} />
                        <input className={'upload-photo-input'} type={"file"} onChange={(e) => uploadCertificate3(e)}/>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_profile_item upload_hint`}>{"*На всех фото информация должна быть видна и разборчива"}</div>
            </div>
        </>

        const docsBankInfo = <>
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Банковские реквизиты"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Область"}</label>
                            <input value={bankRegion} onChange={(e) => setBankRegion(e.currentTarget.value)} type={"text"} id={"obl"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Улица (банка)"}</label>
                            <input value={bankStreet} onChange={(e) => setBankStreet(e.currentTarget.value)} type={"text"} id={"ulB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Наименование банка получателя"}</label>
                            <input value={beneficiaryBankName} onChange={(e) => setBeneficiaryBankName(e.currentTarget.value)} type={"text"} id={"nameB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Номер счета"}</label>
                            <input value={checkingAccount} onChange={(e) => setCheckingAccount(e.currentTarget.value)} type={"text"} id={"nomS"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Город / Населенный пункт"}</label>
                            <input value={bankLocality} onChange={(e) => setBankLocality(e.currentTarget.value)} type={"text"} id={"city"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Дом (банка)"}</label>
                            <input value={bankHouseNumber} onChange={(e) => setBankHouseNumber(e.currentTarget.value)} type={"text"} id={"domB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"BIC/SWIFT"}</label>
                            <input value={swift} onChange={(e) => setSwift(e.currentTarget.value)} type={"text"} id={"bs"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>

        const liveAddress = <>
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Адрес проживания"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Область"}</label>
                            <input value={liveObl} onChange={(e) => setLiveObl(e.currentTarget.value)} type={"text"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label >{"Индекс"}</label>
                            <input value={liveUlb} onChange={(e) => setLiveUlb(e.currentTarget.value)} type={"text"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label >{"Дом"}</label>
                            <input value={liveNameB} onChange={(e) => setLiveNameB(e.currentTarget.value)} type={"text"} />
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label >{"Город / Населенный пункт"}</label>
                            <input value={liveCity} onChange={(e) => setLiveCity(e.currentTarget.value)} type={"text"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label >{"Улица"}</label>
                            <input value={liveDomB} onChange={(e) => setLiveDomB(e.currentTarget.value)} type={"text"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Квартира"}</label>
                            <input value={liveKV} onChange={(e) => setLiveKV(e.currentTarget.value)} type={"text"} />
                        </div>
                    </div>
                </div>
            </div>
        </>

        const legalData = <>
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Юридические данные"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Полное наименование ИП"}</label>
                            <input value={legalEntityFullName} onChange={(e) => setLegalEntityFullName(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Сокращенное наименование ИП"}</label>
                            <input value={legalEntityAbbreviatedName} onChange={(e) => setLegalEntityAbbreviatedName(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"УНП"}</label>
                            <input value={unp} onChange={(e) => setUnp(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"ФИО бухгалтера"}</label>
                            <input value={accountantName} onChange={(e) => setAccountantName(e.currentTarget.value)} type={"text"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"ФИО"}</label>
                            <input value={headFullName} onChange={(e) => setHeadFullName(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Должность руководителя"}</label>
                            <input value={headPosition} onChange={(e) => setHeadPosition(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"На основании чего действует"}</label>
                            <input value={baseOrganization} onChange={(e) => setBaseOrganization(e.currentTarget.value)} type={"text"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>

        const evidenceData = <>
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Данные свидетельства"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Номер свидетельства"}</label>
                            <input value={certificateNumber} onChange={(e) => setCertificateNumber(e.currentTarget.value)} type={"text"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label >{"Дата выдачи свидетельства"}</label>
                            <input value={certificateDateIssue} onChange={(e) => setCertificateDateIssue(e.currentTarget.value)} type={"text"} />
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label >{"Регистрирующий орган"}</label>
                            <input value={registrationAuthority} onChange={(e) => setRegistrationAuthority(e.currentTarget.value)} type={"text"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label >{"Фото свидетельства"}</label>
                            <img src={photoUpload} alt={'upload-photo'} />
                            <input className={'upload-photo-input'} type={"file"} onChange={(e) => uploadCertificate(e)}/>
                        </div>
                    </div>
                </div>
            </div>
        </>

        const legalAddress = <>
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Юридический адресс"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Область"}</label>
                            <input value={region} onChange={(e) => setRegion(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Индекс"}</label>
                            <input value={index} onChange={(e) => setIndex(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Дом"}</label>
                            <input value={houseNumber} onChange={(e) => setHouseNumber(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Тип помещения"}</label>
                            <input value={locality} onChange={(e) => setLocality(e.currentTarget.value)} type={"text"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Город / Населенный пункт"}</label>
                            <input value={location} onChange={(e) => setLocation(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Улица"}</label>
                            <input value={street} onChange={(e) => setStreet(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Номер помещения"}</label>
                            <input value={roomNumber} onChange={(e) => setRoomNumber(e.currentTarget.value)} type={"text"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>

        const evidenceDataEvi = <>
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Юридические данные"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Полное наименование юр. лица"}</label>
                            <input value={eLegalEntityFullName} onChange={(e) => setELegalEntityFullName(e.currentTarget.value)} type={"text"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Сокращенное наименование юр. лица"}</label>
                            <input value={eLegalEntityAbbreviatedName} onChange={(e) => setELegalEntityAbbreviatedName(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"УНП"}</label>
                            <input value={eUnp} onChange={(e) => setEUnp(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"ФИО бухгалтера"}</label>
                            <input value={eAccountantName} onChange={(e) => setEAccountantName(e.currentTarget.value)} type={"text"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"ФИО Руководителя"}</label>
                            <input value={eHeadFullName} onChange={(e) => setEHeadFullName(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"Должность руководителя"}</label>
                            <input value={eHeadPosition} onChange={(e) => setEHeadPosition(e.currentTarget.value)} type={"text"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label>{"На основании чего действует"}</label>
                            <input value={eBaseOrganization} onChange={(e) => setEBaseOrganization(e.currentTarget.value)} type={"text"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>

        const individual = <>
            {passportData}
            {docsBankInfo}
            {liveAddress}
        </>

        const individualEntrepreneur = <>
            {legalData}
            {evidenceData}
            {docsBankInfo}
            {legalAddress}
        </>

        const legalEntity = <>
            {evidenceDataEvi}
            {evidenceData}
            {docsBankInfo}
            {legalAddress}
        </>

        const [currentType, setCurrentType] = useState('Физическое лицо');
        const [currentCountry, setCurrentCountry] = useState('Беларусь');

        useEffect(() => {
            setCurrentCountry(currentCountry);
        }, [currentType]);

        const USER_ID = sessionStorage.getItem('userId');

        const getCurrentCountryCode = () => {
            switch(currentCountry) {
                case "Беларусь": return 1;
                case "Россия": return 2;
                case "Казахстан": return 3;
            }
        }

        const getCurrentType = () => {
            switch (currentType) {
                case "Физическое лицо": return 1;
                case "ИП": return 2;
                case "Юридическое лицо": return 3;
            }
        }

        const docsForVerification = {
            userId: USER_ID,
            country: getCurrentCountryCode(),
            employmentType: getCurrentType(),
            documentVerificationModels: {
                legalDataModel: {
                    legalEntityFullName: eLegalEntityFullName || legalEntityFullName,
                    headFullName: eHeadFullName || headFullName,
                    legalEntityAbbreviatedName: eLegalEntityAbbreviatedName || legalEntityAbbreviatedName,
                    headPosition: eHeadPosition || headPosition,
                    unp: commonUNP,
                    baseOrganization: eBaseOrganization || baseOrganization,
                    accountantName: eAccountantName || accountantName,
                },
                witnessDataModel: {
                    certificateNumber: certificateNumber,
                    registrationAuthority: registrationAuthority,
                    certificateDateIssue: certificateDateIssue
                },
                bankRequestModel: {
                    bankRegion: bankRegion,
                    bankLocality: bankLocality,
                    bankStreet: bankStreet,
                    bankHouseNumber: bankHouseNumber,
                    beneficiaryBankName: beneficiaryBankName,
                    checkingAccount: checkingAccount,
                    swift: swift,
                },
                legallyAddressModel: {
                    region: region,
                    locality: locality,
                    index: index,
                    street: street,
                    houseNumber: houseNumber,
                    location: location,
                    roomNumber: roomNumber,
                },
                personalAddressModel: {
                    district: liveObl,
                    city: liveCity,
                    index: liveUlb,
                    street: liveDomB,
                    houseNumber: liveNameB,
                    flat: liveKV,
                },
                passportDataModel: {
                    number: passportNumber,
                    identityNumber: passportIdentityNumber,
                    registrationAuthority: passportRegistrationAuthority,
                    certificateDateIssue: passportCertificateDateIssue,
                },
            }
        };

        const verifyHandler = () => {
            const TOKEN = sessionStorage.getItem('accessToken');

            if (currentType === "Физическое лицо") {
                if (!passportNumber.length || !passportIdentityNumber.length || !passportRegistrationAuthority.length || !passportCertificateDateIssue.length) {
                    toast.info('Заполните пасспортные данные.');
                    return;
                }

                if (!liveObl.length || !liveCity.length || !liveUlb.length || !liveDomB.length || !liveNameB.length || !liveKV.length) {
                    toast.info('Заполните Адресс Проживания.');
                    return;
                }

                if (!bankRegion.length || !bankLocality.length || !bankStreet.length || !bankHouseNumber.length || !beneficiaryBankName.length || !checkingAccount.length || !swift.length) {
                    toast.info('Заполните Банковские реквезиты');
                    return;
                }
            }

            if (currentType === "ИП") {
                if (!legalEntityFullName.length || !headFullName.length || !legalEntityAbbreviatedName.length || !headPosition.length || !unp.length || !baseOrganization.length || !accountantName.length) {
                    toast.info('Заполните Юридические данные.');
                    return;
                }

                if (!certificateNumber.length || !registrationAuthority.length || !certificateDateIssue.length) {
                    toast.info('Заполните данные свидетельства.');
                    return;
                }

                if (!region.length || !locality.length || !index.length || !street.length || !houseNumber.length || !roomNumber.length) {
                    toast.info('Заполните юридический адресс.');
                    return;
                }

                if (!bankRegion.length || !bankLocality.length || !bankStreet.length || !bankHouseNumber.length || !beneficiaryBankName.length || !checkingAccount.length || !swift.length) {
                    toast.info('Заполните Банковские реквезиты');
                    return;
                }
            }

            if (currentType === "Юридическое лицо") {
                if (!eLegalEntityFullName.length || !eHeadFullName.length || !eLegalEntityAbbreviatedName.length || !eHeadPosition.length || !eUnp.length || !eBaseOrganization.length || !eAccountantName.length) {
                    toast.info('Заполните Юридические данные.');
                    return;
                }

                if (!certificateNumber.length || !registrationAuthority.length || !certificateDateIssue.length) {
                    toast.info('Заполните данные свидетельства.');
                    return;
                }

                if (!region.length || !locality.length || !index.length || !street.length || !houseNumber.length || !roomNumber.length) {
                    toast.info('Заполните юридический адресс.');
                    return;
                }

                if (!bankRegion.length || !bankLocality.length || !bankStreet.length || !bankHouseNumber.length || !beneficiaryBankName.length || !checkingAccount.length || !swift.length) {
                    toast.info('Заполните Банковские реквезиты');
                    return;
                }
            }

            fetch('https://trifecta.by/api/UserDocument/SendDataForVerification', {
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
                body: JSON.stringify(docsForVerification)
            }).then(res => res.json())
                .finally(() => {
                    toast.success("Данные отправлены на верификацию!");
                    setClearData(clearData + 1);
                })
        }

        let abjArr;

        if (userData) {
            abjArr = Object.entries(userData);
        }

        let uploadImage, uploadImage2, uploadImage3;

        if (userData) {
            uploadImage = userData?.image;
            uploadImage2 = userData?.image2;
            uploadImage3 = userData?.image3;
        }

        const translateUserData = {
            "region": "Регион",
            "locality": "Населенный пункт",
            "bankStreet": "Улица (банка)",
            "bankHouseNumber": "Номер дома (банка)",
            "beneficiaryBankName": "Название банка",
            "checkingAccount": "Номер счета",
            "swift": "SWIFT",
            "disctrict": "Район",
            "city": "Город",
            "index": "Индекс",
            "street": "Улица",
            "houseNumber": "Номер дома",
            "flat": "Квартира",
            "number": "Номер пасспорта",
            "identityNumber": "Идентификационный номер",
            "registrationAuthority": "Регистрирующий орган",
            "certificateDateIssue": "Срок действия документа",
        }

        return (
            <div className={`${DEFAULT_CLASSNAME}_documents`}>
                {(currentType === "Физическое лицо" && !!uploadImage && !!uploadImage2 && !!uploadImage3) && userData ?
                    <>
                        <div className={`${DEFAULT_CLASSNAME}_documents_header`}>{"Список документов"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_documents_verified`} style={{ fontSize: "16px", color: currentUserData?.isVerifiedUser ? "green" : "red"}}>{currentUserData?.isVerifiedUser ? "Документы подтверждены" : "Документы на верификации"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_documents_list`}>
                            {abjArr.map(([key, value]) => {
                                return ["image", "image2", "image3"].includes(key) ? <div style={{ flexDirection: "column"}} className={`${DEFAULT_CLASSNAME}_documents_list_item`}><span>Фото документа</span><img src={`https://trifecta.by${value}`}/></div> : <div className={`${DEFAULT_CLASSNAME}_documents_list_item`}>{translateUserData[key]} : {value}</div>
                            })}
                        </div>
                    </> :
                    <>
                        <div className={`${DEFAULT_CLASSNAME}_documents_header`}>
                            <select onChange={(e) => setCurrentType(e.currentTarget.value)}>
                                <option value={"Физическое лицо"}>{`${currentCountry !== "Беларусь" ? "Физическое лицо" : "НПД"}`}</option>
                                <option>ИП</option>
                                <option>Юридическое лицо</option>
                            </select>
                            <select onChange={(e) => setCurrentCountry(e.currentTarget.value)}>
                                <option defaultChecked={true}>Беларусь</option>
                                <option>Россия</option>
                                <option>Казахстан</option>
                            </select>
                        </div>
                        {currentType === "Физическое лицо" && individual}
                        {currentType === "ИП" && individualEntrepreneur}
                        {currentType === "Юридическое лицо" && legalEntity}
                        <button disabled={userAlreadyUpload} className={`${DEFAULT_CLASSNAME}_btn`} onClick={() => verifyHandler()}>{userAlreadyUpload ? "Документы на верификации" : "Отправить на верификацию"}</button>
                    </>
                }
            </div>
        )
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Настройки"}</div>
                <div className={`${DEFAULT_CLASSNAME}_sections`}>
                    {sections.map(item =>
                        <div
                            className={`${DEFAULT_CLASSNAME}_sections_item ${item === activeSection && 'active'}`}
                            onClick={() => setActiveSection(item)}
                        >
                            {item}
                        </div>)
                    }
                </div>
                {activeSection === "Профиль" && <Profile />}
                {activeSection === "Безопасность и вход" && <Security userInfo={userInfo} />}
                {activeSection === "Проверка документов" && <Docs />}
            </div>
        </div>
    )
}
