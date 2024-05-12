import React, { useState, useEffect } from 'react';
import {
    Link
} from 'react-router-dom';
import styled from 'styled-components';

interface Circle {
    x: number;
    y: number;
    r: number;
    color: number;
}
interface XY {
    x: number;
    y: number;
}

const circleColors = ['111111', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999'];

function genCircles(startColor: number) {
    const circles: Circle[] = [];

    let position = 0;
    let i = 0;
    while(position < (window.innerHeight * 2 + window.innerWidth * 2)) {
        let x, y;
        if(position < window.innerWidth) {
            x = position;
            y = 0;
        } else if(position < (window.innerWidth + window.innerHeight)) {
            x = window.innerWidth;
            y = position - window.innerWidth;
        } else if(position < (window.innerWidth * 2 + window.innerHeight)) {
            x = window.innerWidth - (position - window.innerWidth - window.innerHeight);
            y = window.innerHeight;
        } else {
            x = 0;
            y = window.innerHeight - (position - (window.innerWidth * 2 + window.innerHeight));
        }

        circles.push({
            x,
            y,
            r: 110,
            color: (startColor + i) % circleColors.length
        });
        position += 165;
        i++;
    }

    return circles;
}

const RelativeDiv = styled.div`
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    background-color: white;
`;

const Centerer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

function Circle({ x, y, r, color }: Circle) {
    return (
        <div style={{
            position: 'absolute',
            top: y + 'px',
            left: x + 'px',
            backgroundColor: '#' + circleColors[color],
            width: 2*r + 'px',
            height: 2*r + 'px',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)'
        }}>
        </div>
    );
}

function CircleContainer() {
    const startColor = Math.floor(Math.random() * circleColors.length);
    const [circles, setCircles] = useState(() => genCircles(startColor));
    
    const [randoms, ] = useState<XY[]>(() => (
        new Array(10000).fill(null).map(() => ({x:Math.random()*40 - 20, y:Math.random()*40 - 20})) as unknown as XY[]
    ));

    useEffect(() => {
        function onResize() {
            setCircles(() => genCircles(startColor));
        }

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <RelativeDiv>
            {
                circles.map((circle, i) => (
                    <Circle key={i} {...{
                        x: circle.x + randoms[i].x,
                        y: circle.y + randoms[i].y,
                        r: circle.r,
                        color: circle.color
                    }}/>
                ))
            }
        </RelativeDiv>
    );
}

const CenteredLink = styled(Link)`
display: flex;
justify-content: center;
`;
const Error404 = styled.img`
width: 70%;
min-width: 200px;
`;


const Title = styled.h1`
    margin-top: 70px;
    margin-bottom: 0;
`;

function Notfound(){
    return (
        <div>
            <CircleContainer/>
            <Centerer>
                <CenteredLink to="/"><Error404 src="/static/Error404.svg"/></CenteredLink>
                <Title>404 Not Found :(</Title>
            </Centerer>
        </div>
    );
}

export default Notfound;
