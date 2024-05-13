import styled from 'styled-components';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SnippetData } from '../../constants/testSets';
import { useMemo } from 'react';

interface SnippetViewDivProps {
    isMobile: boolean;
}

const SnippetViewDiv = styled.div<SnippetViewDivProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    margin: 20px;
    height: calc(100% - 40px);
    width: ${props => props.isMobile ? 'calc(100% - 40px)' : 'calc(100% - 490px)'};

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
    align-items: center;
`;

const SnippetViewContentText = styled.p`
    margin: 0;
    padding: 0;
    font-size: 15px;
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
    isMobile: boolean;
}

function SnippetView(props: SnippetViewProps): JSX.Element {
    const { snippet, onClose } = props;

    const style = useMemo((): { [key: string]: React.CSSProperties } => {
        return {
            ...vscDarkPlus || vs,
            'pre[class*="language-"]': {
                ...vscDarkPlus['pre[class*="language-"]'] || vs['pre[class*="language-"]'],
                'width': '100%',
                'height': 'auto',
                'overflowY': 'visible',
                'padding': '10px',
                'boxSizing': 'border-box'
            },
        };
    }, []);

    return (
        <SnippetViewDiv isMobile={props.isMobile}>
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
                    <SnippetViewContentText>{snippet.description}</SnippetViewContentText>
                </SnippetViewDescriptionDiv>
                <SyntaxHighlighter language="javascript" style={style}>
                    {snippet.code}
                </SyntaxHighlighter>
                <SnippetViewFooterDiv>
                    <SnippetViewFooterText>{snippet.language}</SnippetViewFooterText>
                </SnippetViewFooterDiv>
            </SnippetViewContentContainerDiv>
        </SnippetViewDiv>
    );
}

export default SnippetView;
