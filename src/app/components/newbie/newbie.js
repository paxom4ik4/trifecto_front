import * as React from 'react';
import './newbie.scss';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import tgMaterials from './tg-material.png';

const DEFAULT_CLASSNAME = 'newbie';

export const Newbie = ({ isVerified, isCryptoUser, hasUserPackage }) => {
    const navigate = useNavigate();
    const [cryptoMaterials, setCryptoMaterials] = useState([]);

    useEffect(() => {
        if (!isVerified) {
            navigate('/app/settings');
        }
    }, [isVerified])

    useEffect(() => {
        if (!isCryptoUser) {
            const TOKEN = sessionStorage.getItem('accessToken');
            fetch('https://trifecta.by/api/VideoTemplate/GetCryptoLessons', {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${TOKEN}`
                }
            })
                .then(res => res.json())
                .then(data => setCryptoMaterials(data));
        }
    }, [isCryptoUser]);

    const openLink = link => window.open(link, "_blank");

    const Video = ({ src }) => {
        const [showControls, setShowControls] = useState(true);
        const [isLoading, setIsLoading] = useState(true);

        const handleLoadedData = () => {
            setIsLoading(false);
            setShowControls(false);
        }

        return (
            <video
                autoPlay={false}
                src={src}
                width={384}
                height={216}
                controls={showControls}
                onMouseOver={() => !isLoading && setShowControls(true)}
                onMouseOut={() => !isLoading && setShowControls(false)}
                onLoadedData={handleLoadedData}
            />
        );
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {hasUserPackage && <>
                <div className={DEFAULT_CLASSNAME}>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Первый блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_text_content tg-materials-link`} onClick={() => openLink("https://t.me/+GgNg39XQR5M4ZGJi")}>
                                <img className={`${DEFAULT_CLASSNAME}_item_text_content_image`} src={tgMaterials}
                                     alt="materials"/>
                                <div>-</div>
                                {"Материалы обучения"}
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <Video key="video-1" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_1_1.mp4" }/>
                                <Video key="video-2" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_1_2.mp4" }/>
                                <Video key="video-3" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_1_3.mp4" }/>
                                <Video key="video-4" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_1_4.mp4" }/>
                            </div>
                        </div>

                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Второй блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_text_content tg-materials-link`}
                                 onClick={() => openLink("https://t.me/+8YUx4cEdQ49hOWYy")}>
                                <img className={`${DEFAULT_CLASSNAME}_item_text_content_image`} src={tgMaterials}
                                     alt="materials"/>
                                <div>-</div>
                                {"Материалы обучения"}
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <Video key="video-5" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_2_1.mp4" }/>
                                <Video key="video-6" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_2_2.mp4" }/>
                                <Video key="video-7" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_2_3.mp4" }/>
                                <Video key="video-8" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_2_4.mp4" }/>
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Третий блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_text_content tg-materials-link`}
                                 onClick={() => openLink("https://t.me/+Fn5Of3OrNJFjNGRi")}>
                                <img className={`${DEFAULT_CLASSNAME}_item_text_content_image`} src={tgMaterials}
                                     alt="materials"/>
                                <div>-</div>
                                {"Материалы обучения"}
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <Video key="video-9"
                                       src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_3_1.mp4"}/>
                                <Video key="video-10"
                                       src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_3_2.mp4"}/>
                                <Video key="video-11"
                                       src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_3_3.mp4"}/>
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Четвертый блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <Video key="video-13"
                                       src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_4_1.mp4" }/>
                                <Video key="video-14" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_4_2.mp4" }/>
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пятый блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <Video key="video-17" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_5_1.mp4" }/>
                                <Video key="video-18" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_5_2.mp4" }/>
                                <Video key="video-19" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_5_3.mp4" }/>
                                <Video key="video-20" src={"https://trifecta.by/trifecto_Documents/Videos/Lesson_5_4.mp4" }/>
                            </div>
                        </div>
                    </div>
                </div>
            </>}

            {isCryptoUser && <>
                <div className={`${DEFAULT_CLASSNAME}_material-title`}>Crypto Обучение</div>
                <div className={`${DEFAULT_CLASSNAME}_crypto-material`}>
                    {cryptoMaterials.length >= 1 && cryptoMaterials.map((item) => {
                        return (
                            <div className={`${DEFAULT_CLASSNAME}_item`} onClick={() => openLink(item?.item2)}>
                                <img src={item?.item1} alt={`${item?.item1}_Crypto_material`}/>
                            </div>
                        )
                    })}
                </div>
            </>}
        </div>
    )
}
