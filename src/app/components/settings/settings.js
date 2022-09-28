import * as React from 'react';
import { memo } from 'react';

import './settings.scss';

import noPhoto from './noPhoto.png';
import password from './password.png';
import noMatch from './notMatch.png';

import photoUpload from './photoUpload.png';

import phone from './phone.png';
import email from './email.png';
import {useMemo, useState} from "react";

const DEFAULT_CLASSNAME = 'settings';

export const Settings = ({ userInfo }) => {

    const [activeSection, setActiveSection] = useState("Профиль");

    const sections = ["Профиль", "Безопасность и вход", "Проверка документов"];

    const Profile = () => {
        return (
            <div className={`${DEFAULT_CLASSNAME}_profile`}>
                <div className={`${DEFAULT_CLASSNAME}_profile_left`}>
                    <img src={noPhoto} alt={""}/>
                    <div className={`${DEFAULT_CLASSNAME}_profile_referral`}>
                        <label htmlFor={'referral-link'}>{"Ссылка партнера"}</label>
                        <input disabled={true} value={userInfo?.personalReferral} type={'text'} id={'referral-link'} />
                    </div>
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
                        <input disabled={true} value={new Date(userInfo?.dateOfBirth)} type={"text"} id={"birthDate"} />
                    </div>
                </div>
            </div>
        )
    }

    const Security = () => {
        const [currentPassword, setCurrentPassword] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [newPasswordMatch, setNewPasswordMatch] = useState('');

        const currentHandler = (value) => {
            setCurrentPassword(value)
        }

        const newHandler = (value) => {
            setNewPassword(value)
        }

        const newMatchHandler = (value) => {
            setNewPasswordMatch(value)
        }

        const USER_ID = sessionStorage.getItem('userId');
        const TOKEN = sessionStorage.getItem('accessToken');

        const changePasswordHandler = () => {
            fetch(`http://trifecta.by:5000/api/UserProfile/ChangePassword`, {
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
                .finally(() => {
                    setCurrentPassword('');
                    setNewPassword('');
                    setNewPasswordMatch('');
                })
        }

        const [newPhoneNumber, setNewPhoneNumber] = useState("");
        const [newEmail, setNewEmail] = useState("");

        const changePhoneHandler = () => {
            fetch(`http://trifecta.by:5000/api/UserProfile/UploadPhoneNumber`, {
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
                    setNewPhoneNumber('');
                })
        }

        const changeEmailHandler = () => {
            fetch(`http://trifecta.by:5000/api/UserProfile/ChangeEmailAdress`, {
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
                        {newPassword.length >= 8 && newPasswordMatch.length >= 8 && (newPassword !== newPasswordMatch) && <div>{"Пароли не совпадают"}</div> || newPassword.length >= 8 && <div>{"Хороший пароль"}</div>}
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_security_contacts`}>
                    <div className={`${DEFAULT_CLASSNAME}_security_contacts_title`}>{"Контактные данные"}</div>
                    <div className={`${DEFAULT_CLASSNAME}_security_contacts_item`}>
                        <img src={phone} alt={'phone'} />
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'phone'}>{"Номер телефона"}</label>
                            <input value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.currentTarget.value)} placeholder={"+375 (44) 999-99-99"} type={"phone"} id={"phone"} />
                        </div>
                        <button onClick={() => changePhoneHandler()} disabled={newPhoneNumber.length < 9} className={`${DEFAULT_CLASSNAME}_security_btn`}>{"Сменить номер"}</button>
                        <div>{"Для смены контактных данных нажмите кнопку напротив данных требующих изменения и введите новые данные."}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_security_contacts_item`}>
                        <img src={email} alt={'email'} />
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'email'}>{"Электронный адрес"}</label>
                            <input value={newEmail} onChange={(e) => setNewEmail(e.currentTarget.value)} placeholder={"qwerty@gmail.com"} type={"email"} id={"email"} />
                        </div>
                        <button onClick={() => changeEmailHandler()} disabled={!newEmail.includes('@')} className={`${DEFAULT_CLASSNAME}_security_btn`}>{"Сменить E-male"}</button>
                        <div>{"После прохождения модерации данные будут изменены."}</div>
                    </div>
                </div>
            </div>
        )
    }

    const Docs = () => {
        const [bankRegion, setBankRegion] = useState('');
        const [bankLocality, setBankLocality] = useState('');
        const [bankStreet, setBankStreet] = useState('');
        const [bankHouseNumber, setBankHouseNumber] = useState('');
        const [beneficiaryBankName, setBeneficiaryBankName] = useState('');
        const [checkingAccount, setCheckingAccount] = useState('');
        const [swift, setSwift] = useState('');

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


        const [error, setError] = useState(null);

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
                            <input className={'upload-photo-input'} type={"file"}/>
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

        const USER_ID = sessionStorage.getItem('userId');

        const docsForVerification = {
            userId: USER_ID,
            country: '1',
            employmentType: '1',
            documentVerificationModels: {
                legalDataModel: {
                    legalEntityFullName: eLegalEntityFullName || legalEntityFullName,
                    headFullName: eHeadFullName || headFullName,
                    legalEntityAbbreviatedName: eLegalEntityAbbreviatedName || legalEntityAbbreviatedName,
                    headPosition: eHeadPosition || headPosition,
                    unp: eUnp || unp,
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
                    location: 1,
                    roomNumber: roomNumber,
                },
                personalAddressModel: {
                    district: liveObl,
                    city: liveCity,
                    index: liveUlb,
                    street: liveDomB,
                    houseNumber: liveNameB,
                    flat: liveKV,
                }
            }
        };

        const verifyHandler = () => {
            const TOKEN = sessionStorage.getItem('accessToken');

            if (currentType === "Физическое лицо") {
                if (!liveObl.length || !liveCity.length || !liveUlb.length || !liveDomB.length || !liveNameB.length || !liveKV.length) {
                    setError('Заполните Адресс Проживания.');
                    return;
                }

                if (!bankRegion.length || !bankLocality.length || !bankStreet.length || !bankHouseNumber.length || !beneficiaryBankName.length || !checkingAccount.length || !swift.length) {
                    setError('Заполните Банковские реквезиты');
                    return;
                }
            }

            if (currentType === "ИП") {
                if (!legalEntityFullName.length || !headFullName.length || !legalEntityAbbreviatedName.length || !headPosition.length || !unp.length || !baseOrganization.length || !accountantName.length) {
                    setError('Заполните Юридические данные.');
                    return;
                }

                if (!certificateNumber.length || !registrationAuthority.length || !certificateDateIssue.length) {
                    setError('Заполните данные свидетельства.');
                    return;
                }

                if (!region.length || !locality.length || !index.length || !street.length || !houseNumber.length || roomNumber.length) {
                    setError('Заполните юридический адресс.');
                    return;
                }

                if (!bankRegion.length || !bankLocality.length || !bankStreet.length || !bankHouseNumber.length || !beneficiaryBankName.length || !checkingAccount.length || !swift.length) {
                    setError('Заполните Банковские реквезиты');
                    return;
                }
            }

            if (currentType === "Юридическое лицо") {
                if (!eLegalEntityFullName.length || !eHeadFullName.length || !eLegalEntityAbbreviatedName.length || !eHeadPosition.length || !eUnp.length || !eBaseOrganization.length || !eAccountantName.length) {
                    setError('Заполните Юридические данные.');
                    return;
                }

                if (!certificateNumber.length || !registrationAuthority.length || !certificateDateIssue.length) {
                    setError('Заполните данные свидетельства.');
                    return;
                }

                if (!region.length || !locality.length || !index.length || !street.length || !houseNumber.length || roomNumber.length) {
                    setError('Заполните юридический адресс.');
                    return;
                }

                if (!bankRegion.length || !bankLocality.length || !bankStreet.length || !bankHouseNumber.length || !beneficiaryBankName.length || !checkingAccount.length || !swift.length) {
                    setError('Заполните Банковские реквезиты');
                    return;
                }
            }

            setError(null);

            fetch('http://trifecta.by:5000/api/UserDocument/SendDataForVerification', {
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
            }).then(res => res.json());
        }

        return (
            <div className={`${DEFAULT_CLASSNAME}_documents`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_header`}>
                    <select onChange={(e) => setCurrentType(e.currentTarget.value)}>
                        <option>Физическое лицо</option>
                        <option>ИП</option>
                        <option>Юридическое лицо</option>
                    </select>
                    <select disabled={true}>
                        <option defaultChecked={true}>Беларусь</option>
                    </select>
                </div>
                <div>{error}</div>
                {currentType === "Физическое лицо" && individual}
                {currentType === "ИП" && individualEntrepreneur}
                {currentType === "Юридическое лицо" && legalEntity}
                <div className={`${DEFAULT_CLASSNAME}_btn`} onClick={() => verifyHandler()}>{"Отправить на верификацию"}</div>
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
                {activeSection === "Безопасность и вход" && <Security />}
                {activeSection === "Проверка документов" && <Docs />}
            </div>
        </div>
    )
}