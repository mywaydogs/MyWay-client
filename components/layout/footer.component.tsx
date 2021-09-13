import styled from "styled-components";

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

export default function Footer() {
  return (
    <StyledFooter>
      <div>כל הזכויות שמורות.</div>
    </StyledFooter>
  );
}
