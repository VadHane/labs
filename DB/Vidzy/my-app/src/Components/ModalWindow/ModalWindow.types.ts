import { Video } from '../../Models/Video';

export type ModalWindowProps = {
    buttonCaption: string;
    getVideoByIdOrUndefined: (id?: string) => Video | undefined;

    //! should be adding or editing operation
    resultAction: (video: Video) => Promise<boolean>;
};
