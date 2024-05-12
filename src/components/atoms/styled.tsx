import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MEDIA_MAX_WIDTH } from '../../constants/css';

export const OuterFlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    min-height: 500px;
    background-color: ${props => props.theme.colors.background};
`;

export const InnerFlexForm1 = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 500px;
    background-color: ${props => props.theme.colors.secondaryBG};
    padding: 20px;
    box-sizing: border-box;

    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);

    @media (max-width: ${MEDIA_MAX_WIDTH}px) {
        width: calc(100% - 40px);
    }

    border-radius: 30px;
`;

export const InnerFlexDiv1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 500px;
    background-color: ${props => props.theme.colors.secondaryBG};
    padding: 20px;
    box-sizing: border-box;
    
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);

    @media (max-width: ${MEDIA_MAX_WIDTH}px) {
        width: calc(100% - 40px);
    }

    border-radius: 30px;
`;

export const TextInput1 = styled.input`
    width: 100%;
    height: 35px;
    border: none;
    font-size: 15px;
    color: ${props => props.theme.colors.primaryInverse};
    background-color: ${props => props.theme.colors.background};
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05) inset;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 0 10px;
    border-radius: 30px;
`;

export const Button1 = styled.button`
    width: 100%;
    height: 50px;
    border: none;
    background-color: ${props => props.theme.colors.button};
    color: ${props => props.theme.colors.textLightest};
    font-size: 15px;
    padding: 0;
    border-radius: 30px;

    &:hover {
        background-color: ${props => props.theme.colors.buttonHover};
    }

    &:active {
        background-color: ${props => props.theme.colors.buttonActive};
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.colors.link};

    :hover {
        color: ${props => props.theme.colors.linkHover};
    }

    &:active {
        color: ${props => props.theme.colors.linkActive};
    }
`;

const LogoText1 = styled.div`
    width: 300px;
    height: 100px;
    margin-bottom: 20px;

    @media (max-width: ${MEDIA_MAX_WIDTH}px) {
        margin-top: 20px;
    }

    align-items: center;
    justify-content: center;
    display: flex;

    h1 {
        color: ${props => props.theme.colors.textRegular};
        font-size: 30px;
        font-weight: bold;
    }
`;

export function Logo1(): JSX.Element {
    return (
        <LogoText1>
            <h1>code-snippet-db</h1>
        </LogoText1>
    );
}

const LogoTextSmall1 = styled.div`
    width: 180px;
    height: 50px;

    align-items: center;
    justify-content: center;
    display: flex;

    h1 {
        color: ${props => props.theme.colors.textRegular};
        font-size: 20px;
        font-weight: bold;
    }
`;

export function LogoSmall1(): JSX.Element {
    return (
        <LogoTextSmall1>
            <h1>code-snippet-db</h1>
        </LogoTextSmall1>
    );
}

export const LeftAlignDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    font-size: 13px;
`;

interface PaddingDivProps {
    width?: string;
    height?: string;
}

export const PaddingDiv = styled.div<PaddingDivProps>`
    width: ${props => props.width};
    height: ${props => props.height};
`;

export const Title1Div = styled.div`
    font-size: 20px;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 20px;
`;
