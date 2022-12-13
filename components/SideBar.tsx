import { useSelect } from "downshift";
import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { Mobile, tablet } from "../utils/media";
import { useTheme } from "./Context/ThemeContext";
import { ArrowDown } from "./home/icons/icons";
import { Row } from "./shared/Container";
import { useHover } from "./useHover";
import Downshift from "downshift";

import Select from "react-select";
type filterItem = {
  filterHandler: (selectedItem: any) => void;
  setSelectedItem: (selectedItem: itemsType) => void;
  selectedItem: itemsType | undefined;
};

type itemsType = {
  label: string;
  value: string;
};
const items: itemsType[] = [
  { label: "All", value: "All" },
  { label: "Completed", value: "Completed" },
  { label: "Uncompleted", value: "Uncompleted" },
];

export default function SideBar({
  filterHandler,
  setSelectedItem,
  selectedItem,
}: filterItem) {
  let [hovered, hoverListener] = useHover();

  const handleSelectedItemChange = (newValue: any) => {
    filterHandler(newValue.value);
  };

  let theme = useTheme();

  let {
    isOpen,
    // selectedItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    openMenu,
  } = useSelect({
    items,
  });

  let menuStyles = {
    borderWidth: 1,
    width: "100%",
    height: 34,
    paddingHorizontal: 4,
    // padding: ThemeContext.padding,
    fontSize: theme.fontSize,
    backgroundColor: theme.color.InputBgcolor,
    // borderWidth: "1px solid",
    borderRadius: theme.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff",
    cursor: "pointer",
  };
  return (
    <>
      <Wrapper>
        {/* <Selectd style={{ width: "100%" }}> */}
        <div style={menuStyles} {...getToggleButtonProps({})}>
          {selectedItem || "Elements"}
          <ArrowDown />
        </div>

        <ul
          {...(getMenuProps(), { suppressRefError: true })}
          style={{
            borderRadius: theme.borderRadius,
            backgroundColor: theme.color.InputBgcolor,
            cursor: "pointer",
          }}
        >
          {isOpen &&
            // items &&
            items.map((item, index) => (
              <List
                onClick={() => console.log(item)}
                key={item}
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "#bde4ff" }
                    : {}
                }
                {...getItemProps({ item, index })}
              >
                {item}
              </List>
            ))}
        </ul>
        {/* </Selectd> */}
        <Img src="amico.png" alt="todoImage" />
      </Wrapper>
    </>
  );
}

const List = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  ${Mobile(css`
    /* grid-template-columns: 1fr; */
    /* grid-row-start: 1; */
    width: 100%;
    gap: 0px;
  `)}
`;

const Selectd = styled.div`
  /* width: 300px; */
  select {
    width: 100%;
    outline: none;
    /* padding: 8px 16px; */
    border: none;
    z-index: 2;
  }
  ul {
    list-style: none;
    padding: 0px;
  }
  li {
    color: #fff;
  }
`;

const Img = styled.img`
  width: 400px;
  height: 400px;
  ${tablet(css`
    width: 330px;
    height: 330px;
  `)}
  ${Mobile(css`
    display: none;
  `)}
`;

const Option = styled.option`
  border-radius: 10px;
  background-color: rgba(14, 116, 144, 1);
  cursor: pointer;
  padding: 20px;
  height: 20px;
`;
