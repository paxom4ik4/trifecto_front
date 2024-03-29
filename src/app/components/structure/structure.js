import * as React from 'react';

import './structure.scss';
import {useState, useEffect, useCallback} from "react";
import {PersonCard} from "../personCard/personCard";

const DEFAULT_CLASSNAME = 'structure';

export const Structure = ({ isAdmin }) => {
    const USER_ID = sessionStorage.getItem('userId');
    const TOKEN = sessionStorage.getItem('accessToken');

    const [structureIds, setStructureIds] = useState([USER_ID]);
    const [currentStructure, setCurrentStructure] = useState(null);

    const [structureExpanded, setStructureExpanded] = useState(false);

    useEffect(() => {
        fetch(`https://trifecta.by/api/${isAdmin ? 'Administrator/GetAdminTree' : 'ReferralStructure/GetTree'}?userId=${structureIds[structureIds.length - 1]}`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => setCurrentStructure(data));
    }, [structureIds])


    const getBaseCard = useCallback(() => {
        return (
            <PersonCard
                id={currentStructure?.groupOwner.userId}
                userPackage={currentStructure?.groupOwner.packageType}
                turnover={currentStructure?.groupOwner.personalTurnover}
                mounthlyTurnover={currentStructure?.groupOwner.mounthlyTurnover}
                groupTurnover={currentStructure?.groupOwner.groupTurnover}
                baseLevel={currentStructure?.groupOwner.baseLevel}
                setStructureExpanded={setStructureExpanded}
                parentStructureIds={structureIds}
                setStructureIds={setStructureIds}
                groupLevel={currentStructure?.groupOwner.groupLevel}
            />
        )
    }, [currentStructure]);

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Структура"}</div>
                {!!currentStructure?.groupOwner && <div className={`${DEFAULT_CLASSNAME}_row hide_scroll_bar`}>
                    { getBaseCard() }
                </div>}
                {structureExpanded && <div className={`${DEFAULT_CLASSNAME}_row`}>
                    {!!currentStructure?.partnersGroups.length && currentStructure.partnersGroups.map(item => {
                        return <PersonCard
                            currentStructure={currentStructure}
                            cardExpanded={false}
                            id={item?.groupOwner.userId}
                            userPackage={item?.groupOwner.packageType}
                            turnover={item?.groupOwner.personalTurnover}
                            mounthlyTurnover={item?.groupOwner.mounthlyTurnover}
                            groupTurnover={item?.groupOwner.groupTurnover}
                            baseLevel={item?.groupOwner.baseLevel}
                            setStructureExpanded={() => {}}
                            structureIds={structureIds}
                            setStructureIds={setStructureIds}
                        />
                    })}
                </div>}
            </div>
        </div>
    )
}