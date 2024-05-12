import { useApolloClient } from '@apollo/client';
import {
    useCallback,
    useState
} from 'react';

import {
    Button1,
    InnerFlexForm1,
    TextInput1,
    Title1Div
} from '../components/atoms/styled';
import CenterAlignedPage from '../components/templates/CenterAlignedPage';
import useToast from '../contexts/ToastContext';
import { requestResetPasswordEmail } from '../gql/mutations';

function PasswordResetForm(): JSX.Element {
    const toast = useToast();
    const apolloClient = useApolloClient();

    const [email, setEmail] = useState('');

    const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            await requestResetPasswordEmail(apolloClient, { email: email });
            toast.showToast('Email sent', 'success');
        } catch(e) {
            toast.showToast('Failed to send reset password email', 'error');
        }
    }, [email]);

    return (
        <InnerFlexForm1 onSubmit={handleSubmit}>
            <Title1Div>
                Reset Password
            </Title1Div>
            <TextInput1 type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
            <Button1 type='submit'>Send Password Reset Link</Button1>
        </InnerFlexForm1>
    );
}

function PasswordResetRequest(): JSX.Element {
    return (
        <CenterAlignedPage>
            <PasswordResetForm />
        </CenterAlignedPage>
    );
}

export default PasswordResetRequest;
