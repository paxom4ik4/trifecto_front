import * as React from 'react';

import './personCard.scss';
import {useEffect, useState} from "react";

import expand from './expand.png';

const DEFAULT_CLASSNAME = 'person-card';

export const PersonCard = ({setCurrentLevel, currentLevel, structureLevel = 0, id, setCurrentLevelHandler, groupId, userPackage, turnover, firstTurnover, groupTurnover, baseLevel}) => {
    const [personData, setPersonData] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const [groupData, setGroupData] = useState(null);

    const TOKEN = sessionStorage.getItem('accessToken');

    useEffect(() => {
        fetch(`http://trifecta.by:5000/api/UserProfile/GetProfileInfo?userId=${id}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setPersonData(data));
    }, [])

    useEffect(() => {
        if (currentLevel === 0) {
            setExpanded(false);
        }
    }, [currentLevel])

    const clickHandler = () => {
        loadNextGroup()
        setExpanded(!expanded);
        setCurrentLevelHandler(structureLevel);
    }

    const loadNextGroup = () => {
        fetch(`http://trifecta.by:5000/api/UserProfile/GetPartnersReferralGroups?groupId=${groupId}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setGroupData(data));
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper ${expanded && 'expanded'}`}>
            {personData ? <div className={`${DEFAULT_CLASSNAME} loyal-card expanded`}>
                <div>
                    <div className={`${DEFAULT_CLASSNAME}_text colored`}>{personData?.firstName + " " + personData?.lastName}</div>
                    <div className={`${DEFAULT_CLASSNAME}_text`}>{personData?.email}</div>
                    <div className={`${DEFAULT_CLASSNAME}_text`}>{personData?.phoneNumber}</div>
                </div>
                {
                    expanded &&
                    <div className={`${DEFAULT_CLASSNAME}_additional`}>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Вид пакета"}</div>
                            <div>{userPackage}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Личный оборот"}</div>
                            <div>{turnover + ".00$"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Оборот первой линии, $"}</div>
                            <div>{firstTurnover + ".00$"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Групповой оборот, $"}</div>
                            <div>{groupTurnover + ".00$"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Базовый уровень"}</div>
                            <div>{baseLevel}</div>
                        </div>
                    </div>
                }
                <div className={`${DEFAULT_CLASSNAME}_expand ${expanded && "expanded"}`} onClick={() => clickHandler()}><img src={expand} /></div>
            </div> : <div className={`${DEFAULT_CLASSNAME}_loading`}>{"Loading..."}</div>}
        </div>
    )
}