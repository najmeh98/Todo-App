import { ReactNode } from "react";
import styled from "styled-components";

export const Layout = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 100vh;
`;
