import { useCallback } from 'react';

function usePasswordValidator(): (password: string) => string | null {
    return useCallback((password: string): string|null => {
        if (password.length === 0) {
            return 'Password is required';
        }

        if (password.length < 8) {
            return 'Password must be at least 8 characters';
        }

        return null;
    }, []);
}

export default usePasswordValidator;
