import { useCallback, useEffect, useState } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

function useWindowSize(): WindowSize {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = useCallback(() => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    return { 
        width: windowWidth,
        height: windowHeight
    };
}

export default useWindowSize;
