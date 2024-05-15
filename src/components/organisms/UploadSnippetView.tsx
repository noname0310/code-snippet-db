import styled from 'styled-components';

import SyntaxHighlighter from 'react-syntax-highlighter';
import * as hljsStyles from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SnippetData, staticSnippets } from '../../constants/testSets';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MEDIA_MAX_WIDTH } from '../../constants/css';

import { Button1 } from '../atoms/styled';
import RequiredTextField from '../atoms/RequiredTextField';
import useRequiredValidator from '../../hooks/text-validators/useRequiredValidator';
import useCurrentUser from '../../hooks/useCurrentUser';
import useToast from '../../contexts/ToastContext';

const SnippetViewDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    margin: 20px;
    height: calc(100% - 40px);
    width: calc(100% - 490px);
    
    @media (max-width: ${MEDIA_MAX_WIDTH}px) {
        width: calc(100% - 40px);
    }

    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primaryInverse};
`;

const SnippetViewTopBarDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    
    box-sizing: border-box;

    padding: 10px 10px;
    background-color: ${props => props.theme.colors.secondary};
`;

const SnippetViewCloseButton = styled.button`
    color: ${props => props.theme.colors.textLight};
    background-color: unset;
    font-weight: bold;
    font-size: 15px;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
`;

const SnippetViewContentContainerForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    
    box-sizing: border-box;

    padding: 20px 20px;

    width: 100%;
    overflow-y: auto;
`;

const SnippetViewTitleDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column; 
    align-items: start;
    justify-content: start;
`;

const SnippetViewDescriptionDiv = styled.div`
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
`;

const SnippetViewContentText = styled.p`
    margin: 0;
    padding: 0;
    font-size: 15px;
    margin-bottom: 5px;
`;

const SnippetCodeViewDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: space-between;
    justify-content: start;

    position: relative;
`;

const SnippetCodeViewTextArea = styled.textarea`
    background-color: transparent;
    color: transparent;
    caret-color: ${props => props.theme.colors.textLight};
    outline: none;
    resize: none;
    font-family: monospace;
    font-size: 13px;
    width: 100%;
    height: 100%;

    border: none;

    padding: 13px 0px;
    padding-left: 2.25em;
    padding-bottom: 0px;
    box-sizing: border-box;

    position: absolute;
`;

const CodeErrorTextDiv = styled.div`
    color: ${props => props.theme.colors.error};
    font-size: 14px;
    margin-bottom: 10px;
`;

const SnippetViewFooterDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    
    box-sizing: border-box;

    padding-top: 10px;
`;

const SnippetViewFooterText = styled.p`
    margin: 0;
    padding: 0;
    font-size: 10px;
`;

const SubmitHeaderDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: end;
    justify-content: end;
`;

const SubmitButton = styled(Button1)`
    margin-left: 10px;
    width: 80px;
    height: 38px;

    color: ${props => props.theme.colors.textLight};
    background-color: ${props => props.theme.colors.secondary};

    :hover {
        background-color: ${props => props.theme.colors.tertiary};
    }

    :active {
        background-color: ${props => props.theme.colors.primary};
    }
