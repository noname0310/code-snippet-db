import styled from 'styled-components';

import {
    OuterFlexDiv
} from '../components/atoms/styled';
import NavBar from '../components/organisms/NavBar';
import PagedListView from '../components/organisms/SearchResultListView';
import { SnippetData, staticSnippets } from '../constants/testSets';
import { useCallback, useEffect, useState } from 'react';
import SnippetView from '../components/organisms/SnippetView';
import useDebouncedIsMobile from '../hooks/useDebouncedIsMobile';
import UploadSnippetView from '../components/organisms/UploadSnippetView';
import { getSnippets } from '../gql/queries';
import { useApolloClient } from '@apollo/client';
import { createSnippet } from '../gql/mutations';
import { CodeSnippetInput } from '../__generated__/globalTypes';
import useToast from '../contexts/ToastContext';

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
    const toast = useToast();
    const isMobile = useDebouncedIsMobile();

    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [selectedSnippet, setSelectedSnippet] = useState<SnippetData | null>(null);

    const [isUploadFormOpen, setIsUploadFormOpen] = useState<boolean>(false);
    const [initialSnippetName, setInitialSnippetName] = useState<string>('');

    const apolloClient = useApolloClient();
    const [updateSnippetFlag, setUpdateSnippetFlag] = useState<boolean>(false);
    const [snippets, setSnippets] = useState<SnippetData[] | null>(null);
    useEffect(() => {
        getSnippets(apolloClient).then(queryResult => {
            setSnippets([...staticSnippets, ...queryResult.data.snippets.map<SnippetData>(snippet => ({
                id: snippet.id.toString(),
                name: snippet.name,
                author: snippet.author.username,
                description: snippet.description,
                content: snippet.content,
                contentLanguage: snippet.contentLanguage,
            }))]);
        }).catch(e => {
            e;
            toast.showToast('Failed to fetch snippets', 'error');
        });
    }, [apolloClient, updateSnippetFlag]);


    const isSideViewOpen = selectedSnippet !== null;

    const handleOpenUploadForm = useCallback(() => {
        setIsUploadFormOpen(true);
        if (searchQuery !== null) setInitialSnippetName(searchQuery);
    }, [searchQuery]);

    const pagedListView = isMobile && isSideViewOpen || isUploadFormOpen
        ? null
        : <PagedListView
            query={searchQuery}
            items={snippets ?? staticSnippets}
            onItemSelect={(item) => setSelectedSnippet(item)}
            sidebar={isSideViewOpen}
            onUpload={handleOpenUploadForm} />;
            
    const sideView = isUploadFormOpen
        ? <UploadSnippetViewOuterDiv>
            <UploadSnippetView
                initialSnippetName={initialSnippetName}
                onClose={() => setIsUploadFormOpen(false)}
                onSubmit={async (snippet) => {
                    const codeSnippetInput: CodeSnippetInput = {
                        name: snippet.name,
                        description: snippet.description,
                        content: snippet.content,
                        contentLanguage: snippet.contentLanguage,
                    };
                    try {
                        await createSnippet(apolloClient, {
                            snippet: codeSnippetInput
                        });
                    } catch (e) {
                        toast.showToast('Failed to create snippet', 'error');
                        return;
                    }

                    setUpdateSnippetFlag((prev) => !prev);
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
