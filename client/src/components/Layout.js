import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

function Header() {
    return <></>;
}

const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ContentDiv = styled.div`
    width: 80%;
    margin: 20px auto;
`;

function Layout(props) {
    return (
        <ContainerDiv>
            <Navbar />
            <ContentDiv>
                <Header />
                <main>
                    {props.children}
                </main>
                <footer>
                    <p>This is a footer</p>
                </footer>
            </ContentDiv>
        </ContainerDiv >
    )
}

export default Layout;