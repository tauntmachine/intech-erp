import React from "react";
import styled from "styled-components";
import Dropdown from "../SVGicons/ArrowDownIcon";
import { useSelector } from "react-redux";
import ArrowRight from "../SVGicons/ArrowRight";
const DropDown = (props) => {
  const themeKeys = useSelector((state) => state.localization.themeKeys);
  return (
    <Wrapper>
      <Image>
        {props.icon === "ArrowDown" ? (
          <Dropdown fill={themeKeys.primary} />
        ) : props.icon === "ArrowRight" ? (
          <ArrowRight fill={themeKeys.primary} />
        ) : (
          ""
        )}
      </Image>
    </Wrapper>
  );
};

export default DropDown;

const Wrapper = styled.button`
  height: 17px;
  width: 17px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1.5px solid #c7cacf;
  box-shadow: 0px 0.5px 2.513540267944336px 0.1px #b5b8bf;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
