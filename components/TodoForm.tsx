import { useState } from "react";
import styled from "styled-components";
import { Todoprop } from "../pages";
import { useTheme } from "./Context/ThemeContext";
import { StandardInput } from "./Input";

type Props = {
  item: { value: string; id: number };
  listTodos: any;
  setListTodos: ([]) => void;
  isEditing: boolean;
};

export const TodoForm = ({
  listTodos,
  item,
  setListTodos,
  isEditing,
}: Props) => {
  let theme = useTheme();
  const [todoValue, setTodoValue] = useState<string>(item?.value || "");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setTodoValue(value);
  };

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setListTodos([
      ...listTodos,
      {
        value: todoValue,
        completed: false,
        id: Math.floor(Math.random() * 1000),
      },
    ]);
    setTodoValue("");
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <StandardInput
          value={todoValue}
          onChange={changeHandler}
          type="text"
          placeholder="Search your todo"
        />
        {isEditing ? (
          <Button
            style={{
              borderTopRightRadius: theme.borderRadius,
              borderBottomRightRadius: theme.borderRadius,
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            style={{
              borderTopRightRadius: theme.borderRadius,
              borderBottomRightRadius: theme.borderRadius,
            }}
            // onClick={submitHandler}
          >
            Add
          </Button>
        )}
      </Form>
    </>
  );
};

export const Form = styled.form`
  /* max-width: 700px; */
  width: 100%;

  display: flex;
  align-items: center;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;

  /* height: 40px; */
  color: rgb(10, 60, 73);
  &::placeholder {
    color: rgb(10, 60, 73);
    font-size: 16px;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  height: 50px;
  cursor: pointer;
  font-size: 20px;

  color: #fff;
  font-weight: 600;
  background-color: cornflowerblue;
  /* background-image: linear-gradient(
    to bottom,
    #06162d,
    #163655,
    #235b7f,
    #2e82aa,
    #39acd4
  ); */
`;
