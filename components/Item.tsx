import { useSelect } from "downshift";
import styled, { css } from "styled-components";
import { Mobile, notdesktop } from "../utils/media";
import { ThemeContext, useTheme } from "./Context/ThemeContext";
import { ArrowDown } from "./home/icons/icons";
type itemsType = {
  label: string;
  value: string;
};

const items: string[] = ["All", "Completed", "Uncompleted"];
type filterItem = {
  filterHandler: (selectedItem: any) => void;
  setSelectedItem: (selectedItem: string) => void;
  selectedItem: string | undefined;
};

export const Item = ({
  selectedItem,
  filterHandler,
  setSelectedItem,
}: filterItem) => {
  const {
    isOpen,
    // selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items });

  const theme = useTheme();
  let menuStyles = {
    borderWidth: 1,
    width: "100%",
    height: 50,
    paddingHorizontal: 8,
    padding: 20,
    fontSize: 20,
    borderRadius: theme.borderRadius,
    border: `1px solid ${theme.color.InputBgcolor}`,
    color: theme.color.InputBgcolor,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  };
  return (
    <Wrapper>
      <Selectd style={{ width: "100%" }}>
        <div style={menuStyles} {...getToggleButtonProps({})}>
          {selectedItem || "Elements"}
          <ArrowDown color="cornflowerblue" />
        </div>
        <ul
          {...getMenuProps()}
          style={{
            borderRadius: theme.borderRadius,
            backgroundColor: "#fff",
            outline: "none",
            // border: "1px solid cornflowerblue",

            cursor: "pointer",
          }}
        >
          {isOpen &&
            items.map((item, index) => (
              <List
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "#bde4ff" }
                    : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                onClick={() => filterHandler(item)}
              >
                {item}
              </List>
            ))}
        </ul>
      </Selectd>
    </Wrapper>
  );
};
const List = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  position: relative;
  align-items: flex-end;
  z-index: 10;
  ${Mobile(css`
    margin-bottom: 50px;
    width: 100%;
  `)}
`;

const Selectd = styled.div`
  /* width: 300px; */
  position: absolute;
  z-index: 1;
  ul {
    list-style: none;
    padding: 0px;
  }
  li {
    color: #fff;
  }
`;
