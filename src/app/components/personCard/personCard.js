import * as React from 'react';

import './personCard.scss';
import {useEffect, useState} from "react";

import expand from './expand.png';

const DEFAULT_CLASSNAME = 'person-card';

export const PersonCard = ({expanded, id, setCurrentLevelHandler}) => {
    const [personData, setPersonData] = useState(null);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');

        fetch(`https://trifecta-web-api.herokuapp.com/api/UserProfile/GetProfileInfo?userId=${id}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setPersonData(data));
    }, [])

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper ${expanded && 'expanded'}`}>
            <div className={`${DEFAULT_CLASSNAME} loyal-card expanded`}>
                <div>
                    <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Alex Ferrari"}</div>
                    <div className={`${DEFAULT_CLASSNAME}_text`}>{"alex.ferrari@gmail.com"}</div>
                    <div className={`${DEFAULT_CLASSNAME}_text`}>{+375296853605}</div>
                </div>
                {
                    expanded &&
                    <div className={`${DEFAULT_CLASSNAME}_additional`}>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Вид пакета"}</div>
                            <div>{"Premium"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Личный оборот"}</div>
                            <div>{"3.109,2"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Оборот первой линии, $"}</div>
                            <div>{"13.351,66"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Групповой оборот, $"}</div>
                            <div>{"237.125,38"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Базовый уровень"}</div>
                            <div>{"6"}</div>
                        </div>
                    </div>
                }
                <div className={`${DEFAULT_CLASSNAME}_expand expanded`} onClick={() => setCurrentLevelHandler()}><img src={expand} /></div>
            </div>
        </div>
    )
}