import {
    useCallback,
    useEffect,
    useState
} from 'react';
import styled from 'styled-components';

import {
    TextArea1,
    TextInput1
} from './styled';

interface ContainerProps {
    width: string;
    height: string;
}

const Container = styled.div<ContainerProps>`
    width: ${props => props.width || '100%'};
    height: ${props => props.height || 'auto'};
`;

interface RequiredTextFieldProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error: string|null;
    width?: string;
    height?: string;
    multiline?: false;
}

interface RequiredTextAreaProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    type?: string;
    error: string|null;
    width?: string;
    height?: string;
    multiline: true;
}


interface RequiredTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean;
}

const RequiredTextInput = styled(TextInput1)<RequiredTextInputProps>`
    margin-bottom: 0px;
    border: ${ props => props.isError ? `1px solid ${props.theme.colors.error}` : '' };
`;

const RequiredTextArea = styled(TextArea1)<RequiredTextInputProps>`
    margin-bottom: 0px;
    border: ${ props => props.isError ? `1px solid ${props.theme.colors.error}` : '' };
`;

const IsValidTextDiv = styled.div`
    color: ${props => props.theme.colors.error};
    font-size: 14px;
    margin-top: 3px;
`;

const MarginDiv = styled.div`
    margin-bottom: 10px;
`;

function RequiredTextField<T extends RequiredTextFieldProps | RequiredTextAreaProps>(props: T): JSX.Element {
    const {
        placeholder,
        value,
        onChange,
        type,
        error: errorText,
        width,
        height,
        multiline
    } = props;

    const [errorMessage, setErrorMessage] = useState<string|null>(null);

    useEffect(() => {
        setErrorMessage(errorText);
    }, [errorText, setErrorMessage]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e as React.ChangeEvent<any>);
    }, [onChange]);

    return (
        <Container width={width ?? '100%'} height={height ?? 'auto'}>
            {multiline
                ? <RequiredTextArea
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    isError={errorMessage !== null}
                />
                : <RequiredTextInput
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    isError={errorMessage !== null}
                />}
            {errorMessage !== null && <IsValidTextDiv>{errorMessage}</IsValidTextDiv>}
            <MarginDiv />
        </Container>
    );
}

export default RequiredTextField;
