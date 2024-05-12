import { useCallback } from 'react';

function useRequiredValidator(errorMessage: string): (text: string) => string | null {
    return useCallback((text: string): string|null => {
        if (text.length === 0) {
            return errorMessage;
        }

        return null;
    }, [errorMessage]);
}

export default useRequiredValidator;
