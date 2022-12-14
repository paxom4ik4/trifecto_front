import * as React from 'react';
import { useEffect, useState } from 'react';

import './marketing.scss';

import back from './assets/Subtract.png';

import start from './assets/start.png';
import classic from './assets/classic.png';
import premium from './assets/premium.png';
import rocket from './assets/rocket.svg';

import trifectaSmall from './assets/trifectaSmall.png';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'marketing';

export const Marketing = ({ currentPackage }) => {
    const navigate = useNavigate();
    const [packageToBuy, setPackageToBuy] = useState(null);

    const [agreement, setAgreement] = useState(false);
    const [agreement2, setAgreement2] = useState(false);

    const [CURRENT_CURRENCY, setCurrentCurrency] = useState(2.5);

    useEffect(() => {
        fetch("https://www.nbrb.by/api/exrates/rates/431")
            .then(res => res.json())
            .then(data => setCurrentCurrency(data.Cur_OfficialRate))
    }, [])

    // useEffect(() => {
    //     if ( currentPackage ) {
    //         navigate('/app');
    //     }
    // }, [currentPackage])

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
                    toast.success('?????????? ?????????????? ????????????????????');
                    navigate('/app');
                })
        }
    }

    const buyPackageHandlerCash = () => {
        const TOKEN = sessionStorage.getItem('accessToken');

        if (agreement && agreement2 && packageToBuy.price && packageToBuy.name && packageToBuy.id) {
            fetch("https://trifecta.by/api/Packages/BuyPackageByCash", {
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
                body: JSON.stringify({packageId: packageToBuy.id})
            })
                .finally(() => {
                    setPackageToBuy(null)
                    toast.success('???????????? ???? ???????????????????????? ???????????? ?????????????? ????????????????????');
                    navigate('/app');
                })
        }
    }

    (function() {
        function decimalAdjust(type, value, exp) {
            // ???????? ?????????????? ???? ????????????????????, ???????? ?????????? ????????...
            if (typeof exp === 'undefined' || +exp === 0) {
                return Math[type](value);
            }
            value = +value;
            exp = +exp;
            // ???????? ???????????????? ???? ???????????????? ????????????, ???????? ?????????????? ???? ???????????????? ?????????? ????????????...
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                return NaN;
            }
            // ?????????? ????????????????
            value = value.toString().split('e');
            value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
            // ???????????????? ??????????
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
        }

        // ???????????????????? ???????????????????? ?? ????????????????????
        if (!Math.round10) {
            Math.round10 = function(value, exp) {
                return decimalAdjust('round', value, exp);
            };
        }
        // ???????????????????? ???????????????????? ????????
        if (!Math.floor10) {
            Math.floor10 = function(value, exp) {
                return decimalAdjust('floor', value, exp);
            };
        }
        // ???????????????????? ???????????????????? ??????????
        if (!Math.ceil10) {
            Math.ceil10 = function(value, exp) {
                return decimalAdjust('ceil', value, exp);
            };
        }
    })();

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {
                packageToBuy &&
                <div className={`${DEFAULT_CLASSNAME}_modal_wrapper`}>
                    <div className={`${DEFAULT_CLASSNAME}_modal`}>
                        <div className={`${DEFAULT_CLASSNAME}_modal_close`} onClick={() => setPackageToBuy(null)}>{"x"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_title`}>{"???????????????????? ????????????"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_text`}>{"?????????? ????????????:"} <span>{Math.round10(+(packageToBuy.price * CURRENT_CURRENCY).toFixed(0), 1)}</span> {"??????. ??????."}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_text`}>{"??????????:"} <span>{packageToBuy.name}</span></div>

                        <div className={`${DEFAULT_CLASSNAME}_modal_agreement`}>
                            <input checked={agreement} onClick={() => setAgreement(!agreement)} type={"checkbox"} id={'agreement'} />
                            <label htmlFor={'agreement'}>
                                <div>{"?? ?????????????????????? ??"} <a href={'/app/info'}>???????????????? ????????????????</a> {"??"} <a href={'/app/info'}>?????????????????? ????????????</a> {"?? ???????????????? ???? ?????????? ??????????????????"}</div>
                            </label>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_agreement`}>
                            <input checked={agreement2} onClick={() => setAgreement2(!agreement2)} type={"checkbox"} id={'agreement'} />
                            <label htmlFor={'agreement'}>
                                <div>{"?? ?????????????????????? ?? ???????????????????????????????? (??????????????????????) ?????????????????????? ?? ???????????????? ?? ?????? ??????????????????"}</div>
                            </label>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_buy-title`}>{"???????????? ????????????:"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_btns`}>
                            <button disabled={!agreement || !agreement2} onClick={() => buyPackageHandlerCash()} className={`${DEFAULT_CLASSNAME}_modal_btn`} >{"??????????????????"}</button>
                            <button onClick={() => {}} disabled={true} className={`${DEFAULT_CLASSNAME}_modal_btn`} >{"????????????"}</button>
                        </div>

                        <img src={trifectaSmall} alt={'trifecta-buy'} />
                    </div>
                </div>
            }

            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"?????????? ????????"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <button disabled={['Mini', 'Start', 'Classic', 'Premium'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: "199", name: "mini", id: "52a45162-08ab-45ba-a94c-5db090806385"})}>{['Mini', 'Start', 'Classic', 'Premium'].includes(currentPackage?.name) ? "???????????? ?????????? ????????" : "????????????????????"}</button>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{"199$"}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={start} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"?????????? ??????????????"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Start Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <button disabled={['Start', 'Classic', 'Premium'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: "399", name: "??????????????", id: "00f1967f-a1f4-706d-7e57-453d605c4747"})}>{['Start', 'Classic', 'Premium'].includes(currentPackage?.name) ? "???????????? ?????????? ????????" : "????????????????????"}</button>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{"399$"}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={classic} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                        <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"?????????? ??????????????"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Level Bonus 50%"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Start Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Dynamic Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Auto Bonus ?? 7 ????????????"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <button disabled={['Classic', 'Premium'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: "1199", name: "??????????????", id: "3decbb76-bbc7-e035-e53c-ea10a3d54b16"})}>{['Classic', 'Premium'].includes(currentPackage?.name) ? "???????????? ?????????? ????????" : "????????????????????"}</button>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{"1199$"}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={premium} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"?????????? ??????????????"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Level Bonus 100%"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Start Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Dynamic Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Auto Bonus ?? 5 ????????????"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Bun Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Bonus Overall"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer bigger-margin`}>
                            <button disabled={['Premium'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: "2199", name: "??????????????", id: "0ff93d94-077f-ea49-34f0-3214704f5dbf"})}>{['Premium'].includes(currentPackage?.name) ? "????????????????????" : "????????????????????"}</button>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{"2199$"}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={rocket} alt={'item'} />
                    </div>
                </div>
            </div>
        </div>
    )
}