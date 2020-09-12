import React from 'react';
import { usePosition } from 'use-position'

const Location = () => {
    const watch = true;
    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        error,
    } = usePosition(watch);
    localStorage.setItem({
        'lattitude': latitude,
        'longitude': longitude,
        'timestamp': timestamp
    })
    return (
        <div>
            
        </div>
    );
}

export default Location;
