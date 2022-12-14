/* eslint-disable react/jsx-no-duplicate-props */
import { Children, ReactNode, SetStateAction, useState } from "react";
import { useTransition, animated } from "react-spring";
import styled, { css } from "styled-components";
import { TodoMoreIcon } from "./home/icons/icons";
import { Modal } from "./Modal";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { useTheme } from "./Context/ThemeContext";
import { Form, TodoForm } from "./TodoForm";
import { StandardInput } from "./Input";
import { SaveButton } from "./SaveButton";
type Props = {
  item: any;
  onDeleteTask: () => void;
  onChangeTask: (value: string, id: number) => void;
  onCompleteTask: () => void;
  checked: boolean;
  LengthofTask: number;
};

export const TodoTask = ({
  item,
  onDeleteTask,
  onChangeTask,
  onCompleteTask,
  checked,
  LengthofTask,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(item?.value || "");

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  let theme = useTheme();
  const handleMenu = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const HandleEdite = () => {
    setIsEditing(!isEditing);
  };

  let transitions = useTransition(isOpen, {
    from: { x: 20, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 20, opacity: 0 },
  });

  return (
    <>
      {isEditing ? (
        <Form onSubmit={() => onChangeTask(newValue, item?.id)}>
          <StandardInput
            value={newValue}
            type="text"
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setNewValue(e.target.value)
            }
          />
          <SaveButton />
        </Form>
      ) : (
        <>
          <TaskList
            style={{
              backgroundColor: "#fff",
              color: "#000",
              padding: theme.padding,
              boxShadow: theme.boxShadowItem,
              fontWeight: "bold",
            }}
          >
            <Text
              onClick={onCompleteTask}
              style={
                item.completed
                  ? {
                      textDecoration: "line-through",
                      opacity: 0.5,
                    }
                  : { opacity: 1 }
              }
            >
              {item.value}
            </Text>
            <span onClick={handleMenu}>
              <TodoMoreIcon />
            </span>
          </TaskList>
          {transitions(
            (style, item) =>
              item && (
                <Menu>
                  <animated.div
                    style={{
                      position: "absolute",
                      boxShadow: theme.boxShadowbox,
                      backgroundColor: "#fff",
                      padding: "12px",
                      borderRadius: theme.borderRadius,
                      width: theme.width,
                      right: "22px",
                      top: "-10px",
                      ...style,
                    }}
                  >
                    <Item onClick={onDeleteTask}>
                      <p>Delete</p>
                      <MdDelete />
                    </Item>
                    <Item onClick={HandleEdite}>
                      <p>Edit</p>
                      <MdOutlineEdit />
                    </Item>
                  </animated.div>
                </Menu>
              )
          )}
        </>
      )}
    </>
  );
};

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  cursor: pointer;
  list-style-type: none;
  p {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    color: #000;
    font-family: "Quicksand", sans-serif;
  }
`;

const TaskList = styled.div`
  border-radius: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 55px;
`;

const Text = styled.div`
  width: 100%;
  font-size: 19px;
`;

const Menu = styled.div`
  position: relative;
  width: 100%;
`;
