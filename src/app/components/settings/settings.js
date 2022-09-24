import * as React from 'react';

import './settings.scss';

import noPhoto from './noPhoto.png';
import password from './password.png';
import noMatch from './notMatch.png';

import photoUpload from './photoUpload.png';

import phone from './phone.png';
import email from './email.png';
import {useState} from "react";

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
                        <div className={`${DEFAULT_CLASSNAME}_btn`}>{"Сменить пароль"}</div>
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
                            <input placeholder={"+375 (44) 999-99-99"} type={"phone"} id={"phone"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_security_btn`}>{"Сменить номер"}</div>
                        <div>{"Для смены контактных данных нажмите кнопку напротив данных требующих изменения и введите новые данные."}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_security_contacts_item`}>
                        <img src={email} alt={'email'} />
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'email'}>{"Электронный адрес"}</label>
                            <input placeholder={"qwerty@gmail.com"} type={"email"} id={"email"} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_security_btn`}>{"Сменить E-male"}</div>
                        <div>{"После прохождения модерации данные будут изменены."}</div>
                    </div>
                </div>
            </div>
        )
    }

    const [bankRegion, setBankRegion] = useState('');
    const [bankLocality, setBankLocality] = useState('');
    const [bankStreet, setBankStreet] = useState('');
    const [bankHouseNumber, setBankHouseNumber] = useState('');
    const [beneficiaryBankName, setBeneficiaryBankName] = useState('');
    const [checkingAccount, setCheckingAccount] = useState('');
    const [swift, setSwift] = useState('');


    const Docs = () => {
        const DocsBankInfo = () => (
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Банковские реквизиты"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'obl'}>{"Область"}</label>
                            <input type={"text"} id={"obl"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'ulB'}>{"Улица (банка)"}</label>
                            <input type={"text"} id={"ulB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'nameB'}>{"Наименование банка получателя"}</label>
                            <input type={"text"} id={"nameB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'nomS'}>{"Номер счета"}</label>
                            <input type={"text"} id={"nomS"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'city'}>{"Город / Населенный пункт"}</label>
                            <input type={"text"} id={"city"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'domB'}>{"Дом (банка)"}</label>
                            <input type={"text"} id={"domB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'bs'}>{"BIC/SWIFT"}</label>
                            <input type={"text"} id={"bs"}/>
                        </div>
                    </div>
                </div>
            </div>
        )

        const LiveAddress = () => (
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Адрес проживания"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'obl'}>{"Область"}</label>
                            <input type={"text"} id={"obl"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'ulB'}>{"Индекс"}</label>
                            <input type={"text"} id={"ulB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'nameB'}>{"Дом"}</label>
                            <input type={"text"} id={"nameB"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'city'}>{"Город / Населенный пункт"}</label>
                            <input type={"text"} id={"city"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'domB'}>{"Улица"}</label>
                            <input type={"text"} id={"domB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'bs'}>{"Квартира"}</label>
                            <input type={"text"} id={"bs"}/>
                        </div>
                    </div>
                </div>
            </div>
        )

        const LegalData = () => (
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Юридические данные"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'obl'}>{"Полное наименование ИП"}</label>
                            <input type={"text"} id={"obl"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'ulB'}>{"Сокращенное наименование ИП"}</label>
                            <input type={"text"} id={"ulB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'nameB'}>{"УНП"}</label>
                            <input type={"text"} id={"nameB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'nameB'}>{"ФИО бухгалтера"}</label>
                            <input type={"text"} id={"nameB"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'city'}>{"ФИО"}</label>
                            <input type={"text"} id={"city"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'domB'}>{"Должность руководителя"}</label>
                            <input type={"text"} id={"domB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'bs'}>{"На основании чего действует"}</label>
                            <input type={"text"} id={"bs"}/>
                        </div>
                    </div>
                </div>
            </div>
        )

        const EvidenceData = () => (
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Данные свидетельства"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'obl'}>{"Номер свидетельства"}</label>
                            <input type={"text"} id={"obl"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'ulB'}>{"Дата выдачи свидетельства"}</label>
                            <input type={"text"} id={"ulB"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'city'}>{"Регистрирующий орган"}</label>
                            <input type={"text"} id={"city"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'bs'}>{"Фото свидетельства"}</label>
                            <img src={photoUpload} alt={'upload-photo'} />
                            <input className={'upload-photo-input'} type={"file"} id={"bs"}/>
                        </div>
                    </div>
                </div>
            </div>
        )

        const LegalAddress = () => (
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Юридический адресс"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'obl'}>{"Область"}</label>
                            <input type={"text"} id={"obl"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'ulB'}>{"Индекс"}</label>
                            <input type={"text"} id={"ulB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'nameB'}>{"Дом"}</label>
                            <input type={"text"} id={"nameB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'nameB'}>{"Тип помещения"}</label>
                            <input type={"text"} id={"nameB"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'city'}>{"Город / Населенный пункт"}</label>
                            <input type={"text"} id={"city"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'domB'}>{"Улица"}</label>
                            <input type={"text"} id={"domB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'bs'}>{"Номер помещения"}</label>
                            <input type={"text"} id={"bs"}/>
                        </div>
                    </div>
                </div>
            </div>
        )

        const EvidenceDataEvi = () => (
            <div className={`${DEFAULT_CLASSNAME}_documents_item`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_title`}>{"Юридические данные"}</div>
                <div className={`${DEFAULT_CLASSNAME}_documents_content`}>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'obl'}>{"Полное наименование юр. лица"}</label>
                            <input type={"text"} id={"obl"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'ulB'}>{"Сокращенное наименование юр. лица"}</label>
                            <input type={"text"} id={"ulB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'nameB'}>{"УНП"}</label>
                            <input type={"text"} id={"nameB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'nameB'}>{"ФИО бухгалтера"}</label>
                            <input type={"text"} id={"nameB"}/>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_documents_item_right`}>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'city'}>{"ФИО Руководителя"}</label>
                            <input type={"text"} id={"city"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'domB'}>{"Должность руководителя"}</label>
                            <input type={"text"} id={"domB"}/>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'bs'}>{"На основании чего действует"}</label>
                            <input type={"text"} id={"bs"}/>
                        </div>
                    </div>
                </div>
            </div>
        )

        const individual = (<>
            <DocsBankInfo />
            <LiveAddress />
        </>)

        const individualEntrepreneur = (<>
            <LegalData />
            <EvidenceData />
            <DocsBankInfo />
            <LegalAddress />
        </>)

        const legalEntity = (<>
            <EvidenceDataEvi />
            <EvidenceData />
            <DocsBankInfo />
            <LegalAddress />
        </>)

        const [currentType, setCurrentType] = useState('Физическое лицо');

        const USER_ID = sessionStorage.getItem('userId');

        const docsForVerification = {
            userId: USER_ID,
            country: 1,
            employmentType: 1,
            documentVerificationModels: {
                legalDataModel: {
                    legalEntityFullName: "string",
                    headFullName: "string",
                    legalEntityAbbreviatedName: "string",
                    headPosition: "string",
                    unp: "string",
                    baseOrganization: "string",
                    accountantName: "string"
                },
                witnessDataModel: {
                    certificateNumber: "string",
                    registrationAuthority: "string",
                    certificateDateIssue: "2022-09-24T15:00:20.743Z"
                },
                bankRequestModel: {
                    bankRegion: "string",
                    bankLocality: "string",
                    bankStreet: "string",
                    bankHouseNumber: "string",
                    beneficiaryBankName: "string",
                    checkingAccount: "string",
                    swift: "string"
                },
                legallyAddressModel: {
                    region: "string",
                    locality: "string",
                    index: "string",
                    street: "string",
                    houseNumber: "string",
                    location: 1,
                    roomNumber: "string"
                },
                personalAddressModel: {
                    district: "string",
                    city: "string",
                    index: "string",
                    street: "string",
                    houseNumber: "string",
                    flat: "string"
                }
            }
        };

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
                {currentType === "Физическое лицо" && individual}
                {currentType === "ИП" && individualEntrepreneur}
                {currentType === "Юридическое лицо" && legalEntity}
                <div className={`${DEFAULT_CLASSNAME}_btn`}>{"Отправить на верификацию"}</div>
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