`;

interface SnippetViewProps {
    initialSnippetName: string;
    onClose: () => void;
    onSubmit: (snippet: SnippetData) => void;
}

function UploadSnippetView(props: SnippetViewProps): JSX.Element {
    const { initialSnippetName, onClose, onSubmit } = props;

    const [snippetName, setSnippetName] = useState<string>('');
    const [snippetNameError, setSnippetNameError] = useState<string | null>(null);

    const [snippetDescription, setSnippetDescription] = useState<string>('');
    const [snippetDescriptionError, setSnippetDescriptionError] = useState<string | null>(null);

    const [snippetCode, setSnippetCode] = useState<string>('');
    const [snippetCodeError, setSnippetCodeError] = useState<string | null>(null);

    useEffect(() => {
        if (initialSnippetName) {
            setSnippetName(initialSnippetName);
        }
    }, [initialSnippetName]);

    const style = useMemo((): { [key: string]: React.CSSProperties } => {
        return {
            ...hljsStyles.vs2015 || hljsStyles.vs,
            'hljs': {
                ...hljsStyles.vs2015['hljs'] || hljsStyles.vs['hljs'],
                'width': '100%',
                'height': 'auto',
                'padding': '0px',
                'boxSizing': 'border-box',
                'overflowX': 'clip',
                'minHeight': '300px',
                'marginBottom': '0px'
            }
        };
    }, []);

    const user = useCurrentUser();
    const toast = useToast();

    const snippetNameValidator = useRequiredValidator('snippet name is required');
    const snippetDescriptionValidator = useRequiredValidator('snippet description is required');
    const snippetCodeValidator = useRequiredValidator('snippet code is required');

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user) {
            toast.showToast('login session expired, please login again', 'error');
            onClose();
            return;
        }
        
        const snippetNameError = snippetNameValidator(snippetName);
        const snippetDescriptionError = snippetDescriptionValidator(snippetDescription);
        const snippetCodeError = snippetCodeValidator(snippetCode);

        setSnippetNameError(snippetNameError);
        setSnippetDescriptionError(snippetDescriptionError);
        setSnippetCodeError(snippetCodeError);

        if (snippetNameError || snippetDescriptionError || snippetCodeError) {
            return;
        }

        onSubmit({
            id: (staticSnippets.length + 1).toString(),
            name: snippetName,
            author: user.username,
            description: snippetDescription,
            content: snippetCode,
            contentLanguage: 'javascript'
        });
    }, [snippetName, snippetDescription, snippetCode, user]);

    return (
        <SnippetViewDiv>
            <SnippetViewTopBarDiv>
                <SnippetViewCloseButton onClick={() => onClose()}>Close</SnippetViewCloseButton>
            </SnippetViewTopBarDiv>
            <SnippetViewContentContainerForm onSubmit={handleSubmit}>
                <SnippetViewTitleDiv>
                    <SnippetViewContentText>Title</SnippetViewContentText>
                    <RequiredTextField
                        placeholder="Title e.g. 'useEffect Hook For Fetching Data From API In React'"
                        value={snippetName}
                        onChange={(e) => setSnippetName(e.target.value)}
                        error={snippetNameError} />
                </SnippetViewTitleDiv>
                <SnippetViewDescriptionDiv>
                    <SnippetViewContentText>Description</SnippetViewContentText>
                    <RequiredTextField
                        placeholder="Description e.g. 'This snippet demonstrates how to use the useEffect hook to fetch data from an API in React.'"
                        value={snippetDescription}
                        onChange={(e) => setSnippetDescription(e.target.value)}
                        multiline={true}
                        error={snippetDescriptionError} />
                </SnippetViewDescriptionDiv>
                
                <SnippetCodeViewDiv>
                    <SnippetCodeViewTextArea
                        spellCheck={false}
                        value={snippetCode}
                        onChange={(e) => setSnippetCode(e.target.value)}
                    />
                    <SyntaxHighlighter language="javascript" style={style} showLineNumbers={true} wrapLongLines={true}>
                        {snippetCode === '' ? ' ' : snippetCode}
                    </SyntaxHighlighter>
                </SnippetCodeViewDiv>
                {snippetCodeError && <CodeErrorTextDiv>{snippetCodeError}</CodeErrorTextDiv>}
                <SnippetViewFooterDiv>
                    <SnippetViewFooterText>javascript</SnippetViewFooterText>
                </SnippetViewFooterDiv>
                
                <SubmitHeaderDiv>
                    <SubmitButton type="submit">
                        Submit
                    </SubmitButton>
                </SubmitHeaderDiv>
            </SnippetViewContentContainerForm>
        </SnippetViewDiv>
    );
}

export default UploadSnippetView;
