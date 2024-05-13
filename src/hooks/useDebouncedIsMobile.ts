import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';
import useDebounce from './useDebounce';
import { MEDIA_MAX_WIDTH } from '../constants/css';

function useDebouncedIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    const [debouncedIsMobile, setDebouncedIsMobile] = useState(false);
    const windowSize = useWindowSize();

    useDebounce(() => {
        setDebouncedIsMobile(isMobile);
    }, 500, [isMobile, setDebouncedIsMobile]);

    useEffect(() => {
        setDebouncedIsMobile(window.innerWidth < MEDIA_MAX_WIDTH);
    }, []);

    useEffect(() => {
        setIsMobile(windowSize.width < MEDIA_MAX_WIDTH);
    }, [windowSize.width]);

    return debouncedIsMobile;
}

export default useDebouncedIsMobile;
