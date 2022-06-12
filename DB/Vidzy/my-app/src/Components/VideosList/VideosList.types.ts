import { Video } from '../../Models/Video';

export type VideosListProps = {
    getAllVideos: () => Promise<Array<Video>>;
    addVideo: (video: Video) => Promise<Video>;
    editVideo: (video: Video) => Promise<Video>;
    deleteVideo: (video: Video) => Promise<Video>;
};
