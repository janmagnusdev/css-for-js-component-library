/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden";

const SIZE = {
  Small: "small",
  Medium: "medium",
  Large: "large",
};

const styles = {
  [SIZE.Small]: {
    "--padding": "0px",
    "--barHeight": "8px",
  },
  [SIZE.Medium]: {
    "--padding": "0px",
    "--barHeight": "12px",
  },
  [SIZE.Large]: {
    "--padding": "4px",
    "--barHeight": "16px",
  },
};

const ProgressBar = ({ value, size }) => {
  const style = styles[size];
  const [internalValue, setInternalValue] = useState(value);

  if (!style) {
    throw new Error(`invalid size: ${size}`);
  }

  if (value < 0 || value > 100) {
    throw new Error(`value is outside range [0-100]: ${value}`);
  }

  // required for updating the bar when the value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const clickCallback = useCallback(() => {
    setInternalValue(0);
    const id = setInterval(() => {
      if (internalValue >= value) {
        setInternalValue(value);
        clearInterval(id);
        return;
      }
      setInternalValue((internalValue) => internalValue + 1);
    }, 200);
  }, [internalValue, value, setInternalValue]);

  const fillPercent = (internalValue / 100) * 100;

  // block element, so width will be determined by environment.
  // the element will take up the available space.

  return (
    <>
      <BarWrapper style={style}>
        <VisuallyHidden>{internalValue}%</VisuallyHidden>
        <RoundBorders>
          <BarInner
            role="progressbar"
            aria-valuenow={internalValue}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ "--barWidth": fillPercent + "%" }}
          ></BarInner>
        </RoundBorders>
      </BarWrapper>
      <button onClick={clickCallback}>Animate!</button>
    </>
  );
};

const BarWrapper = styled.div`
  padding: var(--padding);

  background-color: ${COLORS.transparentGray15};
  box-shadow: inset 0 2px 4px ${COLORS.transparentGray35};

  border-radius: 4px;
`;

const RoundBorders = styled.div`
  width: 100%;

  // trim off corners when progress-bar is near full
  overflow: hidden;
  border-radius: 4px;
`;

const BarInner = styled.div`
  height: var(--barHeight);
  width: var(--barWidth);

  background-color: ${COLORS.primary};

  // top right bottom left
  border-radius: 4px 0 0 4px;
`;

export default ProgressBar;
