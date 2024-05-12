import { useCallback } from 'react';

function useEmailValidator(): (email: string, isVerified: boolean) => string|null {
    return useCallback((email: string, isVerified: boolean) => {
        if (email.length === 0) {
            return 'Email is required';
        }

        //regular expression for email validation
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(email)) {
            return 'Email is invalid';
        }
        
        if (!isVerified) {
            return 'Email is not verified';
        }

        return null;
    }, []);
}

export default useEmailValidator;
