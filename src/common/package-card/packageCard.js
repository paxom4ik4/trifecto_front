import * as React from 'react'

import './packageCard.scss';

const DEFAULT_CLASSNAME = 'package-card';

export const PackageCard = ({ title, image }) => {

    let titleToRender;
    let subtitle;

    if (title.split(" ").length === 1) {
        titleToRender = title;
        subtitle = "Пакет";
    } else {
        titleToRender = title.split(' ')[1]
        subtitle = title.split(' ')[0]
    }

    return (
        <div className={DEFAULT_CLASSNAME}>
            <div className={`${DEFAULT_CLASSNAME}_blur`} />
            <div className={`${DEFAULT_CLASSNAME}_content`}>
                <div className={`${DEFAULT_CLASSNAME}_subtitle`}>{subtitle}</div>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{titleToRender}</div>
                <img src={image} alt={'package icon'}/>
                <div className={`${DEFAULT_CLASSNAME}_more`}>{"Подробнее"}</div>
            </div>
        </div>
    )
}