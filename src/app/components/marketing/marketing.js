import * as React from 'react';
import { useState } from 'react';

import './marketing.scss';

import back from './assets/Subtract.png';

import start from './assets/start.png';
import classic from './assets/classic.png';
import premium from './assets/premium.png';

import trifectaSmall from './assets/trifectaSmall.png';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'marketing';

export const Marketing = ({ currentPackage }) => {
    const navigate = useNavigate();
    const [packageToBuy, setPackageToBuy] = useState(null);

    const [agreement, setAgreement] = useState(false);

    const buyPackageHandler = () => {
        const TOKEN = sessionStorage.getItem('accessToken');

        if (agreement && packageToBuy.price && packageToBuy.name && packageToBuy.id) {
            fetch(`https://trifecta.by/api/Packages/BuyPackage`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify({ packageId: packageToBuy.id })
            })
                .finally(() => {
                    setPackageToBuy(null)
                    toast.success('Пакет успешно приобретен');
                    navigate('/app');
                })
        }
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {
                packageToBuy &&
                <div className={`${DEFAULT_CLASSNAME}_modal_wrapper`}>
                    <div className={`${DEFAULT_CLASSNAME}_modal`}>
                        <div className={`${DEFAULT_CLASSNAME}_modal_close`} onClick={() => setPackageToBuy(null)}>{"x"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_title`}>{"Оформление заказа"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_text`}>{"Сумма заказа:"} <span>{packageToBuy.price}</span> {"бел. руб."}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_text`}>{"Товар:"} <span>{packageToBuy.name}</span></div>

                        <div className={`${DEFAULT_CLASSNAME}_modal_agreement`}>
                            <input checked={agreement} onClick={() => setAgreement(!agreement)} type={"checkbox"} id={'agreement'} />
                            <label htmlFor={'agreement'}>
                                <div>{"Я ознакомился с"} <a href={'/app/info'}>Кодексом партнёра</a> {"и"} <a href={'/app/info'}>Партнёрским соглашением</a> {"и согласен со всеми условиями"}</div>
                            </label>
                        </div>

                        <a href={"https://web.rbsuat.com/ab/shortlink/mdGmv4Vu"} className={`${DEFAULT_CLASSNAME}_modal_btn`} >{"Приобрести"}</a>

                        <img src={trifectaSmall} alt={'trifecta-buy'} />
                    </div>
                </div>
            }

            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет СТАРТОВЫЙ"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Start Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Dynamic Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <button disabled={['Start', 'Classic', 'Premium'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: "500", name: "Пробный", id: "00f1967f-a1f4-706d-7e57-453d605c4747"})}>{['Start', 'Classic', 'Premium'].includes(currentPackage?.name) ? "Купите пакет выше" : "Приобрести"}</button>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{"199$"}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={start} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                        <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет КЛАССИК"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Level Bonus 50%"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Start Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Dynamic Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Auto Bonus с 7 уровня"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <button disabled={['Classic', 'Premium'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: "2.5к", name: "Классик", id: "3decbb76-bbc7-e035-e53c-ea10a3d54b16"})}>{['Classic', 'Premium'].includes(currentPackage?.name) ? "Купите пакет выше" : "Приобрести"}</button>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{"999$"}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={classic} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет ПРЕМИУМ"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Level Bonus 100%"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Start Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Dynamic Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Auto Bonus с 5 уровня"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Bun Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Bonus Overall"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <button disabled={['Premium'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: "4к", name: "Премиум", id: "0ff93d94-077f-ea49-34f0-3214704f5dbf"})}>{['Premium'].includes(currentPackage?.name) ? "Приобритён" : "Приобрести"}</button>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{"1999$"}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={premium} alt={'item'} />
                    </div>
                </div>
            </div>
        </div>
    )
}