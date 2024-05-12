import { CredentialResponse } from 'google-one-tap';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GOOGLE_CLIENT_ID } from '../../constants/googleClient';
import getScript from '../../utilities/getScript';
import { Button1 } from './styled';

const SigninWithGoogleButton = styled(Button1)`
    background-color: ${props => props.theme.colors.button};

    &:hover {
        background-color: ${props => props.theme.colors.buttonHover};
    }

    &:active {
        background-color: ${props => props.theme.colors.buttonActive};
    }

    margin-bottom: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 0px 40px;

    color: ${props => props.theme.colors.textLightest};

    position: relative;
`;

export interface IGoogleLoginButtonProps {
    readonly responseHandler: (response: CredentialResponse) => void,
    readonly children?: React.ReactNode
}

function GoogleLoginButton(props: IGoogleLoginButtonProps): JSX.Element {
    const {children} = props;

    const [disabled, setDisabled] = useState(false);

    const handleCredentialResponse = useCallback((response: CredentialResponse) => {
        props.responseHandler(response);
    }, [props.responseHandler]);
    
    useEffect(() => {
        // Loading google plateform api, if it's not loaded
        if (typeof google === 'undefined') {
            setDisabled(true);
            getScript('https://accounts.google.com/gsi/client', () => {
                google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse
                });

                setDisabled(false);
            });
        }
    }, [setDisabled]);

    const clickHandler = useCallback(() => {
        if (!disabled) {
            google.accounts.id.prompt();
        }
    }, [disabled]);

    return (
        <SigninWithGoogleButton
            id='ts-google-react-login'
            onClick={clickHandler}
            disabled={disabled}
        >
            {children ? children : null}
        </SigninWithGoogleButton>
    );
}

export default GoogleLoginButton;
