import * as React from 'react';

import './structure.scss';
import { useState, useEffect } from "react";
import {PersonCard} from "../personCard/personCard";

const DEFAULT_CLASSNAME = 'structure';

export const Structure = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [currentStructure, setCurrentStructure] = useState(null);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch(`https://trifecta-web-api.herokuapp.com/api/ReferralStructure/GetUserReferralGroup`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setCurrentStructure(data));
    }, []);

    const setCurrentLevelHandler = (structureLevel) => {
        if (structureLevel < currentLevel) return

        setCurrentLevel(structureLevel);
    };

    const userId = sessionStorage.getItem("userId");

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Структура"}</div>
                <div className={`${DEFAULT_CLASSNAME}_row`}>
                    <PersonCard structureLevel={1} setCurrentLevelHandler={setCurrentLevelHandler} id={userId} />
                </div>
                {Array.from(Array(currentLevel)).map(() => (
                    <div className={`${DEFAULT_CLASSNAME}_row`}>
                        {currentStructure.partnersGroups?.map(item => (
                            <PersonCard id={item.groupOwner.userId} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}