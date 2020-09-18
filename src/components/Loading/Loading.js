import React from 'react';
import './Loading.css'
import { CircularProgress } from '@material-ui/core'

const Loading = () => {
    return (
        <div className="loading">
            <div className="loading__spin">
                <CircularProgress />
            </div>
        </div>
    );
}

export default Loading;
