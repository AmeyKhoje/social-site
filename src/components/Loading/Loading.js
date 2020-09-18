import React from 'react';
import './Loading.css'
import { CircularProgress } from '@material-ui/core'

const Loading = () => {
    return (
        <div className="loading">
            <div className="loading__spin">
                <CircularProgress size="2rem" color="#000999" disableShrink thickness={4} />
            </div>
        </div>
    );
}

export default Loading;
