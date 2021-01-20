import { useRef } from "react";
import styled from "styled-components";
import { useOnClickOutside } from "./useOnClickOutside";

const TopLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

const Container = styled.div`
  position: absolute;
  padding: 2rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  ${(props) => `transform: translate(${props.trans.x}%, ${props.trans.y}%);`}
  padding: 10px;
  border: 2px solid black;
  border-radius: 3px;
  width: 100px;
  height: 50px;
`;

const Popover = ({
  anchorEl,
  anchorOrigin,
  offset,
  transformOrigin,
  visible,
  setVisible,
}) => {
  //1. 현재 컴포넌트가 누구인지 가리키는 상태
  const PopoverRef = useRef();

  useOnClickOutside(PopoverRef, () => setVisible(false));

  //2. 어디로부터 나올지 결정
  const parentBox = anchorEl.getBoundingClientRect();

  let top = 0;
  let left = 0;

  const { anchorVertical, anchorHorizontal } = anchorOrigin;

  console.log(anchorOrigin);
  if (anchorVertical === "top") {
    top = parentBox.top;
  } else if (anchorVertical === "center") {
    top = (parentBox.top + parentBox.bottom) / 2;
    console.log(top);
  } else if (anchorVertical === "bottom") {
    top = parentBox.bottom;
  }

  if (anchorHorizontal === "left") {
    left = parentBox.left;
  } else if (anchorHorizontal === "center") {
    left = (parentBox.left + parentBox.right) / 2;
  } else if (anchorHorizontal === "right") {
    left = parentBox.right;
  }

  //3. offset 영점 조절
  top += +offset.x;
  left += +offset.y;

  //4. 어느 방향으로 펼칠 껀지 결정
  let x = 0;
  let y = 0;

  const { transformVertical, transformHorizontal } = transformOrigin;
  if (transformVertical === "top") {
    y = 0;
  } else if (transformVertical === "center") {
    y = -50;
  } else if (transformVertical === "bottom") {
    y = -100;
  }

  if (transformHorizontal === "left") {
    x = 0;
  } else if (transformHorizontal === "center") {
    x = -50;
  } else if (transformHorizontal === "right") {
    x = -100;
  }

  console.log(top, left, x, y);

  return (
    { visible } && (
      <TopLayer>
        <Container
          top={`${top}px`}
          left={`${left}px`}
          trans={{ x, y }}
          ref={PopoverRef}
        >
          Hello! This is PopOver
        </Container>
      </TopLayer>
    )
  );
};

export default Popover;
