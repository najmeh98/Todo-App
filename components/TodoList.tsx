import { useState } from "react";
import styled from "styled-components";
import { Todoprop } from "../pages";
import { TodoTask } from "./TodoTask";

interface itemsType {
  label: string;
  value: string;
}

interface todoListTask {
  filterTodo: Todoprop[];
  onDeleteTask: (id: number) => void;
  onChangeTask: (value: string, id: number) => void;
  CompleteHandler: (id: number) => void;
}

export const TodoList = ({
  filterTodo,
  onDeleteTask,
  onChangeTask,
  CompleteHandler,
}: todoListTask) => {
  return (
    <>
      {filterTodo &&
        filterTodo?.length > 0 &&
        filterTodo?.map((item: Todoprop, index: number) => {
          return (
            <TodoTask
              key={item.id}
              item={item}
              onDeleteTask={() => onDeleteTask(item.id)}
              onChangeTask={onChangeTask}
              onCompleteTask={() => CompleteHandler(item.id)}
              checked={item.completed}
              LengthofTask={filterTodo.length}
            />
          );
        })}
    </>
  );
};

export const EmptyTask = () => {
  return (
    <EmptyStyle>
      <Text>Todo app is empty 📂... !</Text>
      <img src="empty.png" alt="" />
    </EmptyStyle>
  );
};

const Text = styled.p`
  font-size: 20px;
  font-style: italic;
  display: flex;
  width: 100%;
  justify-content: center;
`;
const EmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
