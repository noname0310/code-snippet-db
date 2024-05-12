import {
    memo,
    useCallback,
    useEffect,
    useState} from 'react';
import { 
    Link
} from 'react-router-dom';
import styled from 'styled-components';

import { MEDIA_MAX_WIDTH } from '../../constants/css';
import useDebounce from '../../hooks/useDebounce';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import useCurrentUser from '../../hooks/useCurrentUser';
import useWindowSize from '../../hooks/useWindowSize';
import MenuButton from '../atoms/MenuButton';
import { LogoSmall1, PaddingDiv } from '../atoms/styled';

const NavBarOuterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    height: 60px;
    width: 100%;
    background-color: ${props => props.theme.colors.secondary};
    box-sizing: border-box;

    position: relative;
    z-index: 1;
`;

const NavBarDiv = styled.div`
    display: flex;
    align-items: center;

    width: 500px;
    height: 100%;
    padding: 0px 20px;
`;

const NavBarLeftDiv = styled(NavBarDiv)`
    justify-content: flex-start;
`;

const NavBarRightDiv = styled(NavBarDiv)`
    justify-content: flex-end;
`;

const NavBarLink = styled(Link)`
    height: 100%;
    min-width: 100px;
    font-size: 15px;
    padding: 0px 10px;
    text-decoration: none;

    background-color: rgba(255, 255, 255, 0);
    color: ${props => props.theme.colors.backgroundInverse};

    &:hover {
        color: ${props => props.theme.colors.buttonHover};
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:active {
        color: ${props => props.theme.colors.buttonActive};
        background-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: ${MEDIA_MAX_WIDTH}px) {
        height: 50px;
        width: 100%;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        padding: 0px 40px;
    }

    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavBarButton = styled.button`
    height: 100%;
    min-width: 100px;
    border: none;
    font-size: 15px;
    padding: 0px 10px;

    background-color: rgba(255, 255, 255, 0);
    color: ${props => props.theme.colors.backgroundInverse};

    &:hover {
        color: ${props => props.theme.colors.buttonHover};
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:active {
        color: ${props => props.theme.colors.buttonActive};
        background-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: ${MEDIA_MAX_WIDTH}px) {
        height: 50px;
        width: 100%;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        padding: 0px 40px;
    }
`;

const UserInfoDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    
    @media (max-width: ${MEDIA_MAX_WIDTH}px) {
        height: 50px;
        width: 100%;
    }
`;

function LeftNavBarButtons(): JSX.Element {
    return (
        <>
            <NavBarButton>
                Button1
            </NavBarButton>
            <NavBarButton>
                Button2
            </NavBarButton>
            <NavBarButton>
                Button3
            </NavBarButton>
        </>
    );
}

function RightNavbarButtons(): JSX.Element {
    const isLoggedIn = useIsLoggedIn();
    const user = useCurrentUser();
    return (
        <>
            <UserInfoDiv>
                { !isLoggedIn ?  (
                    <NavBarLink to={'/login'}>
                        Sign In
                    </NavBarLink>
                ) : (
                    <NavBarLink to={'/logout'}>
                        {user?.username ?? '...'}
                    </NavBarLink>
                ) }
            </UserInfoDiv>
        </>
    );
}

function PcNavBar(): JSX.Element {
    return (
        <NavBarOuterDiv>
            <NavBarLeftDiv>
                <Link to={'/'}>
                    <LogoSmall1/>
                </Link>
                <LeftNavBarButtons/>
            </NavBarLeftDiv>
            <NavBarRightDiv>
                <RightNavbarButtons/>
            </NavBarRightDiv>
        </NavBarOuterDiv>
    );
}

interface MobileNavBarPanelDivProps {
    isOpen: boolean;
}

const MobileNavBarPanelDiv = styled.div<MobileNavBarPanelDivProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 60px;
    width: 100%;

    background-color: ${props => props.theme.colors.secondary};
    transition: 0.3s;
    transform: ${props => props.isOpen ? 'translateY(0%)' : 'translateY(-100%)'};
`;

function MobileNavBar(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    return (
        <>
            <NavBarOuterDiv>
                <NavBarLeftDiv>
                    <LogoSmall1 />
                </NavBarLeftDiv>
                <NavBarRightDiv>
                    <MenuButton isOpen={isOpen} onClick={handleClick}/>
                </NavBarRightDiv>
            </NavBarOuterDiv>
            <MobileNavBarPanelDiv isOpen={isOpen}>
                <LeftNavBarButtons/>
                <PaddingDiv height='30px'/>
                <RightNavbarButtons/>
            </MobileNavBarPanelDiv>
        </>
    );
}

const PcNavBarMemo = memo(PcNavBar);
const MobileNavBarMemo = memo(MobileNavBar);

function NavBar(): JSX.Element {
    const [isMobile, setIsMobile] = useState(false);
    const [debouncedIsMobile, setDebouncedIsMobile] = useState(false);
    const windowSize = useWindowSize();

    useDebounce(() => {
        setDebouncedIsMobile(isMobile);
    }, 500, [isMobile, setDebouncedIsMobile]);

    useEffect(() => {
        setDebouncedIsMobile(window.innerWidth < MEDIA_MAX_WIDTH);
    }, []);

    useEffect(() => {
        setIsMobile(windowSize.width < MEDIA_MAX_WIDTH);
    }, [windowSize.width]);

    return (
        <>
            {!debouncedIsMobile ? <PcNavBarMemo /> : <MobileNavBarMemo />}
        </>
    );
}

export default NavBar;
