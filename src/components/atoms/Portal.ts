import { ReactPortal,useMemo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
    elementId: string;
}

function Portal(props: PortalProps): ReactPortal {
    const { children, elementId } = props;
    const rootElement = useMemo(() => document.getElementById(elementId), [
        elementId,
    ]);

    if (!rootElement) {
        throw new Error(`Could not find element with id: ${elementId}`);
    }

    return createPortal(children, rootElement);
}

export default Portal;