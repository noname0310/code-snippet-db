import {
    memo,
    useCallback,
    useEffect,
    useState
} from 'react';
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
    padding: 10px;
    height: 50px;
    width: 100%;
    background-color: ${props => props.theme.colors.secondary};
    box-sizing: border-box;

    position: relative;
    z-index: 1;

    @media (max-width: ${MEDIA_MAX_WIDTH}px) {
        padding: 0px 20px;
    }
`;

const NavBarInnerDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    height: 100%;
`;

const NavBarDiv = styled.div`
    display: flex;
    align-items: center;

    width: auto;
    height: 100%;
`;

const NavBarLeftDiv = styled(NavBarDiv)`
    justify-content: flex-start;
    flex-grow: 1;
`;

const NavBarRightDiv = styled(NavBarDiv)`
    justify-content: flex-end;
`;

const NavBarLink = styled(Link)`
    height: 100%;
    min-width: 100px;
    font-size: 15px;
    margin-left: 10px;
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
        margin: 0px;
    }

    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavbarSearchInputDiv = styled.input`
    height: 35px;
    width: 100%;
    padding: 0px 14px;
    margin-left: 20px;
    font-size: 15px;
    border: none;
    color: ${props => props.theme.colors.backgroundInverse};
    background-color: ${props => props.theme.colors.tertiary};
    outline: none;

    &:focus {
        background-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: ${MEDIA_MAX_WIDTH}px) {
        margin-left: 0px;
        margin-right: 20px;
    }
`;

interface NavbarSearchInputProps {
    onSearch: (query: string) => void;
}

function NavbarSearchInput(props: NavbarSearchInputProps): JSX.Element {
    const [query, setQuery] = useState('');

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }, [setQuery]);

    useDebounce(() => props.onSearch(query), 500, [query]);

    return (
        <NavbarSearchInputDiv type='text' placeholder='Search...' onChange={handleSearch}/>
    );
}

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

function PcNavBar(props: NavbarSearchInputProps): JSX.Element {
    return (
        <NavBarOuterDiv>
            <NavBarInnerDiv>
                <NavBarLeftDiv>
                    <Link to={'/'}>
                        <LogoSmall1/>
                    </Link>
                    <NavbarSearchInput onSearch={props.onSearch}/>
                </NavBarLeftDiv>
                <NavBarRightDiv>
                    <RightNavbarButtons/>
                </NavBarRightDiv>
            </NavBarInnerDiv>
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
    top: 50px;
    width: 100%;

    background-color: ${props => props.theme.colors.secondary};
    transition: 0.3s;
    transform: ${props => props.isOpen ? 'translateY(0%)' : 'translateY(-100%)'};
`;

function MobileNavBar(props: NavbarSearchInputProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    return (
        <>
            <NavBarOuterDiv>
                <NavBarLeftDiv>
                    <NavbarSearchInput onSearch={props.onSearch}/>
                </NavBarLeftDiv>
                <NavBarRightDiv>
                    <MenuButton isOpen={isOpen} onClick={handleClick}/>
                </NavBarRightDiv>
            </NavBarOuterDiv>
            <MobileNavBarPanelDiv isOpen={isOpen}>
                <LogoSmall1/>
                <PaddingDiv height='30px'/>
                <RightNavbarButtons/>
            </MobileNavBarPanelDiv>
        </>
    );
}

const PcNavBarMemo = memo(PcNavBar);
const MobileNavBarMemo = memo(MobileNavBar);

interface NavBarProps {
    onSearch: (query: string) => void;
}

function NavBar(props: NavBarProps): JSX.Element {
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
            {!debouncedIsMobile
                ? <PcNavBarMemo onSearch={props.onSearch}/>
                : <MobileNavBarMemo onSearch={props.onSearch}/>
            }
        </>
    );
}

export default NavBar;
