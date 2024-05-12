import {
    memo
} from 'react';
import styled from 'styled-components';

import { MEDIA_MAX_WIDTH } from '../../constants/css';
import Portal from '../atoms/Portal';
import { Button1,InnerFlexDiv1 } from '../atoms/styled';

const ModalContainerDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 10;
    pointer-events: auto;
`;

const ModalInnerDiv = styled(InnerFlexDiv1)`
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primaryInverse};

    justify-content: space-between;
    align-items: center;

    width: 400px;
    @media (max-width: ${MEDIA_MAX_WIDTH}px) {
        width: calc(100% - 300px);
    }
`;

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 40px;
    padding: 0px 20px;
    box-sizing: border-box;

    background-color: ${props => props.theme.colors.primary};
`;

const MessageDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    width: 100%;
    padding: 10px 10px;
    box-sizing: border-box;
`;

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    title: string;
    children: React.ReactNode;
}

function Modal(props: ModalProps) {
    const { isOpen, onClose, title, children } = props;

    return (
        <Portal elementId='modal-root'>
            {isOpen && (
                <ModalContainerDiv>
                    <ModalInnerDiv>
                        <HeaderDiv>{title}</HeaderDiv>
                        <MessageDiv>{children}</MessageDiv>
                        <Button1 onClick={onClose}>Close</Button1>
                    </ModalInnerDiv>
                </ModalContainerDiv>
            )}
        </Portal>
    );
}

export default memo(Modal);
