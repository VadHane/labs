import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import VideosList from './Components/VideosList/VideosList';
import { Video } from './Models/Video';
import {
    createVideo,
    deleteVideo,
    getAllVideo,
    updateVideo,
} from './Services/Video.service';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route
                        path='*'
                        element={
                            <VideosList
                                getAllVideos={getAllVideo}
                                addVideo={(video: Video) => createVideo(video)}
                                editVideo={(video: Video) => updateVideo(video)}
                                deleteVideo={(video: Video) =>
                                    deleteVideo(video)
                                }
                            />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
