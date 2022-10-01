import React from 'react';

import './withdraw.scss';

const DEFAULT_CLASSNAME = 'admin-withdraw';

export const Withdraw = () => {
    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Вывод средств"}</div>
            </div>
        </div>
    )
}