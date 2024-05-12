import styled from 'styled-components';

import {
    OuterFlexDiv
} from '../components/atoms/styled';
import NavBar from '../components/organisms/NavBar';
import PagedListView from '../components/organisms/PagedListView';

const MainFlexDiv = styled(OuterFlexDiv)`
    justify-content: flex-start;
    min-height: 100%;
    height: auto;
`;

function Main(): JSX.Element {
    return (
        <MainFlexDiv>
            <NavBar/>
            <PagedListView items={[
                {id: '1', name: 'test'},
                {id: '2', name: 'test2'},
                {id: '3', name: 'test3'},
                {id: '4', name: 'test4'}
            ]} pageCount={10} currentPage={3} onPageChange={() => {/* */}}/>
        </MainFlexDiv>
    );
}

export default Main;
