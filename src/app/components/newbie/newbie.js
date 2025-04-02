import * as React from 'react';
import './newbie.scss';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import tgMaterials from './tg-material.png';

const DEFAULT_CLASSNAME = 'newbie';

export const Newbie = ({ isVerified, isCryptoUser, hasUserPackage }) => {
    const navigate = useNavigate();
    const [cryptoMaterials, setCryptoMaterials] = useState([]);

    const isMobile = window.innerWidth <= 500;

    useEffect(() => {
        if (!isVerified) {
            navigate('/app/settings');
        }
    }, [isVerified])

    useEffect(() => {
        if (isCryptoUser) {
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
        return (
            <video
                preload="metadata"
                playsInline={true}
                autoPlay={false}
                width={384}
                height={216}
                controls={true}
            >
                <source src={isMobile ? src : `${src}#t=0.5`} type='video/mp4' />
            </video>
        );
    }

    return (
        <div className={`${DEFAULT_CLASSNAME}_wrapper`}>
            {hasUserPackage && <>
                <div className={DEFAULT_CLASSNAME}>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Первый блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_text_content tg-materials-link`}
                                 onClick={() => openLink("https://t.me/+GgNg39XQR5M4ZGJi")}>
                                <img className={`${DEFAULT_CLASSNAME}_item_text_content_image`} src={tgMaterials}
                                     alt="materials"/>
                                <div>-</div>
                                {"Материалы обучения"}
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/Mv9krK3LtBY?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/XmrFAHjTnHo?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/Aq2MBA62cXA?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/DqvoHf4pw2A?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
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
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/JzvTUL1hMb0?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/fJeVDkdTJeE?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/isGjD8Bmqsg?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/NDPij682s80?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
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
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/3lcwk7n_QVo?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/7uvr17vEH4s?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/TtWEAOUNn_M?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Четвертый блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/fUn0tuSAsAY?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/pkpzXtzdej8?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пятый блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/q3S1tQBPFDQ?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/d2ehGf5hf4o?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/qnKthzYifMI?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/XqDcI3l0PCQ?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                            </div>
                        </div>
                    </div>


                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Первый блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_text_content tg-materials-link`}
                                 onClick={() => openLink("https://t.me/+GgNg39XQR5M4ZGJi")}>
                                <img className={`${DEFAULT_CLASSNAME}_item_text_content_image`} src={tgMaterials}
                                     alt="materials"/>
                                <div>-</div>
                                {"Материалы обучения"}
                            </div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/2r2NERpWWpw?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/xJjgueiFZk8?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/Eewdv_5BGsE?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/RyiatBS1o_E?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
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
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/y_CHT_Ihsk0?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/9Qq2nJLfNMQ?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/us-t21vYEm0?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
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
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/4crbiKkqOpg?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/41_qN1442gw?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/t190Ii9PdRY?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/9m4acs1d53g?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Четвертый блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/XFsSZDO0osA?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/mBuWx5fqi20?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/7H2MX7iDNpU?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/HB_7D3FY9RA?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Пятый блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/xdC3FL6MB94?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/auEiKSp08KU?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/bTRMKmYxwno?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/ZjCQHTAF3WU?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/eoZOxVwCm2k?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Шестой блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/kq_t9_fUZgo?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/DtNWKodOxSI?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/vCoAkt9N6gc?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/uhBW-dLtt-A?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/ZDiTR9mDEWM?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/KMte1g4XGrs?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/xwNDQD2Zdwk?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/VHVjLsIJGPU?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Седьмой блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/Gd78ClCUo-0?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/vmxtt90WAUQ?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/fZvVBtIkcOo?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Восьмой блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/jqJf5toaDks?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${DEFAULT_CLASSNAME}_item`}>
                        <div className={`${DEFAULT_CLASSNAME}_item_text`}>
                            <div className={`${DEFAULT_CLASSNAME}_item_title`}>{"Девятый блок"}</div>
                            <div className={`${DEFAULT_CLASSNAME}_item_videos`}>
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/QFDTjtr6XF0?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
                                <iframe width="380" height="216" style={{borderRadius: 20}}
                                        src="https://www.youtube.com/embed/dDqZuPKVKn0?si=WW3g_nCmKOUIqA6Z"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                />
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
