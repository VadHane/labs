/* eslint-disable react-hooks/rules-of-hooks */
import React, { FunctionComponent, useState } from 'react';
import { Video } from '../../Models/Video';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ButtonEvent, InputEvent } from '../../App.types';
import {
    DESC_PLACEHOLDER,
    GENRE_PLACEHOLDER,
    TITLE_PLACEHOLDER,
    UNDEFINED_EXCEPTION,
    USER_NOT_FOUND_WARNING_MESSAGE,
} from './ModalWindow.constants';
import { ModalWindowProps } from './ModalWindow.types';
import './ModalWindow.css';
import UserWarningModal from '../UserWarningModal';

const ModalWindow: FunctionComponent<ModalWindowProps> = (
    props: ModalWindowProps
) => {
    const { id } = useParams();
    const selectedVideo = props.getVideoByIdOrUndefined(id);

    if (!selectedVideo) {
        return <UserWarningModal message={USER_NOT_FOUND_WARNING_MESSAGE} />;
    }

    const navigate = useNavigate();
    const [title, setTitle] = useState<string>(selectedVideo.title);
    const [desc, setDesc] = useState<string>(selectedVideo.description);
    const [genre, setGenre] = useState<string>(selectedVideo.genre);
    const [exceptionMessage, setExceptionMessage] = useState<string>('');
    const file = React.createRef<HTMLInputElement>();

    const backgroundNode: React.ReactNode = (
        <NavLink to={'/'} title='Close modal window'>
            <div className='background'></div>
        </NavLink>
    );

    const exceptionString: React.ReactNode = (
        <div className='exception-message'>
            <span>{exceptionMessage}</span>
        </div>
    );

    const mainButtonNode: React.ReactNode = (
        <button onClick={(e: ButtonEvent) => resultActionHandler(e)}>
            {props.buttonCaption}
        </button>
    );

    const resultActionHandler = (e: ButtonEvent) => {
        //! to prevent default send query after click on form's button
        e.preventDefault();
        const newVideo: Video = {
            _id: selectedVideo._id,
            title: title,
            description: desc,
            genre: genre,
            file: file.current?.files?.item(0),
        };

        props.resultAction(newVideo).then((done: boolean) => {
            if (done) {
                const navigateTo = '/';

                navigate(navigateTo);
            } else {
                setExceptionMessage(UNDEFINED_EXCEPTION);
            }
        });
    };

    return (
        <div className='wrapper'>
            {backgroundNode}
            <div className='window'>
                <form>
                    <div className='form-rows'>
                        {exceptionString}
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder={TITLE_PLACEHOLDER}
                            value={title}
                            onChange={(event: InputEvent) => {
                                setTitle(event.target.value);
                            }}
                        />
                        <br></br>
                        <input
                            type='text'
                            name='desc'
                            id='desc'
                            placeholder={DESC_PLACEHOLDER}
                            value={desc}
                            onChange={(event: InputEvent) => {
                                setDesc(event.target.value);
                            }}
                        />
                        <br></br>
                        <input
                            type='text'
                            name='genre'
                            id='genre'
                            placeholder={GENRE_PLACEHOLDER}
                            value={genre}
                            onChange={(event: InputEvent) => {
                                setGenre(event.target.value);
                            }}
                        />
                        <br></br>
                        <input type='file' ref={file} />
                        {mainButtonNode}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalWindow;
