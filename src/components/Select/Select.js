import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import Icon from "../Icon";
import { getDisplayedValue } from "./Select.helpers";

const Select = ({ label, value, onChange, children }) => {
  const displayedValue = getDisplayedValue(value, children);

  return (
    <Wrapper>
      <NativeSelect value={value} onChange={onChange}>
        {children}
      </NativeSelect>
      <DisplayedSelect>
        {displayedValue}
        <IconWrapper style={{ "--size": 24 + "px" }}>
          <Icon id={"chevron-down"} size={24} strokeWidth={2}></Icon>
        </IconWrapper>{" "}
      </DisplayedSelect>
    </Wrapper>
  );
};

// focused and hover styling should be based on the native select - only native select
// should be focusable, and displayedselect should change styling based on native select's state

const NativeSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  // width 100% in combination with fit-content on wrapper results in wrapper being
  // sized to the content of DisplayedSelect, and NativeSelect being equal to that width
  width: 100%;
  // remove height constraints from safari
  appearance: none;

  opacity: 0;
`;

// used for referencing in other styled components
const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;

  // make based on rem
  width: var(--size);
  height: var(--size);

  // without this, the icon would be clickable, and the select would therefore not register
  // a click event when the mouse is clicked in the area of the icon
  pointer-events: none;
`;

const DisplayedSelect = styled.div`
  height: 100%;

  font-family: Roboto, sans-serif;
  font-size: ${16 / 16}rem;

  appearance: none;
  color: ${COLORS.gray700};
  background-color: ${COLORS.transparentGray15};

  border-radius: 8px;

  line-height: 30px;

  padding: 12px 16px;
  // more padding on the right side to make space for icon
  // icon sits in the space 52px right of the text
  // learning: position absolute and provide more space originating from the parent element
  padding-right: 52px;

  // & must come last, requiring a change in the DOM order
  ${NativeSelect}:focus + & {
    outline: auto;
  }

  ${NativeSelect}:hover + & {
    color: ${COLORS.black};
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  isolation: isolate;
`;

export default Select;
