import { useEffect, useState } from 'react';

function useLocalStorageRawState(defaultValue: string, key: string): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [value, setValue] = useState<string>(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? stickyValue
            : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorageRawState;
