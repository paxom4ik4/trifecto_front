import React, {useEffect, useState} from 'react';

import './additional-charges.scss';
import {toast} from "react-toastify";

const DEFAULT_CLASSNAME = 'additional-charges';

export const AdditionalCharges = () => {
  const [partnerEmail, setPartnerEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [chargeDate, setChargeDate] = useState(null);
  const [bonusId, setBonusId] = useState(null);

  const [additionalCharges, setAdditionalCharges] = useState([]);

  useEffect(() => {
    const TOKEN = sessionStorage.getItem('accessToken');

    fetch(`https://trifecta.by/api/Administrator/GetAdminWithdraw`, {
      method: "GET",
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${TOKEN}`,
      },
    }).then(res => res.json()).then(data => setAdditionalCharges(data));
  }, [])

  const confirmAdditionalCharge = (e) => {
    const TOKEN = sessionStorage.getItem('accessToken');

    e.preventDefault();

    const date = new Date(chargeDate);

    if (bonusId && partnerEmail && amount) {
      fetch(`https://trifecta.by/api/Administrator/MakeAdminWithdraw`, {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': "application/json"
        },
        method: "POST",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'origin',
        body: JSON.stringify({
          BonusId: bonusId,
          UserEmail: partnerEmail,
          WithdrawAmount: Number(amount),
          CreatedDate: date.toISOString(),
        }),
      }).then(res => res.json()).finally(() => {
        setBonusId(null);
        setAmount(0);
        setChargeDate(null);
        setPartnerEmail("");

        toast.info("Доначисление добавлено");
      })
    }
  }

  return (
    <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
      <div className={`${DEFAULT_CLASSNAME}`}>
        <div className={`${DEFAULT_CLASSNAME}_title`}>Доначисления</div>

        <div className={`${DEFAULT_CLASSNAME}_panel`}>
          <select className={`${DEFAULT_CLASSNAME}_panel_bonus`} onChange={(e) => setBonusId(e.currentTarget.value === "null" ? null : e.currentTarget.value)}>
            <option value={"null"} defaultChecked={true}>Выберите бонус</option>
            <option selected={bonusId === "0f494531-c1ed-4165-86ba-89fd50a20fa1"} value={"0f494531-c1ed-4165-86ba-89fd50a20fa1"}>Sale Travel</option>
            <option selected={bonusId === "a35856d7-af1f-409a-9148-4babcb28bc3c"} value={"a35856d7-af1f-409a-9148-4babcb28bc3c"}>Sale Event</option>
          </select>
          <div className={`${DEFAULT_CLASSNAME}_panel_input`} style={{ width: "28%" }}>
            <label>Почта партнёра</label>
            <input style={{ width: "80%" }} placeholder={"Введите почту"} value={partnerEmail} onChange={(e) => setPartnerEmail(e.currentTarget.value)} type={"text"} />
          </div>
          <div className={`${DEFAULT_CLASSNAME}_panel_input`}>
            <label>Сумма продажи, $</label>
            <input type={"number"} value={amount} onChange={(e) => setAmount(e.currentTarget.value)} />
          </div>
          <div className={`${DEFAULT_CLASSNAME}_panel_input`}>
            <label>Дата продажи</label>
            <input type={"date"} value={chargeDate} onChange={(e) => setChargeDate(e.currentTarget.value)} />
          </div>
          <button onClick={(e) => confirmAdditionalCharge(e)} className={`${DEFAULT_CLASSNAME}_panel_confirm`}>{"Начислить"}</button>
        </div>

        <div className={`${DEFAULT_CLASSNAME}_title`} style={{ marginTop: "32px" }}>История доначислений</div>
        <div className={`withdraw_table`}>
          <div className={`withdraw_table_header`}>
            <div>{"Название начисления"}</div>
            <div>{"Получатель"}</div>
            <div>{"%"}</div>
            <div>{"Исходная сумма"}</div>
            <div>{"К начислению"}</div>
            <div>{"Дата"}</div>
          </div>
          {additionalCharges.length ? additionalCharges.map(item => (
            <div className={`withdraw_table_item`}>
              <div>{item?.bonusName}</div>
              <div>{item?.email}</div>
              <div>{`${item?.percent || 40 }%`}</div>
              <div>{item?.baseSum}</div>
              <div>{item?.finalSum}</div>
              <div>{new Date(item?.date).toLocaleDateString()}</div>
            </div>
          )) : <div className={`withdraw_table-empty`}>{"Доначислений не совершалось"}</div>}
        </div>
      </div>
    </div>
  )
}