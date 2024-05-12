import {
    Link
} from 'react-router-dom';

import {
    Logo1,
    OuterFlexDiv,
    PaddingDiv
} from '../atoms/styled';

interface CenterAlignedPageProps {
    children: JSX.Element;
}

function CenterAlignedPage(props: CenterAlignedPageProps): JSX.Element {
    return (
        <OuterFlexDiv>
            <Link to={'/'}>
                <Logo1 />
            </Link>
            {props.children}
            <PaddingDiv height='100px'/>
        </OuterFlexDiv>
    );
}

export default CenterAlignedPage;
