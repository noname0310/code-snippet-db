import styled from 'styled-components';
import { SnippetData, findSnippets } from '../../constants/testSets';
import { useMemo } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as hljsStyles from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface ListViewContainerDivProps {
    sidebar: boolean;
}

const ListViewContainerDiv = styled.div<ListViewContainerDivProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    overflow: auto;
    scrollbar-gutter: stable;
    margin-bottom: 20px;

    width: ${props => props.sidebar ? '447px' : '100%'};
    border-right: ${props => props.sidebar ? '3px solid ' + props.theme.colors.secondary : 'none'};
`;

const ListViewItemDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 1000px;
    max-width: calc(100% - 40px);
    
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;

    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primaryInverse};

    :active {
        background-color: ${props => props.theme.colors.tertiary};
        color: ${props => props.theme.colors.secondaryInverse};
    }

    cursor: pointer;
`;

const ListViewHeaderDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    
    box-sizing: border-box;

    padding: 0px 10px;
`;

const ListViewTitleDiv = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: start;
    
    box-sizing: border-box;

    font-size: 20px;
`;

const ListViewDescriptionDiv = styled.div`
    flex: 1;
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
`;

const ListViewDescriptionText = styled.p`
    margin: 0;
    margin-top: 5px;
`;

interface ListViewItemProps {
    item: SnippetData;
    onClick: () => void;
}

function ListViewItem(props: ListViewItemProps): JSX.Element {
    const { item, onClick } = props;

    const style = useMemo((): { [key: string]: React.CSSProperties } => {
        return {
            ...hljsStyles.vs2015 || hljsStyles.vs,
            'hljs': {
                ...hljsStyles.vs2015['hljs'] || hljsStyles.vs['hljs'],
                'width': '100%',
                'padding': '10px',
                'boxSizing': 'border-box',
            },
        };
    }, []);

    return (
        <ListViewItemDiv onClick={onClick}>
            <ListViewHeaderDiv>
                <ListViewTitleDiv>
                    {item.name}
                </ListViewTitleDiv>
                <ListViewDescriptionDiv>
                    {item.description.trim().split('\n').slice(0, 3).map((line, idx) => (
                        <ListViewDescriptionText key={idx}>{line}</ListViewDescriptionText>
                    ))}
                </ListViewDescriptionDiv>
            </ListViewHeaderDiv>
              
            <SyntaxHighlighter language="javascript" style={style}>
                {item.code.trimStart().split('\n').slice(0, 9).join('\n')}
            </SyntaxHighlighter>
        </ListViewItemDiv>
    );
}

interface PagedListViewProps {
    query: string | null;
    items: SnippetData[];
    onItemSelect: (item: SnippetData) => void;
    sidebar: boolean;
}

function PagedListView(props: PagedListViewProps): JSX.Element {
    const { query, items, onItemSelect, sidebar } = props;

    const queryResult = useMemo(() => {
        const data = !query
            ? items
            : findSnippets(query, items);

        return data.map(item => (
            <ListViewItem key={item.id} item={item} onClick={() => onItemSelect(item)}/>
        ));
    }, [query, items, items.length]);

    return (
        <ListViewContainerDiv sidebar={sidebar}>
            {queryResult}
        </ListViewContainerDiv>
    );
}

export default PagedListView;
