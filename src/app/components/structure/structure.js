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

        fetch('https://trifecta-web-api.herokuapp.com/api/Info/GetThumbnails?userId=31703f65-5a6d-400e-ab87-d0d93981f34f', {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setCurrentStructure(data));
    }, []);

    const setCurrentLevelHandler = () => setCurrentLevel(currentLevel + 1);

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Структура"}</div>
                <div className={`${DEFAULT_CLASSNAME}_row`}>
                    <PersonCard expanded={currentLevel > 0} setCurrentLevelHandler={setCurrentLevelHandler} id={"176d64e0-4f8c-4aea-ade1-783dabd1bbc6"} />
                </div>
                {Array.from(Array(currentLevel)).map(() => (
                    <div className={`${DEFAULT_CLASSNAME}_row`}>
                        {currentStructure?.map(item => (
                            <PersonCard id={"176d64e0-4f8c-4aea-ade1-783dabd1bbc6"} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}