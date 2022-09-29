import * as React from 'react';

import './structure.scss';
import { useState, useEffect } from "react";
import {PersonCard} from "../personCard/personCard";

const DEFAULT_CLASSNAME = 'structure';

export const Structure = () => {
    const userId = sessionStorage.getItem("userId");
    const TOKEN = sessionStorage.getItem('accessToken');

    const [currentLevel, setCurrentLevel] = useState(0);
    const [currentStructure, setCurrentStructure] = useState(null);

    useEffect(() => {
        fetch(`http://trifecta.by:5000/api/ReferralStructure/GetUserReferralGroup`, {
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

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_titleRow`}>
                    <div className={`${DEFAULT_CLASSNAME}_title`}>{"Структура"}</div>
                    {currentLevel !== 0 && <div onClick={() => setCurrentLevel(0)} className={`${DEFAULT_CLASSNAME}_close`}>{"Свернуть"}</div>}
                </div>
                <div className={`${DEFAULT_CLASSNAME}_row`}>
                    <PersonCard
                        currentLevel={currentLevel}
                        structureLevel={1}
                        setCurrentLevelHandler={setCurrentLevelHandler}
                        id={userId}
                        userPackage={currentStructure?.groupOwner.packageType}
                        turnover={currentStructure?.groupOwner.personalTurnover}
                        firstTurnover={currentStructure?.groupOwner.firstLineTurnover}
                        groupTurnover={currentStructure?.groupOwner.groupTurnover}
                        baseLevel={currentStructure?.groupOwner.baseLevel}
                    />
                </div>
                {Array.from(Array(currentLevel)).map(() => (
                    <div className={`${DEFAULT_CLASSNAME}_row`}>
                        {currentStructure.partnersGroups?.map(item => {
                            return (
                                <PersonCard
                                    id={item.groupOwner.userId}
                                    groupId={item.id}
                                    userPackage={item?.groupOwner.packageType}
                                    turnover={item?.groupOwner.personalTurnover}
                                    firstTurnover={item?.groupOwner.firstLineTurnover}
                                    groupTurnover={item?.groupOwner.groupTurnover}
                                    baseLevel={item?.groupOwner.baseLevel}
                                    currentLevel={currentLevel}
                                    setCurrentLevel={setCurrentLevel}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}