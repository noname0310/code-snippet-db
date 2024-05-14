import styled from 'styled-components';

import SyntaxHighlighter from 'react-syntax-highlighter';
import * as hljsStyles from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SnippetData } from '../../constants/testSets';
import { useMemo, useState } from 'react';
import { MEDIA_MAX_WIDTH } from '../../constants/css';

import { Linter } from 'eslint-linter-browserify';
import LintOptionForm, { LintOption } from './LintOptionForm';
import { Button1 } from '../atoms/styled';
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

const SnippetViewContentContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    
    box-sizing: border-box;

    padding: 20px 20px;

    width: 100%;
    overflow-y: auto;
`;

const SnippetViewHeaderDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    
    box-sizing: border-box;
    margin-bottom: 10px;
`;

const SnippetViewTitleDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column; 
    align-items: start;
    justify-content: start;
`;

const SnippetViewTitleText = styled.h1`
    margin: 0;
    padding: 0;
    font-size: 20px;
`;

const SnippetViewAuthorDiv = styled.div`
    font-size: 15px;
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

const CodeHeaderDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: end;
    justify-content: start;
`;

const LintOptionFormOuterDiv = styled.div`
    width: calc(100% - 90px);
`;

const CopyButton = styled(Button1)`
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

const SnippetViewFooterDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    
    box-sizing: border-box;

    padding: 0px 10px;
`;

const SnippetViewFooterText = styled.p`
    margin: 0;
    padding: 0;
    font-size: 10px;
`;

interface SnippetViewProps {
    snippet: SnippetData;
    onClose: () => void;
}

function SnippetView(props: SnippetViewProps): JSX.Element {
    const { snippet, onClose } = props;

    const [linter] = useState<Linter>(() => {
        return new Linter({ configType: 'flat' });
    });
    
    const [lintOption, setLintOption] = useState<LintOption>({
        indent: null,
        semi: null,
        linebreakStyle: null,
        quotes: null,
        braceStyle: null
    });

    const style = useMemo((): { [key: string]: React.CSSProperties } => {
        return {
            ...hljsStyles.vs2015 || hljsStyles.vs,
            'hljs': {
                ...hljsStyles.vs2015['hljs'] || hljsStyles.vs['hljs'],
                'width': '100%',
                'height': 'auto',
                'padding': '10px',
                'boxSizing': 'border-box',
                'overflowX': 'clip'
            }
        };
    }, []);

    const [lintedCode, errorMessages] = useMemo((): [string, string | null] => {
        const option = lintOption;

        const rules: Partial<Linter.RulesRecord> = { };
        if (option.indent) {
            rules['indent'] = ['error', option.indent];
        }
        if (option.semi) {
            rules['semi'] = ['error', option.semi];
        }
        if (option.linebreakStyle) {
            rules['linebreak-style'] = ['error', option.linebreakStyle];
        }
        if (option.quotes) {
            rules['quotes'] = ['error', option.quotes];
        }
        if (option.braceStyle) {
            rules['brace-style'] = ['error', option.braceStyle];
        }

        const flatConfig: Linter.FlatConfig[] = [{
            languageOptions: {
                ecmaVersion: 2020,
                // parser:
                parserOptions: {
                    ecmaVersion: 2020,
                    ecmaFeatures: {
                        jsx: true
                    }
                },
            },
            rules: rules
        }];

        const messages = linter.verifyAndFix(
            snippet.code,
            flatConfig,
            { fix: true }
        );

        const errorMessages = messages.fixed
            ? null
            : messages.messages.filter((message) => message.severity === 2).map((message) => message.message).join('\n');

        return [messages.output || snippet.code, errorMessages];
    }, [snippet.code, linter, lintOption]);

    const toast = useToast();

    return (
        <SnippetViewDiv>
            <SnippetViewTopBarDiv>
                <SnippetViewCloseButton onClick={() => onClose()}>Close</SnippetViewCloseButton>
            </SnippetViewTopBarDiv>
            <SnippetViewContentContainerDiv>
                <SnippetViewHeaderDiv>
                    <SnippetViewTitleDiv>
                        <SnippetViewTitleText>{snippet.name}</SnippetViewTitleText>
                    </SnippetViewTitleDiv>
                    <SnippetViewAuthorDiv>
                        {snippet.author}
                    </SnippetViewAuthorDiv>
                </SnippetViewHeaderDiv>
                <SnippetViewDescriptionDiv>
                    {snippet.description.split('\n').map((description, index) => (
                        <SnippetViewContentText key={index}>{description}</SnippetViewContentText>
                    ))}
                </SnippetViewDescriptionDiv>
                <CodeHeaderDiv>
                    <LintOptionFormOuterDiv>
                        <LintOptionForm lintOption={lintOption} onLintOptionChange={setLintOption} error={errorMessages}/>
                    </LintOptionFormOuterDiv>
                    <CopyButton onClick={() => {
                        navigator.clipboard.writeText(lintedCode);
                        toast.showToast('Copied to clipboard', 'info');
                    }}>
                        Copy
                    </CopyButton>
                </CodeHeaderDiv>
                <SyntaxHighlighter language="javascript" style={style} showLineNumbers={true} wrapLongLines={true}>
                    {lintedCode}
                </SyntaxHighlighter>
                <SnippetViewFooterDiv>
                    <SnippetViewFooterText>{snippet.language}</SnippetViewFooterText>
                </SnippetViewFooterDiv>
            </SnippetViewContentContainerDiv>
        </SnippetViewDiv>
    );
}

export default SnippetView;
