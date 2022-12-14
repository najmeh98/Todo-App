import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Header } from "../components/Header";
import { Item } from "../components/Item";
import { Column, Row } from "../components/shared/Container";
import { Space } from "../components/shared/Space";
import SideBar from "../components/SideBar";
import { TodoForm } from "../components/TodoForm";
import { EmptyTask, TodoList } from "../components/TodoList";
import { desktop, Mobile, noMobile, notdesktop, tablet } from "../utils/media";
export interface Todoprop {
  id: number;
  value: string;
  completed: boolean;
}

const Home: NextPage = () => {
  const [listTodos, setListTodos] = useState<Todoprop[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [hasLoded, setHasLoded] = useState(false);
  const [filterTodo, setFilterTodo] = useState<Todoprop[]>([]);
  //save list of tasks in localStorage
  useEffect(() => {
    if (hasLoded) {
      localStorage.setItem("list", JSON.stringify(listTodos));
    }
  }, [hasLoded, listTodos]);

  //get list of tasks in LocalStorage
  useEffect(() => {
    if (!hasLoded) {
      let savedTask = localStorage.getItem("list");
      if (savedTask) {
        setListTodos(JSON.parse(savedTask));
      }
    }
    setHasLoded(true);
  }, [hasLoded]);

  //filterHandler
  const filterHandler = useCallback(
    (filter) => {
      setFilter(filter);
      switch (filter) {
        case "Completed":
          setFilterTodo(listTodos.filter((task) => task.completed));
          break;
        case "Uncompleted":
          setFilterTodo(listTodos.filter((task) => !task.completed));
          break;
        default:
          setFilterTodo(listTodos);
          break;
      }
    },
    [listTodos]
  );

  useEffect(() => {
    filterHandler(filter);
  }, [filter, filterHandler, listTodos]);

  const handleDeleteTask = (id: number) => {
    let index = listTodos.findIndex((p) => p.id === id);
    setListTodos([...listTodos.slice(0, index), ...listTodos.slice(index + 1)]);
  };

  const handleChangeTask = (value: string, id: number) => {
    // return listTodos.map((item) => {
    //   if (item.id === id) {
    //     item.value = value;
    //   } else {
    //     return item;
    //   }
    // });
    let index = listTodos.findIndex((p) => p.id === id);
    //prev value
    // let task = listTodos[index].value;
    setListTodos([
      ...listTodos.slice(0, index),
      { ...listTodos[index], value: value },
      ...listTodos.slice(index + 1),
    ]);
  };

  const CompleteHandler = (id: number) => {
    setListTodos(
      listTodos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        } else {
          return item;
        }
      })
    );
  };
  const submitHandler = (e: { preventDefault: () => void }, value: string) => {
    // e.preventDefault();
    setListTodos([
      ...listTodos,
      {
        value: value,
        completed: false,
        id: Math.floor(Math.random() * 1000),
      },
    ]);
    // setTodoValue("");
  };

  return (
    <Wrapper>
      {/* <Container> */}
      <Header />

      <MainContainer>
        <Row>
          <Column>
            <TodoForm
              listTodos={listTodos}
              setListTodos={setListTodos}
              item={{
                value: "",
                id: 0,
              }}
              isEditing={false}
            />

            <Space vertical={60} />

            <Text> My Tasks ???????</Text>

            <Space vertical={30} />

            <TodoList
              filterTodo={filterTodo}
              onDeleteTask={handleDeleteTask}
              onChangeTask={handleChangeTask}
              CompleteHandler={CompleteHandler}
            />
          </Column>
          {/* <img src="No data-cuate.png" alt="emptyTask" /> */}
        </Row>

        <Item
          filterHandler={filterHandler}
          setSelectedItem={setFilter}
          selectedItem={filter}
        />
      </MainContainer>
      {/* </Container> */}
      {filterTodo.length == 0 && <EmptyTask />}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  padding: 32px;
  font-size: 16px;
  line-height: 24px;
  /* background-color: #fff; */
  /* background-color: #023047; */
  height: 100vh;
  /* width: 100vw; */
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  overflow-y: auto;
  overflow-x: hidden;
  ${Mobile(css`
    padding: 40px;
  `)}
`;
const Container = styled.div`
  background-color: #fff;
  box-shadow: "0 1px 11px hsl(0deg 0% 66% / 27%)";

  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 50px;
  height: 100%;
  min-height: 100%;
  width: 100%;
  ${tablet(css`
    padding: 20px;
  `)}
  ${Mobile(css`
    padding: 15px;
  `)}
  ${desktop(css`
    padding: 20px 50px;
  `)}
`;
const MainContainer = styled.div`
  gap: 80px;
  display: flex;

  margin-top: 40px;
  justify-content: space-between;
  ${tablet(css`
    gap: 50px;
  `)}
  ${Mobile(css`
    display: flex;
    flex-direction: column-reverse;
    /* justify-content: flex-end; */
    width: 100%;
    gap: 20px;
  `)}
  ${notdesktop(css`
    justify-content: space-between;
  `)}
`;

const Text = styled.h2`
  /* margin-top: 60px; */
  ${Mobile(css`
    margin: 0;
  `)}
`;
