import * as React from 'react';
import { useEffect, useState } from 'react';

import './marketing.scss';

import back from './assets/Subtract.png';

import start from './assets/start.png';
import classic from './assets/classic.png';
import premium from './assets/premium.png';
import rocket from './assets/rocket.png';
import crypto from './assets/crypto.png';
import exclusive from './assets/exclisuve.png';

import trifectaSmall from './assets/trifectaSmall.png';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'marketing';

export const Marketing = ({ currentPackage, hasCryptoPackage }) => {
    const navigate = useNavigate();
    const [packageToBuy, setPackageToBuy] = useState(null);
    const [showDangerScreen, setShowDangerScreen] = useState(false);

    const [agreement, setAgreement] = useState(false);
    const [agreement2, setAgreement2] = useState(false);

    const [CURRENT_CURRENCY, setCurrentCurrency] = useState(2.5);

    const [packagesInfo, setPackagesInfo] = useState(null);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch("https://www.nbrb.by/api/exrates/rates/431")
            .then(res => res.json())
            .then(data => setCurrentCurrency(data.Cur_OfficialRate))

        fetch("https://trifecta.by/api/Packages/GetPackages", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
        }).then(res => res.json())
          .then(data => setPackagesInfo(data));
    }, [])

    // const buyPackageHandler = () => {
    //     const TOKEN = sessionStorage.getItem('accessToken');
    //
    //     if (agreement && packageToBuy.price && packageToBuy.name && packageToBuy.id) {
    //         fetch(`https://trifecta.by/api/Packages/BuyPackage`, {
    //             method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //             mode: 'cors', // no-cors, *cors, same-origin
    //             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //             credentials: 'same-origin', // include, *same-origin, omit
    //             redirect: 'follow', // manual, *follow, error
    //             referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${TOKEN}`
    //             },
    //             body: JSON.stringify({ packageId: packageToBuy.id })
    //         })
    //             .finally(() => {
    //                 setPackageToBuy(null)
    //                 toast.success('Пакет успешно приобретен');
    //                 navigate('/app');
    //             })
    //     }
    // }

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
                    toast.success('Заявка на приобритение пакета успешно отправлена');
                    navigate('/app');
                })
        }
    }

    if(!packagesInfo) {
        return (
          <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
              <div className={`${DEFAULT_CLASSNAME}_loading`}>{"Loading..."}</div>
          </div>
        )
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {
                showDangerScreen &&
                <div className={`${DEFAULT_CLASSNAME}_modal_wrapper`}>
                    <div className={`${DEFAULT_CLASSNAME}_modal confirm_modal`}>
                        <div className={`${DEFAULT_CLASSNAME}_modal_title`}>
                            {packageToBuy.name === "Crypto" && <><div>{"Этот момент можно считать"}</div> <br/> <div>{"точкой отсчета твоего пути в крипте"}</div></>}
                            {packageToBuy.name !== "Crypto" && <><div>{"Без труда, не вытянешь"}</div> <br/> <div>{"рыбку из пруда"}</div></>}
                        </div>
                        {packageToBuy.name !== "Crypto" && <div className={`${DEFAULT_CLASSNAME}_modal_text`}>{"Участие в партнерской (бонусной) программе не гарантирует 100% доход. Ваш успех зависит только от вас."}</div>}

                        <div className={`${DEFAULT_CLASSNAME}_modal_btns`}>
                            <button onClick={() => {
                                buyPackageHandlerCash();
                                setShowDangerScreen(false);
                            }} className={`${DEFAULT_CLASSNAME}_modal_btn`} >{"ПОДТВЕРДИТЬ"}</button>
                            <button onClick={() => {
                                setAgreement(false)
                                setAgreement2(false)
                                setPackageToBuy(null);
                                setShowDangerScreen(false);
                            }} className={`${DEFAULT_CLASSNAME}_modal_btn`} >{"ОТМЕНА"}</button>
                        </div>

                        <img src={trifectaSmall} alt={'trifecta-buy'} />
                    </div>
                </div>
            }

            {
                !showDangerScreen && packageToBuy &&
                <div className={`${DEFAULT_CLASSNAME}_modal_wrapper`}>
                    <div className={`${DEFAULT_CLASSNAME}_modal`}>
                        <div className={`${DEFAULT_CLASSNAME}_modal_close`} onClick={() => setPackageToBuy(null)}>{"x"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_title`}>{"Оформление заказа"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_text`}>{"Сумма заказа:"} <span>{Math.round((+(packageToBuy.price) * CURRENT_CURRENCY) / 5) * 5}</span> {"бел. руб."}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_text`}>{"Товар:"} <span>{packageToBuy.name}</span></div>

                        <div className={`${DEFAULT_CLASSNAME}_modal_agreement`}>
                            <input checked={agreement} onClick={() => setAgreement(!agreement)} type={"checkbox"} id={'agreement'} />
                            <label htmlFor={'agreement'}>
                                <div>{"Я ознакомился с"} <a target={"_blank"} href={"https://trifecta.by/trifecto_Documents/Codex.pdf"}>Кодексом партнёра</a> {"и"} <a target={"_blank"} href={"https://trifecta.by/trifecto_Documents/Marketing.pdf"}>Маркетинг планом</a> {"и согласен со всеми условиями"}</div>
                            </label>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_agreement`}>
                            <input checked={agreement2} onClick={() => setAgreement2(!agreement2)} type={"checkbox"} id={'agreement2'} />
                            <label htmlFor={'agreement2'}>
                                <div>{"Я ознакомился с"} <a href={"https://trifecta.by/trifecto_Documents/Sogl.pdf"} target={"_blank"}>Партнёрским соглашением</a> {" и согласен с его условиями"}</div>
                            </label>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_buy-title`}>{"Способ оплаты:"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_modal_btns`}>
                            <button disabled={!agreement || !agreement2} onClick={() => setShowDangerScreen(true)} className={`${DEFAULT_CLASSNAME}_modal_btn`} >{"НАЛИЧНЫМИ"}</button>
                            <button onClick={() => {}} disabled={true} className={`${DEFAULT_CLASSNAME}_modal_btn`} >{"КАРТОЙ"}</button>
                        </div>

                        <img src={trifectaSmall} alt={'trifecta-buy'} />
                    </div>
                </div>
            }

            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет Мини"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <button disabled={['Mini', 'Start', 'Classic', 'Premium'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: packagesInfo[0].price, name: "mini", id: "52a45162-08ab-45ba-a94c-5db090806385"})}>{['Mini', 'Start', 'Classic', 'Premium'].includes(currentPackage?.name) ? "Купите пакет выше" : "Приобрести"}</button>
                            {!['Mini', 'Start', 'Classic', 'Premium'].includes(currentPackage?.name) && <div className={`${DEFAULT_CLASSNAME}_item_price`}>{`${packagesInfo[0]?.price} $`}</div>}
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={start} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет Пробный"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Start Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <button disabled={['Start', 'Classic', 'Premium', 'Exclusive'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: packagesInfo[1].price, name: "Пробный", id: "00f1967f-a1f4-706d-7e57-453d605c4747"})}>{['Start', 'Classic', 'Premium'].includes(currentPackage?.name) ? "Купите пакет выше" : "Приобрести"}</button>
                            {!['Start', 'Classic', 'Premium', 'Exclusive'].includes(currentPackage?.name) && <div className={`${DEFAULT_CLASSNAME}_item_price`}>{`${packagesInfo[1]?.price} $`}</div>}
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={classic} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                        <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет Классик"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Level Bonus 50%"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Start Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Dynamic Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Auto Bonus с 7 уровня"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer`}>
                            <button disabled={['Classic', 'Premium', 'Exclusive'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: packagesInfo[2].price, name: "Классик", id: "3decbb76-bbc7-e035-e53c-ea10a3d54b16"})}>{['Classic', 'Premium'].includes(currentPackage?.name) ? "Купите пакет выше" : "Приобрести"}</button>
                            {!['Classic', 'Premium', 'Exclusive'].includes(currentPackage?.name) && <div className={`${DEFAULT_CLASSNAME}_item_price`}>{`${packagesInfo[2]?.price} $`}</div>}
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={premium} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет Премиум"}</div>
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
                        <div className={`${DEFAULT_CLASSNAME}_item_footer bigger-margin`}>
                            <button disabled={['Premium', 'Exclusive'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: packagesInfo[3].price, name: "Премиум", id: "0ff93d94-077f-ea49-34f0-3214704f5dbf"})}>{['Premium'].includes(currentPackage?.name) ? "Приобритён" : "Приобрести"}</button>
                            {!['Premium', 'Exclusive'].includes(currentPackage?.name) && <div className={`${DEFAULT_CLASSNAME}_item_price`}>{`${packagesInfo[3]?.price} $`}</div>}
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={rocket} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет Эксклюзив"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Team Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Level Bonus 150%"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Start Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Dynamic Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Auto Bonus с 5 уровня"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Travel Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Bun Bonus"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Bonus Overall"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer bigger-margin`}>
                            <button disabled={['Exclusive'].includes(currentPackage?.name)} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: packagesInfo[4].price, name: "Эксклюзив", id: "3928d50f-8aae-4403-b10d-6b1da398e601"})}>{['Exclusive'].includes(currentPackage?.name) ? "Приобритён" : "Приобрести"}</button>
                            {!['Exclusive'].includes(currentPackage?.name) && <div className={`${DEFAULT_CLASSNAME}_item_price`}>{`${packagesInfo[4]?.price} $`}</div>}
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={exclusive} alt={'item'} />
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img className={`${DEFAULT_CLASSNAME}_item_background`} src={back} alt={'back'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_content`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пакет Crypto"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_description`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_description-item`}>{"Программа обучения"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_item_footer bigger-margin`}>
                            <button disabled={hasCryptoPackage} className={`${DEFAULT_CLASSNAME}_item_buy`} onClick={() => setPackageToBuy({ price: packagesInfo[5].price, name: "Crypto", id: "6f0b68dc-f55a-4e76-a9a0-f056d5ba814b"})}>{hasCryptoPackage ? "Приобритён" : "Приобрести"}</button>
                            <div className={`${DEFAULT_CLASSNAME}_item_price`}>{`${packagesInfo[5]?.price} $`}</div>
                        </div>
                        <img className={`${DEFAULT_CLASSNAME}_item_image`} src={crypto} alt={'item'} />
                    </div>
                </div>
            </div>
        </div>
    )
}
