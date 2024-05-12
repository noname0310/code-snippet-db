import { useApolloClient } from '@apollo/client';
import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import RequiredTextField from '../components/atoms/RequiredTextField';
import { Title1Div, Button1, InnerFlexForm1 } from '../components/atoms/styled';
import CenterAlignedPage from '../components/templates/CenterAlignedPage';
import useToast from '../contexts/ToastContext';
import { issueEmailToken, resetPassword, verifyEmail } from '../gql/mutations';
import usePasswordConfirmValidator from '../hooks/text-validators/usePasswordConfirmValidator';
import usePasswordValidator from '../hooks/text-validators/usePasswordValidator';

const SubmitButton = styled(Button1)`
    margin-top: 30px;
`;

function PasswordResetForm(): JSX.Element {
    const apolloClient = useApolloClient();
    const navigate = useNavigate();
    const toast = useToast();
    
    const [searchParams] = useSearchParams();

    const emailCheckId = searchParams.get('emailCheckId');
    const verifyId = searchParams.get('verifyId');


    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string|null>(null);

    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState<string|null>(null);
    
    const passwordValidator = usePasswordValidator();
    const passwordConfirmValidator = usePasswordConfirmValidator(password);

    const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordError(passwordValidator(event.target.value));
    }, [setPassword, setPasswordError, passwordValidator]);

    const handlePasswordConfirmChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);
        setPasswordConfirmError(passwordConfirmValidator(event.target.value));
    }, [setPasswordConfirm, setPasswordConfirmError, passwordConfirmValidator]);

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const passwordError = passwordValidator(password);
        const passwordConfirmError = passwordConfirmValidator(password);

        setPasswordError(passwordError);
        setPasswordConfirmError(passwordConfirmError);

        if (passwordError || passwordConfirmError) {
            return;
        }

        try {
            await verifyEmail(apolloClient, { verifyId: verifyId ?? '' });
            const emailToken = (await issueEmailToken(apolloClient, { emailCheckId: emailCheckId ?? '' })).data!.issueEmailToken;
            await resetPassword(apolloClient, { emailToken: emailToken, password });
            
            toast.showToast('Password reset successfully', 'success');
            navigate('/login');
        } catch(error: any) {
            toast.showToast(error.message, 'error');
        }
    }, [password, passwordConfirm, passwordValidator, passwordConfirmValidator]);

    return (
        <InnerFlexForm1 onSubmit={handleSubmit}>
            <Title1Div>
                Reset Password
            </Title1Div>
            <RequiredTextField
                type='password'
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
            />
            <RequiredTextField
                type='password'
                placeholder='Confirm Password'
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                error={passwordConfirmError}
            />
            <SubmitButton type='submit'>Change Password</SubmitButton>
        </InnerFlexForm1>
    );
}

function PasswordReset(): JSX.Element {
    return (
        <CenterAlignedPage>
            <PasswordResetForm />
        </CenterAlignedPage>
    );
}

export default PasswordReset;
