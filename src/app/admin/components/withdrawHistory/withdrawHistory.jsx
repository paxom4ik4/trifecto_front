import React, {useEffect, useState} from 'react';

import './withdrawHistory.scss';

import arrow from '../withdraw/arrow.png';

const DEFAULT_CLASSNAME = 'admin-withdrawHistory';

export const WithdrawHistory = () => {
  const TOKEN = sessionStorage.getItem('accessToken');

  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    fetch(`https://trifecta.by/api/Administrator/GetWithdrawHistory`, {
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${TOKEN}`
      }
    })
      .then(res => res.json())
      .then(data => setWithdraws(data));
  }, [])

  const [cardExpanded, setCardExpanded] = useState(false);

  return (
    <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
      <div className={DEFAULT_CLASSNAME}>
        <div className={`${DEFAULT_CLASSNAME}_title`}>{"История вывода средств"}</div>
        <div className={`${DEFAULT_CLASSNAME}_list`}>
          {withdraws.length ? withdraws.map(item => {
            return (
              <div className={`${DEFAULT_CLASSNAME}_item`}>
                <div>
                  <img onClick={() => setCardExpanded(!cardExpanded)} className={`${DEFAULT_CLASSNAME}_item_expand ${cardExpanded && "expanded"}`} src={arrow} />
                  <div className={`${DEFAULT_CLASSNAME}_left`}>
                    <div>{item.name}</div>
                    <div>{item.surname}</div>
                    <br /><
                    div>{item.email}</div>
                    <div>{item.phoneNumber}</div>
                    <br />
                    {item?.status === "Подтверждено" ?
                      <div className={`${DEFAULT_CLASSNAME}_approve`}>{"Подтверждено"}</div>
                      : <div className={`${DEFAULT_CLASSNAME}_reject`} >{"Отказано"}</div>
                    }
                  </div>
                  <div className={`${DEFAULT_CLASSNAME}_right`}>
                    <div>{"Запрашиваемая сумма"}</div>
                    <div>{item.withdrawSum}</div>
                    <br /><
                    div>{"Номер счета"}</div>
                    <div>{item.checkingAccount}</div>
                    <br />
                    <div>{"Дата инициализации вывода"}</div>
                    <div>{new Date(item.date).toDateString()}</div>
                  </div>
                </div>
                <div>
                  <div className={`${DEFAULT_CLASSNAME}_item_full ${!cardExpanded && 'hidden'}`}>
                    {item.accurals.map(accural => {
                      return (
                        <div>
                          <span>{accural.accuralName}</span>
                          <span>{accural?.referralName}</span>
                          <span>{new Date(accural?.accuralDate).toLocaleDateString()}</span>
                          <span>{accural.accuralAmount + " BYN"}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          }): <div>{"Нет выводов средств"}</div>}
        </div>
      </div>
    </div>
  )
}