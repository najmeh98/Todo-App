import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";

export const SaveButton = () => {
  let theme = useTheme();
  return (
    <Button
      style={{
        background: theme.color.buttoncolor,
        color: theme.color.textcolor,
        borderTopRightRadius: theme.borderRadius,
        borderBottomRightRadius: theme.borderRadius,
        fontSize: 20,
      }}
      // onClick={() => setIsOpen(false)}
    >
      Save
    </Button>
  );
};
const Button = styled.button`
  padding: 8px 16px;
  border: none;
  height: 50px;
  cursor: pointer;
`;
