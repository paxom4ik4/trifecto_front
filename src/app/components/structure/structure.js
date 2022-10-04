import * as React from 'react';

import './structure.scss';
import {useState, useEffect, useCallback} from "react";
import {PersonCard} from "../personCard/personCard";

const DEFAULT_CLASSNAME = 'structure';

export const Structure = () => {
    // const userId = sessionStorage.getItem("userId");
    // const TOKEN = sessionStorage.getItem('accessToken');
    //
    // const [currentLevel, setCurrentLevel] = useState(0);
    // const [currentStructure, setCurrentStructure] = useState(null);
    //
    // const [userReferralGroup, setUserReferralGroup] = useState(null);
    //
    // useEffect(() => {
    //     fetch(`https://trifecta-web-api.herokuapp.com//api/ReferralStructure/GetUserReferralGroup?userId=${userReferralGroup}`)
    //         .then(res => res.json())
    //         .then(data => setUserReferralGroupData(data));
    // }, [userReferralGroup]);
    //
    // useEffect(() => {
    //     fetch(`https://trifecta-web-api.herokuapp.com/api/ReferralStructure/GetTree?userId=${userId}`, {
    //         headers: {
    //             'Accept': '*/*',
    //             'Authorization': `Bearer ${TOKEN}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => setCurrentStructure(data));
    // }, []);
    //
    // const setCurrentLevelHandler = (structureLevel) => {
    //     if (structureLevel < currentLevel) return
    //
    //     setCurrentLevel(structureLevel);
    // };
    //
    // return (
    //     <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
    //         <div className={DEFAULT_CLASSNAME}>
    //             <div className={`${DEFAULT_CLASSNAME}_titleRow`}>
    //                 <div className={`${DEFAULT_CLASSNAME}_title`}>{"Структура"}</div>
    //                 {currentLevel !== 0 && <div onClick={() => setCurrentLevel(0)} className={`${DEFAULT_CLASSNAME}_close`}>{"Свернуть"}</div>}
    //             </div>
    //             <div className={`${DEFAULT_CLASSNAME}_row`}>
    //                 <PersonCard
    //                     currentLevel={currentLevel}
    //                     structureLevel={1}
    //                     setCurrentLevelHandler={setCurrentLevelHandler}
    //                     id={userId}
    //                     userPackage={currentStructure?.groupOwner.packageType}
    //                     turnover={currentStructure?.groupOwner.personalTurnover}
    //                     firstTurnover={currentStructure?.groupOwner.firstLineTurnover}
    //                     groupTurnover={currentStructure?.groupOwner.groupTurnover}
    //                     baseLevel={currentStructure?.groupOwner.baseLevel}
    //                 />
    //             </div>
    //             {Array.from(Array(currentLevel)).map((_, index) => (
    //                 <div className={`${DEFAULT_CLASSNAME}_row`}>
    //                     {currentStructure.partnersGroups?.map(item => {
    //                         return (
    //                             <PersonCard
    //                                 setUserReferralGroup={setUserReferralGroup}
    //                                 id={item.groupOwner.userId}
    //                                 groupId={item.id}
    //                                 userPackage={item?.groupOwner.packageType}
    //                                 turnover={item?.groupOwner.personalTurnover}
    //                                 firstTurnover={item?.groupOwner.firstLineTurnover}
    //                                 groupTurnover={item?.groupOwner.groupTurnover}
    //                                 baseLevel={item?.groupOwner.baseLevel}
    //                                 currentLevel={currentLevel}
    //                                 setCurrentLevelHandler={setCurrentLevelHandler}
    //                                 structureLevel={index + 2}
    //                                 setCurrentLevel={setCurrentLevel}
    //                             />
    //                         )
    //                     })}
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // )

    const USER_ID = sessionStorage.getItem('userId');
    const TOKEN = sessionStorage.getItem('accessToken');

    const [structureIds, setStructureIds] = useState([USER_ID]);
    const [currentStructure, setCurrentStructure] = useState(null);

    const [structureExpanded, setStructureExpanded] = useState(false);

    useEffect(() => {
        fetch(`https://trifecta-web-api.herokuapp.com/api/ReferralStructure/GetTree?userId=${structureIds[structureIds.length - 1]}`, {
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
                firstTurnover={currentStructure?.groupOwner.firstLineTurnover}
                groupTurnover={currentStructure?.groupOwner.groupTurnover}
                baseLevel={currentStructure?.groupOwner.baseLevel}
                setStructureExpanded={setStructureExpanded}
                parentStructureIds={structureIds}
                setStructureIds={setStructureIds}
            />
        )
    }, [currentStructure]);

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_title`}>{"Структура"}</div>
                {!!currentStructure?.groupOwner && <div className={`${DEFAULT_CLASSNAME}_row`}>
                    { getBaseCard() }
                </div>}
                {structureExpanded && <div className={`${DEFAULT_CLASSNAME}_row`}>
                    {!!currentStructure?.partnersGroups.length && currentStructure.partnersGroups.map(item => {
                        return <PersonCard
                            id={item?.groupOwner.userId}
                            userPackage={item?.groupOwner.packageType}
                            turnover={item?.groupOwner.personalTurnover}
                            firstTurnover={item?.groupOwner.firstLineTurnover}
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