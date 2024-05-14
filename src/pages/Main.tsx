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
import UploadSnippetView from '../components/organisms/UploadSnippetView';

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

const UploadSnippetViewOuterDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
`;

function Main(): JSX.Element {
    const isMobile = useDebouncedIsMobile();

    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [selectedSnippet, setSelectedSnippet] = useState<SnippetData | null>(null);

    const [isUploadFormOpen, setIsUploadFormOpen] = useState<boolean>(false);

    const isSideViewOpen = selectedSnippet !== null;

    const pagedListView = isMobile && isSideViewOpen || isUploadFormOpen
        ? null
        : <PagedListView
            query={searchQuery}
            items={snippets}
            onItemSelect={(item) => setSelectedSnippet(item)}
            sidebar={isSideViewOpen}
            onUpload={() => setIsUploadFormOpen(true)} />;
            
    const sideView = isUploadFormOpen
        ? <UploadSnippetViewOuterDiv>
            <UploadSnippetView
                onClose={() => setIsUploadFormOpen(false)}
                onSubmit={(snippet) => {
                    console.log(snippet);
                    snippets.push(snippet);
                    setIsUploadFormOpen(false);
                }} />
        </UploadSnippetViewOuterDiv>
        : selectedSnippet !== null    
            ? <SnippetView
                snippet={selectedSnippet}
                onClose={() => setSelectedSnippet(null)} />
            : null;

    return (
        <MainFlexDiv>
            <NavBar onSearch={setSearchQuery} />
            <ContentContainerDiv>
                {pagedListView}
                {sideView}
            </ContentContainerDiv>
        </MainFlexDiv>
    );
}

export default Main;
