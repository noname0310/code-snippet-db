import styled from 'styled-components';
import { SnippetData, findSnippets } from '../../constants/testSets';
import { useMemo } from 'react';

const ListViewContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
`;

const ListViewItemDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 1000px;
    max-width: calc(100% - 40px);
    
    padding: 30px 0;
    margin-top: 20px;
    box-sizing: border-box;

    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primaryInverse};

    :active {
        background-color: ${props => props.theme.colors.tertiary};
        color: ${props => props.theme.colors.secondaryInverse};
    }

    cursor: pointer;
`;

interface PagedListViewProps {
    query: string | null;
    items: SnippetData[];
    onItemSelect: (item: SnippetData) => void;
}

function PagedListView(props: PagedListViewProps): JSX.Element {
    const { query, items, onItemSelect } = props;

    const queryResult = useMemo(() => {
        if (!query) {
            return items;
        }

        return findSnippets(query, items);
    }, [query, items, items.length]);

    return (
        <ListViewContainerDiv>
            {queryResult.map(item => (
                <ListViewItemDiv key={item.id} onClick={() => onItemSelect(item)}>
                    {item.name}
                </ListViewItemDiv>
            ))}
        </ListViewContainerDiv>
    );
}

export default PagedListView;
