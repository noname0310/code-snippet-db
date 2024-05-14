import styled from 'styled-components';

import {
    OuterFlexDiv
} from '../components/atoms/styled';
import NavBar from '../components/organisms/NavBar';
import PagedListView from '../components/organisms/SearchResultListView';
import { SnippetData, snippets } from '../constants/testSets';
import { useState } from 'react';
import SnippetView from '../components/organisms/SnippetView';
import useDebouncedIsMobile from '../hooks/useDebouncedIsMobile';

const MainFlexDiv = styled(OuterFlexDiv)`
    justify-content: flex-start;
    min-height: 100%;
`;

const ContentContainerDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 50px);
`;

function Main(): JSX.Element {
    const isMobile = useDebouncedIsMobile();

    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [selectedSnippet, setSelectedSnippet] = useState<SnippetData | null>(null);

    const pagedListView = isMobile && selectedSnippet !== null
        ? null
        : <PagedListView
            query={searchQuery}
            items={snippets}
            onItemSelect={(item) => setSelectedSnippet(item)}
            sidebar={selectedSnippet !== null} />;
            
    const snippetView = selectedSnippet !== null    
        ? <SnippetView
            snippet={selectedSnippet}
            onClose={() => setSelectedSnippet(null)} />
        : null;

    return (
        <MainFlexDiv>
            <NavBar onSearch={setSearchQuery} />
            <ContentContainerDiv>
                {pagedListView}
                {snippetView}
            </ContentContainerDiv>
        </MainFlexDiv>
    );
}

export default Main;
