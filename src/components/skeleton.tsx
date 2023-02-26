import React, { memo, ReactNode, useMemo } from "react";
import styled, { css, keyframes } from "styled-components";

interface Props {
  children?: ReactNode;
  width?: string;
  height?: string;
  circle?: boolean;
  rounded?: boolean;
  count?: number;
  // unit?: string; // width, height 단위
  animation?: boolean;
  color?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<Props> = ({
  animation = true,
  children,
  width,
  height,
  circle,
  rounded,
  count,
  // unit = "px",
  color = "#F4F4F4",
  style,
}) => {
  const content = useMemo(() => Array(count).fill("-").join(""), [count]);
  return (
    <Base
      style={style}
      rounded={rounded}
      circle={circle}
      width={width}
      height={height}
      animation={animation}
      // unit={unit}
      color={color}
    >
      <Content>{children || content}</Content>
    </Base>
  );
};

export default memo(Skeleton);

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const pulseAnimation = css`
  animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
`;

const Base = styled.span<Props>`
  ${({ color }) => color && `background-color: ${color}`};
  ${({ rounded }) => rounded && "border-radius: 8px"};
  ${({ circle }) => circle && "border-radius: 50%"};
  ${({ width, height }) => (width || height) && "display: block"};
  ${({ animation }) => animation && pulseAnimation};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const Content = styled.span`
  opacity: 0;
`;
