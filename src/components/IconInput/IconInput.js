import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";

import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const SIZES = {
  Small: "small",
  Large: "large",
};

const DEFINITIONS = {
  [SIZES.Small]: {
    "--fontSize": 14,
    "--iconSize": 16,
    "--iconStrokeWidth": 1,
    "--borderStrokeWidth": 1 + "px",

    "--verticalPadding": 4 + "px",
    "--paddingToIcon": 24 + "px",
  },
  [SIZES.Large]: {
    "--fontSize": 18,
    "--iconSize": 24,
    "--iconStrokeWidth": 2,
    "--borderStrokeWidth": 2 + "px",
    "--verticalPadding": 8 + "px",
    "--paddingToIcon": 36 + "px",
  },
};

const IconInput = ({ label, icon, width = 250, size, ...delegated }) => {
  const style = DEFINITIONS[size];

  if (!style) {
    throw new Error(`Invalid size supplied: ${size}`);
  }

  const inputWidth = (width ? width : 250) + "px";

  return (
    <WrapperLabel style={{ ...style, "--inputWidth": inputWidth }}>
      <VisuallyHidden>Label: {label}</VisuallyHidden>
      <TextInput type={"text"} {...delegated}></TextInput>
      <IconWrapper>
        <Icon
          id={icon}
          strokeWidth={style["--iconStrokeWidth"]}
          size={style["--iconSize"]}
        ></Icon>
      </IconWrapper>
    </WrapperLabel>
  );
};

const WrapperLabel = styled.label`
  display: block;

  font-family: Roboto, sans-serif;
  font-size: var(--fontSize);

  position: relative;

  width: var(--inputWidth);

  color: ${COLORS.gray700};

  &:hover {
    color: ${COLORS.black};
  }
`;

const TextInput = styled.input`
  padding: var(--verticalPadding) 0;
  padding-left: var(--paddingToIcon);
  width: var(--inputWidth);
  font-size: calc(var(--fontSize) / 16 * 1rem);
  font-weight: 700;
  color: inherit;

  border: none;
  border-bottom: var(--borderStrokeWidth) solid ${COLORS.black};

  &::placeholder {
    font-weight: 400;
    color: ${COLORS.gray500};
  }

  &:focus {
    outline: auto;
    outline-offset: 1px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;

  color: inherit;

  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  width: calc(var(--iconSize) * 1px);
  height: calc(var(--iconSize) * 1px);

  // let input be focused when the icon is clicked
  pointer-events: none;
`;

export default IconInput;
