import * as React from 'react';

import './newbie.scss';

import newbie from './newbie.png';
import { useEffect } from "react";

const DEFAULT_CLASSNAME = 'newbie';

export const Newbie = () => {
    // const [videos, setVideos] = useState([]);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('accessToken');
        fetch('https://trifecta.by:5000/api/VideoTemplate/GetVideos', {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => console.log(data));

    }, [])

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img src={newbie} alt={'video'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Название видео"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_text_content`}>{"Описание ролика (Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLetraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.)"}</div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img src={newbie} alt={'video'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Название видео"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_text_content`}>{"Описание ролика (Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLetraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.)"}</div>
                    </div>
                </div>
                <div className={`${DEFAULT_CLASSNAME}_item`}>
                    <img src={newbie} alt={'video'} />
                    <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Название видео"}</div>
                        <div className={`${DEFAULT_CLASSNAME}_item_text_content`}>{"Описание ролика (Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer tookLetraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.)"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}