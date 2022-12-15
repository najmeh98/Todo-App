import { RefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder?: string;
};

export const StandardInput = ({
  value,
  onChange,
  type,
  placeholder,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  let theme = useTheme();

  return (
    <Input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      ref={inputRef}
      style={{
        border: "1px solid cornflowerblue",
        boxShadow: theme.boxShadow,
        borderTopLeftRadius: theme.borderRadius,
        borderBottomLeftRadius: theme.borderRadius,
        height: "50px",
        padding: theme.padding,
        fontSize: theme.fontSize.regular,
        color: "#000",
      }}
    />
  );
};
const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  color: rgb(10, 60, 73);
  &::placeholder {
    color: rgb(10, 60, 73);
    font-size: 16px;
  }
`;
