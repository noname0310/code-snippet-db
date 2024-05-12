import { useCallback, useMemo } from 'react';
import styled from 'styled-components';

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

interface ListViewItem {
    id: string;
    name: string;
}

interface ListViewProps {
    items: ListViewItem[];
}

function ListView(props: ListViewProps): JSX.Element {
    const { items } = props;

    return (
        <ListViewContainerDiv>
            {items.map(item => (
                <ListViewItemDiv key={item.id}>
                    {item.name}
                </ListViewItemDiv>
            ))}
        </ListViewContainerDiv>
    );
}

const PagenatorContainerDiv = styled.div`
    margin: 20px 0;
`;

interface PageinatorButtonProps {
    isCurrentPage: boolean;
}

const PagenatorButton = styled.button<PageinatorButtonProps>`
    padding: 10px;
    border: none;
    font-size: 15px;
    background-color: ${props => {
        if (props.isCurrentPage) {
            return props.theme.colors.primary;
        }
        return props.theme.colors.secondary;
    }};
    color: ${props => props.theme.colors.primaryInverse};
    cursor: pointer;
    outline: none;
    
    width: 50px;
    margin: 0 8px;

    &:hover {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.backgroundInverse};
    }

    &:active {
        background-color: ${props => props.theme.colors.tertiary};
        color: ${props => props.theme.colors.backgroundInverse};
    }
`;

interface PagenationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagenation(props: PagenationProps): JSX.Element {
    const { currentPage, totalPages, onPageChange } = props;

    const handlePageChange = useCallback((page: number) => {
        onPageChange(page);
    }, [onPageChange]);

    const computePageButtonRange = useCallback((): [number, number] => {
        const maxPageButtons = 5;
        const halfMaxPageButtons = Math.floor(maxPageButtons / 2);

        const startPage = Math.max(currentPage - halfMaxPageButtons, 1);
        const endPage = Math.min(currentPage + halfMaxPageButtons, totalPages);

        return [startPage, endPage];
    }, [currentPage, totalPages]);

    const buttonIndexArray = useMemo(() => {
        const [startPage, endPage] = computePageButtonRange();

        return Array.from(Array(endPage - startPage + 1).keys()).map(i => i + startPage);
    }, [computePageButtonRange]);

    return (
        <PagenatorContainerDiv>
            { (buttonIndexArray.at(0) ?? 0) > 1 && (
                <PagenatorButton onClick={() => handlePageChange((buttonIndexArray.at(0) ?? 2) - 1)} isCurrentPage={false}>
                    {'<'}
                </PagenatorButton>
            )}
            {buttonIndexArray.map(page => (
                <PagenatorButton key={page} onClick={() => handlePageChange(page)} isCurrentPage={page === currentPage}>
                    {page}
                </PagenatorButton>
            ))}
            { (buttonIndexArray.at(-1) ?? 0) < totalPages && (
                <PagenatorButton onClick={() => handlePageChange((buttonIndexArray.at(-1) ?? 0) + 1)} isCurrentPage={false}>
                    {'>'}
                </PagenatorButton>
            )}
        </PagenatorContainerDiv>
    );
}

interface PagedListViewProps {
    items: ListViewItem[];
    pageCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

function PagedListView(props: PagedListViewProps): JSX.Element {
    const { items, pageCount, currentPage, onPageChange } = props;

    return (
        <>
            <ListView items={items}/>
            <Pagenation currentPage={currentPage} totalPages={pageCount} onPageChange={onPageChange}/>
        </>
    );
}

export default PagedListView;
