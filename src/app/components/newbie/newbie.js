import * as React from 'react';
import './newbie.scss';
import firstDay from '../../assets/firstDay.png';
import secondDay from '../../assets/secondDay.png';
import thirdDay from '../../assets/trirdDay.png';
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const DEFAULT_CLASSNAME = 'newbie';

export const Newbie = ({ isVerified }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isVerified) {
            navigate('/app/settings');
        }
    }, [isVerified])

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');
        fetch('https://trifecta.by/api/VideoTemplate/GetVideos', {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => console.log(data));

    }, [])

    const openLink = link => window.open(link, "_blank");

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_item`} onClick={() => openLink("https://t.me/+GgNg39XQR5M4ZGJi")}>
                    <img src={firstDay} alt={'video'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"День первый"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_text_content`}>{"Начинаем обучение - https://t.me/+GgNg39XQR5M4ZGJi"}</div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`} onClick={() => openLink("https://t.me/+8YUx4cEdQ49hOWYy")}>
                    <img src={secondDay} alt={'video'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"День второй"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_text_content`}>{"Продолжаем обучение - https://t.me/+8YUx4cEdQ49hOWYy"}</div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`} onClick={() => openLink("https://t.me/+Fn5Of3OrNJFjNGRi")}>
                    <img src={thirdDay} alt={'video'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"День третий"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_text_content`}>{"Заканчиваем обучение - https://t.me/+Fn5Of3OrNJFjNGRi"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}