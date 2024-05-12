import { useCallback } from 'react';

function usePasswordConfirmValidator(password: string): (passwordConfirm: string) => string | null {
    return useCallback((passwordConfirm: string): string|null => {
        if (passwordConfirm.length === 0) {
            return 'Password confirmation is required';
        }

        if (passwordConfirm !== password) {
            return 'Password confirmation does not match';
        }

        return null;
    }, [password]);
}

export default usePasswordConfirmValidator;
