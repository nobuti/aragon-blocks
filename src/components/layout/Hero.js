import styled from "styled-components";

const Main = styled.div`
  background: #8e2de2;
  background: linear-gradient(to right, #4a00e0, #8e2de2);
`;

const Content = styled.div`
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  padding: 64px 0;

  h2 {
    margin-bottom: 24px;
  }
`;

const Left = styled.div`
  flex: 1;
  padding-right: 24px;
`;

const Right = styled.div`
  flex: 1;
  padding-left: 24px;

  ${Content} &:last-child {
    display: none;
  }

  @media (min-width: 740px) {
    ${Content} &:last-child {
      display: block;
    }
  }
`;

const Action = styled.div`
  padding: 48px 0;

  a {
    font-weight: 700;
    font-size: 12px;
  }
`;

const Hero = {
  Main,
  Content,
  Left,
  Right,
  Action
};

export default Hero;
