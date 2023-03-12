import * as React from 'react';

import './personCard.scss';
import {useEffect, useState} from "react";

import expand from './expand.png';

const DEFAULT_CLASSNAME = 'person-card';

export const PersonCard = ({setStructureExpanded, setStructureIds, structureIds, parentStructureIds, currentLevel, id, userPackage, turnover, groupTurnover, mounthlyTurnover, baseLevel}) => {
    const [personData, setPersonData] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const TOKEN = sessionStorage.getItem('accessToken');

    useEffect(() => {
        fetch(`https://trifecta.by/api/UserProfile/GetProfileInfo?userId=${id}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setPersonData(data));
    }, [id])

    useEffect(() => {
        if (currentLevel === 0) {
            setExpanded(false);
        }
    }, [currentLevel])

    const clickHandler = () => {
        setExpanded(!expanded);
        setStructureExpanded(!expanded);

        if (structureIds && id !== structureIds[structureIds.length - 1]) {
            setStructureIds([...structureIds, id]);
        }

        if (parentStructureIds && expanded) {
            if(parentStructureIds.length === 1) {
                setExpanded(!expanded);
                setStructureExpanded(!expanded);
            } else {
                const newIds = [...parentStructureIds].slice(0, -1);
                setStructureIds(newIds);
                setStructureExpanded(expanded);
                setExpanded(expanded);
            }
        }
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
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Групповой оборот"}</div>
                            <div>{turnover + ".00$"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                           <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Месячный оборот"}</div>
                           <div>{mounthlyTurnover + ".00$"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Личный оборот"}</div>
                            <div>{groupTurnover + ".00$"}</div>
                        </div>
                        <div className={`${DEFAULT_CLASSNAME}_additional_info`}>
                            <div className={`${DEFAULT_CLASSNAME}_text colored`}>{"Базовый уровень"}</div>
                            <div>{baseLevel}</div>
                        </div>
                    </div>
                }
                <div className={`${DEFAULT_CLASSNAME}_expand ${expanded && "expanded"}`} onClick={() => clickHandler()}><img src={expand} alt={'expand'} /></div>
            </div> : <div className={`${DEFAULT_CLASSNAME}_loading`}>{"Loading..."}</div>}
        </div>
    )
}