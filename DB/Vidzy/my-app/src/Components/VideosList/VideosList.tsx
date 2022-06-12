import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Video } from '../../Models/Video';
import {
    ADD_BUTTON_CAPTION,
    DELETE_IMAGE,
    EDIT_IMAGE,
} from './VideosList.constants';
import { VideosListProps } from './VideosList.types';
import './VideosList.css';
import ModalWindow from '../ModalWindow';

const VideosList: FunctionComponent<VideosListProps> = (
    props: VideosListProps
) => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState<Array<Video>>([]);

    useEffect(() => {
        props.getAllVideos().then((data: Array<Video>) => {
            setVideos([...data]);
        });
    }, [props]);

    const headerNode: React.ReactNode = (
        <header className='header'>
            <button onClick={() => onClickAdd()}>{ADD_BUTTON_CAPTION}</button>
        </header>
    );

    const tableBodyNode: React.ReactNode = (
        <>
            {videos.map((video) => (
                <tr key={video._id}>
                    <th className='table-col-title'>{video.title}</th>
                    <th className='table-col-desc'>{video.description}</th>
                    <th className='table-col-genre'>{video.genre}</th>
                    <th className='table-col-action'>
                        <img
                            src={EDIT_IMAGE.URL}
                            alt={EDIT_IMAGE.ALT}
                            onClick={() => onClickEdit(video._id)}
                        />
                        <img
                            src={DELETE_IMAGE.URL}
                            alt={DELETE_IMAGE.ALT}
                            onClick={() => onClickDelete(video)}
                        />
                    </th>
                </tr>
            ))}
        </>
    );

    const tableNode: React.ReactNode = (
        <div className='list'>
            <table>
                <thead>
                    <tr>
                        <th className='table-col-title'>Title</th>
                        <th className='table-col-desc'>Description</th>
                        <th className='table-col-genre'>Genre</th>
                        <th className='table-col-action'>Actions</th>
                    </tr>
                </thead>
            </table>
            <div className='scroll-list'>
                <table>
                    <tbody>{tableBodyNode}</tbody>
                </table>
            </div>
        </div>
    );

    const onClickAdd = (): void => {
        const navigateTo = '/add';

        navigate(navigateTo);
    };

    const onClickEdit = (id: string): void => {
        const navigateTo = `/edit/${id}`;
        console.log(videos);
        navigate(navigateTo);
    };

    const onClickDelete = (video: Video): void => {
        deleteVideo(video);
    };

    const createVideo = (video: Video): Promise<boolean> => {
        return props
            .addVideo(video)
            .then((video: Video) => {
                if (video) {
                    setVideos((currentValue: Array<Video>) => [
                        ...currentValue,
                        video,
                    ]);
                    return true;
                }
                return false;
            })
            .catch(() => false);
    };

    const editVideo = (video: Video): Promise<boolean> => {
        return props
            .editVideo(video)
            .then((editedVideo: Video) => {
                if (!editedVideo) {
                    return false;
                }

                setVideos((currentValue: Array<Video>) => {
                    const selectedUserIndex = currentValue.findIndex(
                        (_video: Video) => _video._id === editedVideo._id
                    );

                    const prevArray = currentValue.slice(0, selectedUserIndex);
                    const endArray = currentValue.slice(
                        selectedUserIndex + 1,
                        currentValue.length
                    );

                    return [...prevArray, editedVideo, ...endArray];
                });

                return true;
            })
            .catch(() => false);
    };

    const deleteVideo = (video: Video): Promise<boolean> => {
        return props
            .deleteVideo(video)
            .then((video: Video) => {
                if (!video) {
                    return false;
                }

                setVideos((currentValue: Array<Video>) => {
                    const selectedUserIndex = currentValue.findIndex(
                        (_video: Video) => _video._id === video._id
                    );

                    const prevArray = currentValue.slice(0, selectedUserIndex);
                    const endArray = currentValue.slice(
                        selectedUserIndex + 1,
                        currentValue.length
                    );

                    return [...prevArray, ...endArray];
                });

                return true;
            })
            .catch(() => false);
    };

    const getVideoByIdOrUndefined = (id?: string): Video | undefined => {
        if (!id) {
            return undefined;
        }

        const foundVideo = videos.find((video: Video) => video._id === id);
        console.log(foundVideo);

        return foundVideo;
    };

    const emptyVideo: Video = {
        _id: '',
        title: '',
        description: '',
        genre: '',
        file: undefined,
    };

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <>
                        {headerNode}
                        {tableNode}
                    </>
                }
            />
            <Route
                path='/add'
                element={
                    <ModalWindow
                        buttonCaption={'Create'}
                        getVideoByIdOrUndefined={(id?: string) => emptyVideo}
                        resultAction={(video: Video) => createVideo(video)}
                    />
                }
            />
            <Route
                path='/edit/:id'
                element={
                    <ModalWindow
                        buttonCaption={'Save'}
                        getVideoByIdOrUndefined={(id?: string) =>
                            getVideoByIdOrUndefined(id)
                        }
                        resultAction={(video: Video) => editVideo(video)}
                    />
                }
            />
        </Routes>
    );
};

export default VideosList;
