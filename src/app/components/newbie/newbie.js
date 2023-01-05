import * as React from 'react';
import './newbie.scss';
import newbie from './newbie.png';
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
                    <img src={newbie} alt={'video'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"День 1"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_text_content`}>{"Описание ролика (Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLetraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.)"}</div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`} onClick={() => openLink("https://t.me/+8YUx4cEdQ49hOWYy")}>
                    <img src={newbie} alt={'video'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"День 2"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_text_content`}>{"Описание ролика (Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLetraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.)"}</div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`} onClick={() => openLink("https://t.me/+Fn5Of3OrNJFjNGRi")}>
                    <img src={newbie} alt={'video'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"День 3"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_text_content`}>{"Описание ролика (Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLetraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.)"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}