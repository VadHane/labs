import { VideoFile } from './../App.types';

export type Video = {
    _id: string;
    title: string;
    description: string;
    genre: string;
    file: VideoFile;
};
