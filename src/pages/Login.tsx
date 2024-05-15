import { useApolloClient } from '@apollo/client';
import {
    useCallback,
    useState
} from 'react';
import {
    useNavigate
} from 'react-router-dom';
import styled from 'styled-components';
import GoogleLoginButton from '../components/atoms/GoogleLoginButton';

import RequiredTextField from '../components/atoms/RequiredTextField';
import {
    Button1,
    InnerFlexDiv1,
    InnerFlexForm1,
    LeftAlignDiv,
    StyledLink
} from '../components/atoms/styled';
import CenterAlignedPage from '../components/templates/CenterAlignedPage';
import useToast from '../contexts/ToastContext';
import * as Mutations from '../gql/mutations';
import useRequiredValidator from '../hooks/text-validators/useRequiredValidator';
import { useAuthContext } from '../contexts/AuthContext';
import { REFRESH_TOKEN_LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { CredentialResponse } from 'google-one-tap';

const MarginBottomLeftAlignDiv = styled(LeftAlignDiv)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 18px;
    font-size: 13px;

    color: ${props => props.theme.colors.textLighter};
`;

const SigninAreaDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const HorizontalDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 13px;
    width: 100%;
`;

const Font13Div = styled.div`
    font-size: 13px;
    color: ${props => props.theme.colors.textLight};
`;

const Styled13Link = styled(StyledLink)`
    font-size: 13px;
`;

const Checkbox = styled.input`
    width: 15px;
    height: 15px;
    border: none;
    padding: 0;
    margin: 0;
    margin-right: 5px;
    background-color: ${props => props.theme.colors.background};
`;

const RegisterNowDiv = styled(InnerFlexDiv1)`
    flex-direction: row;
    align-items: start;
    padding: 18px 20px;
    color: ${props => props.theme.colors.textLight};
    background-color: transparent;
    font-size: 13px;
    box-shadow: none;
`;

const SignInWithSocialDiv = styled(InnerFlexDiv1)`
    align-items: start;
    padding: 18px 20px;
`;

const GoogleLogo = styled.img`
    width: 20px;
    height: 20px;

    position: absolute;
    left: 20px;
`;

function LoginForm(): JSX.Element {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [rememberMe, setRememberMe] = useState(false);

    const { setJwt } = useAuthContext();
    
    const emailValidator = useRequiredValidator('Email is required');
    const passwordValidator = useRequiredValidator('Password is required');

    const apolloClient = useApolloClient();
    const toast = useToast();
    const navigate = useNavigate();

    const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailError(emailValidator(event.target.value));
    }, [setEmail, setEmailError, emailValidator]);

    const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordError(passwordValidator(event.target.value));
    }, [setPassword, setPasswordError, passwordValidator]);

    const handleRememberMeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    }, [setRememberMe]);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const emailError = emailValidator(email);
        const passwordError = passwordValidator(password);

        setEmailError(emailError);
        setPasswordError(passwordError);

        if (emailError || passwordError) {
            return;
        }
        
        Mutations.loginLocal(apolloClient, { email, password, rememberMe })
            .then(res => {
                if (!res.data?.loginLocal.accessToken) throw new Error('No access token');
                apolloClient.resetStore();
                setJwt(res.data.loginLocal.accessToken);
                window.localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, res.data.loginLocal.refreshToken);
                toast.showToast('Logged in successfully', 'success');
                navigate('/');
            })
            .catch(error => {
                toast.showToast(error.message, 'error');
            });
    }, [email, password, rememberMe, emailValidator, passwordValidator, apolloClient, toast.showToast, setJwt, navigate]);

    return (
        <InnerFlexForm1 onSubmit={handleSubmit}>
            <MarginBottomLeftAlignDiv>Sign in to start your session</MarginBottomLeftAlignDiv>
            <RequiredTextField
                placeholder='Email'
                value={email}
                onChange={handleEmailChange}
                error={emailError}
            />
            <RequiredTextField
                placeholder='Password'
                type={'password'}
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
            />
            <SigninAreaDiv>
                <HorizontalDiv>
                    <Font13Div>
                        <Checkbox type={'checkbox'} checked={rememberMe} onChange={handleRememberMeChange} />
                        Remember Me
                    </Font13Div>
                    <Styled13Link to={'/password/reset-request'}>
                        I forgot my password
                    </Styled13Link>
                </HorizontalDiv>
                <Button1 type={'submit'}>Sign In</Button1>
            </SigninAreaDiv>
        </InnerFlexForm1>
    );
}

function LoginWithSocialForm(): JSX.Element {
    const [rememberMe, setRememberMe] = useState(false);

    const apolloClient = useApolloClient();
    const toast = useToast();
    const navigate = useNavigate();

    const { setJwt } = useAuthContext();

    const handleRememberMeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    }, []);

    const handleResponse = useCallback((response: CredentialResponse) => {
        const idToken = response.credential;

        Mutations.loginGoogle(apolloClient, { idToken, rememberMe })
            .then(res => {
                if (!res.data?.loginGoogle.accessToken) throw new Error('No access token');
                apolloClient.resetStore();
                setJwt(res.data.loginGoogle.accessToken);
                window.localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, res.data.loginGoogle.refreshToken);
                toast.showToast('Logged in successfully', 'success');
                navigate('/');
            }).catch(error => {
                toast.showToast(error.message, 'error');
            });
    }, [apolloClient, toast.showToast, setJwt, navigate]);

    return (
        <SignInWithSocialDiv>
            <MarginBottomLeftAlignDiv>{'Sign in with'}</MarginBottomLeftAlignDiv>
            <GoogleLoginButton
                responseHandler={handleResponse}
            >
                <GoogleLogo src={'/static/GoogleLogo.svg'} />
                Google
            </GoogleLoginButton>
            <Font13Div>
                <Checkbox type={'checkbox'} checked={rememberMe} onChange={handleRememberMeChange}/>
                Remember Me
            </Font13Div>
        </SignInWithSocialDiv>
    );
}

function Login(): JSX.Element {
    return (
        <CenterAlignedPage>
            <>
                <LoginForm/>
                <RegisterNowDiv>
                    {'Don\'t have an account yet?'} &nbsp;
                    <Styled13Link to={'/register'}> Register Now</Styled13Link>
                </RegisterNowDiv>
                <LoginWithSocialForm/>
            </>
        </CenterAlignedPage>
    );
}

export default Login;
