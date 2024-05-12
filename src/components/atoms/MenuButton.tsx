import styled from 'styled-components';

const Container = styled.div`
    display: inline-block;
    cursor: pointer;
`;

interface BarProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
}

const MenuButtonBarDiv = styled.div`
    width: 35px;
    height: 3px;
    background-color: ${props => props.theme.colors.textRegular};
    margin: 6px 0;
    transition: 0.4s;
`;

const MenuButtonBar1Div = styled(MenuButtonBarDiv)<BarProps>`
    transform: ${props => props.isOpen ? 'translate(0px, 9px) rotate(-45deg)' : 'rotate(0deg)'};
`;

const MenuButtonBar2Div = styled(MenuButtonBarDiv)<BarProps>`
    opacity: ${props => props.isOpen ? '0' : '1'};
`;

const MenuButtonBar3Div = styled(MenuButtonBarDiv)<BarProps>`
    transform: ${props => props.isOpen ? 'translate(0px, -9px) rotate(45deg)' : 'rotate(0deg)'};
`;

interface MenuButtonProps {
    isOpen: boolean;
    onClick?: () => void;
}

function MenuButton(props: MenuButtonProps): JSX.Element {
    const {
        isOpen,
        onClick
    } = props;

    return (
        <Container onClick={onClick}>
            <MenuButtonBar1Div isOpen={isOpen}/>
            <MenuButtonBar2Div isOpen={isOpen}/>
            <MenuButtonBar3Div isOpen={isOpen}/>
        </Container>
    );
}

export default MenuButton;
