import { Video } from '../Models/Video';

const url = 'http://localhost:3005/api/file/';

export const getAllVideo = (): Promise<Array<Video>> => {
    return fetch(url)
        .then((res: Response) => res.json())
        .then((data: Array<Video>) => data);
};

export const createVideo = (video: Video): Promise<Video> => {
    const data = new FormData();
    data.append('title', video.title);
    data.append('description', video.description);
    data.append('genre', video.genre);

    if (video.file) {
        data.append('file', video.file);
    }

    return fetch(url, {
        method: 'POST',
        body: data,
    })
        .then((res) => res.json())
        .then((data: Video) => data);
};

export const updateVideo = (video: Video): Promise<Video> => {
    const data = new FormData();
    data.append('title', video.title);
    data.append('description', video.description);
    data.append('genre', video.genre);

    if (video.file) {
        data.append('file', video.file);
    }

    const urlWithId = `${url}${video._id}`;

    return fetch(urlWithId, {
        method: 'PUT',
        body: data,
    })
        .then((res) => res.json())
        .then((data: Video) => data);
};

export const deleteVideo = (video: Video): Promise<Video> => {
    const urlWithId = `${url}${video._id}`;

    return fetch(urlWithId, {
        method: 'DELETE',
    })
        .then((res: Response) => res.json())
        .then((data: Video) => data);
};
