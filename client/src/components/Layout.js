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
    margin: 0;
`;

const ContentDiv = styled.div`
    margin-top: 20px;
    width: 100%;
`;

const StyledFooter = styled.footer`
    width: 100%;
    min-height: 10vh;
    background-color: #333;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
`;

function Footer() {
    return (
        <StyledFooter>
            <div>
                כל הזכויות שמורות.
            </div>
        </StyledFooter>
    );
}

function Layout(props) {
    return (
        <ContainerDiv>
            <Navbar />
            <ContentDiv>
                <Header />
                <main style={{ minHeight: '90vh', margin: 'auto 50px' }}>
                    {props.children}
                </main>
                <Footer />
            </ContentDiv>
        </ContainerDiv >
    )
}

export default Layout;