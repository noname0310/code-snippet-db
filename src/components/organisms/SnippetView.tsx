import styled from 'styled-components';

import SyntaxHighlighter from 'react-syntax-highlighter';
import * as hljsStyles from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SnippetData } from '../../constants/testSets';
import { useMemo, useState } from 'react';
import { MEDIA_MAX_WIDTH } from '../../constants/css';

import { Linter } from 'eslint-linter-browserify';

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
    align-items: center;
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
`;

const SnippetViewTitleDiv = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: start;
    
    margin-bottom: 10px;
`;

const SnippetViewTitleText = styled.h1`
    margin: 0;
    padding: 0;
    font-size: 20px;
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

    const lintedCode = useMemo((): string => {
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
            rules: {
                'indent': ['error', 2], // or '4'
                'semi': ['error', 'always'], // or 'never'
                'linebreak-style': ['error', 'unix'], // or 'windows'
                'quotes': ['error', 'single'], // or 'double'
                'brace-style': ['error', '1tbs'], // or 'allman'
            }
        }];

        const messages = linter.verifyAndFix(
            snippet.code,
            flatConfig,
            { fix: true }
        );

        return messages.output || snippet.code;
    }, [snippet.code]);

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
                </SnippetViewHeaderDiv>
                <SnippetViewDescriptionDiv>
                    {snippet.description.split('\n').map((description, index) => (
                        <SnippetViewContentText key={index}>{description}</SnippetViewContentText>
                    ))}
                </SnippetViewDescriptionDiv>
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
