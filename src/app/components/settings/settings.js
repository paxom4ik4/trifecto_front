import * as React from 'react';

import './settings.scss';

import noPhoto from './noPhoto.png';
import password from './password.png';

import phone from './phone.png';
import email from './email.png';
import {useState} from "react";

const DEFAULT_CLASSNAME = 'settings';

export const Settings = () => {

    const [activeSection, setActiveSection] = useState("Профиль");

    const sections = ["Профиль", "Безопасность и вход", "Проверка документов"];

    const Profile = () => {
        return (
            <div className={`${DEFAULT_CLASSNAME}_profile`}>
                <div className={`${DEFAULT_CLASSNAME}_profile_left`}>
                    <img src={noPhoto} alt={""}/>
                    <div className={`${DEFAULT_CLASSNAME}_profile_referral`}>
                        <label htmlFor={'referral-link'}>{"Ссылка партнера"}</label>
                        <input type={'text'} id={'referral-link'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_profile_right`}>
                    <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                        <label htmlFor={'lastName'}>{"Фамилия"}</label>
                        <input type={"text"} id={"lastName"} />
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                        <label htmlFor={'firstName'}>{"Имя"}</label>
                        <input type={"text"} id={"firstName"} />
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                        <label htmlFor={'patronymic'}>{"Отчество"}</label>
                        <input type={"text"} id={"patronymic"} />
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                        <label htmlFor={'birthDate'}>{"Дата рождения"}</label>
                        <input type={"text"} id={"birthDate"} />
                    </div>
                </div>
            </div>
        )
    }

    const Security = () => {
        return (
            <div className={`${DEFAULT_CLASSNAME}_security`}>
                <div className={`${DEFAULT_CLASSNAME}_security_password`}>
                    <div className={`${DEFAULT_CLASSNAME}_security_password_left`}>
                        <div className={`${DEFAULT_CLASSNAME}_security_password_title`}>{"Смена пароля"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'password'}>{"Текущий пароль"}</label>
                            <input type={"password"} id={"password"} placeholder={'Введите текущий пароль...'} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'newPassword'}>{"Новый пароль"}</label>
                            <input type={"password"} id={"newPassword"} placeholder={"Введите новый пароль..."} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_profile_item`}>
                            <label htmlFor={'confirmPassword'}>{"Подтверждение пароля"}</label>
                            <input type={"password"} id={"confirmPassword"} placeholder={"Повторите новый пароль..."} />
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_btn`}>{"Сменить пароль"}</div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_security_password_right`}>
                        <img src={password} alt={'password'} />
                        <div>{"Отличный пароль"}</div>
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

    const Docs = () => {
        return (
            <div className={`${DEFAULT_CLASSNAME}_documents`}>
                <div className={`${DEFAULT_CLASSNAME}_documents_header`}>
                    <select>
                        <option>Физическое лицо</option>
                        <option>ИП</option>
                        <option>Юридическое лицо</option>
                    </select>
                    <select>
                        <option>Беларусь</option>
                        <option>Россия</option>
                        <option>Казахстан</option>
                    </select>
                </div>
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