import styled from 'styled-components';

import {
    OuterFlexDiv
} from '../components/atoms/styled';
import NavBar from '../components/organisms/NavBar';
import PagedListView from '../components/organisms/SearchResultListView';
import { snippets } from '../constants/testSets';
import { useState } from 'react';

const MainFlexDiv = styled(OuterFlexDiv)`
    justify-content: flex-start;
    min-height: 100%;
    height: auto;
`;

function Main(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string | null>(null);

    return (
        <MainFlexDiv>
            <NavBar onSearch={setSearchQuery} />
            <PagedListView
                query={searchQuery}
                items={snippets}
                onItemSelect={(item) => console.log(item)}
            />
        </MainFlexDiv>
    );
}

export default Main;
