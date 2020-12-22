import { useRef, useState } from "react";
import Popover from "./Popover";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 900px;
  height: 700px;
  border: 1px solid #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Anchor = styled.button`
  border: 1px solid #000;
  position: relative;
  width: 200px;
  height: 60px;
  padding: 1rem;
  font-size: 1.2rem;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    background: green;
    border-radius: 50%;
    ${(props) => {
      if (props.top === 0) {
        return css`
          top: -5px;
        `;
      } else if (props.top === 1) {
        return css`
          top: 22.5px;
        `;
      } else if (props.top === 2) {
        return css`
          top: 53px;
        `;
      }
    }}
    ${(props) => {
      if (props.left === 0) {
        return css`
          left: -5px;
        `;
      } else if (props.left === 1) {
        console.log("여기");
        return css`
          left: 90px;
        `;
      } else if (props.left === 2) {
        return css`
          left: 192.5px;
        `;
      }
    }};
  }
`;

const MainHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  margin-top: 2rem;
`;

const ContentBox = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: space-between;
  align-items: space-between;
  min-width: 400px;
`;

const ContentHeader = styled.h2`
  display: flex;
  align-items: center;
  color: #ccc;
  font-size: 1rem;
  padding-bottom: 10px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  max-width: 300px;
`;

const InputHeader = styled.span`
  color: #ccc;
  font-size: 0.8rem;
`;

const Input = styled.input`
  border: none;
  border-bottom: solid;
  font-size: 1rem;
  padding: 5px 0 5px 0;
  min-width: 120px;
`;

const RoundButton = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  background: none;
  border-radius: 50%;
  border: 4px solid ${(props) => (props.click ? props.color : "#ccc")};
  cursor: pointer;
  outline: 0;
  ${(props) =>
    props.click &&
    css`
      &:after {
        position: absolute;
        top: 3.65px;
        left: 3.65px;
        content: "";
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: ${(props) => props.color};
      }
    `}
  &:hover {
    &:before {
      position: absolute;
      top: -9px;
      left: -9px;
      content: "";
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 0, 0, 0.05);
    }
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
  min-width: 100px;
`;

const ButtonName = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 3rem 0 1rem;
  font-size: 1rem;
`;

const Main = () => {
  const ref = useRef();
  const [anchorRef, setAnchorRef] = useState(0);
  const [anchorOriginVertical, setAnchorOriginVertical] = useState(0);
  const [anchorOriginHorizontal, setAnchorOriginHorizontal] = useState(0);
  const [anchorPositionTop, setAnchorPositionTop] = useState(0);
  const [anchorPositionLeft, setAnchorPositionLeft] = useState(0);
  const [transformOriginVertical, setTransformOriginVertical] = useState(0);
  const [transformOriginHorizontal, setTransformOriginHorizontal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [anchorOrigin, setAnchorOrigin] = useState({
    anchorVertical: "top",
    anchorHorizontal: "left",
  });
  const [transformOrigin, setTransformOrigin] = useState({
    transformVertical: "top",
    transformHorizontal: "left",
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const anchorNames = ["anchorEl", "anchorPosition"];
  const vertical = ["Top", "Center", "Bottom"];
  const horizontal = ["Left", "Center", "Right"];

  const selectItemAttr = (name, id) => {
    if (name === "anchorRef") {
      setAnchorRef(id);
    } else if (name === "anchorOriginVertical") {
      setAnchorOriginVertical(id);
    } else if (name === "anchorOriginHorizontal") {
      setAnchorOriginHorizontal(id);
    } else if (name === "transformOriginVertical") {
      setTransformOriginVertical(id);
    } else if (name === "transformOriginHorizontal") {
      setTransformOriginHorizontal(id);
    }
  };

  const toggleAnchor = () => {
    setVisible((state) => !state);
    console.log(visible);
    let anchorVertical;
    let anchorHorizontal;
    let transformVertical;
    let transformHorizontal;

    if (anchorOriginVertical === 0) {
      anchorVertical = "top";
    } else if (anchorVertical === 1) {
      anchorVertical = "center";
    } else if (anchorVertical === 2) {
      anchorVertical = "bottom";
    }

    if (anchorOriginHorizontal === 0) {
      anchorHorizontal = "left";
    } else if (anchorOriginHorizontal === 1) {
      anchorHorizontal = "center";
    } else if (anchorOriginHorizontal === 2) {
      anchorHorizontal = "right";
    }

    setAnchorOrigin({ anchorVertical, anchorHorizontal });

    if (transformOriginVertical === 0) {
      transformVertical = "top";
    } else if (transformOriginVertical === 1) {
      transformVertical = "center";
    } else if (transformOriginVertical === 2) {
      transformVertical = "bottom";
    }

    if (transformOriginHorizontal === 0) {
      transformHorizontal = "left";
    } else if (transformOriginHorizontal === 1) {
      transformHorizontal = "center";
    } else if (transformOriginHorizontal === 2) {
      transformHorizontal = "right";
    }

    setTransformOrigin({ transformVertical, transformHorizontal });

    if (anchorRef === 1) {
      setOffset({ x: anchorPositionTop, y: anchorPositionLeft });
    }
  };

  const changeAnchorPositionTop = (e) => {
    setAnchorPositionTop(e.target.value);
  };

  const changeAnchorPositionLeft = (e) => {
    setAnchorPositionLeft(e.target.value);
  };

  return (
    <>
      {visible && (
        <Popover
          anchorEl={ref.current}
          anchorOrigin={anchorOrigin}
          offset={offset}
          transformOrigin={transformOrigin}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      <Container>
        <MainHeader>
          <Anchor
            onClick={toggleAnchor}
            ref={ref}
            top={anchorOriginVertical}
            left={anchorOriginHorizontal}
          >
            OPEN POPOVER
          </Anchor>
        </MainHeader>
        <ContentWrapper>
          <ContentBox>
            <ContentHeader>anchorReference</ContentHeader>
            <Content direction={"row"}>
              {anchorNames.map((name, idx) => (
                <Label
                  key={idx}
                  onClick={() => selectItemAttr("anchorRef", idx)}
                >
                  <RoundButton click={anchorRef === idx} color={"red"} />
                  <ButtonName>{name}</ButtonName>
                </Label>
              ))}
            </Content>
          </ContentBox>
          <ContentBox>
            <Content direction={"column"}>
              <InputBox>
                <InputHeader>anchorPosition.top</InputHeader>
                <Input
                  type="number"
                  value={anchorPositionTop}
                  name="anchorPositionTop"
                  onChange={changeAnchorPositionTop}
                />
              </InputBox>
              <InputBox>
                <InputHeader>anchorPosition.left</InputHeader>
                <Input
                  type="number"
                  value={anchorPositionLeft}
                  name="anchorPositionLeft"
                  onChange={changeAnchorPositionLeft}
                />
              </InputBox>
            </Content>
          </ContentBox>
        </ContentWrapper>
        <ContentWrapper>
          <ContentBox>
            <Content direction={"column"}>
              <ContentHeader>anchorOrigin.vertical</ContentHeader>
              {vertical.map((name, idx) => (
                <Label
                  key={idx}
                  onClick={() => selectItemAttr("anchorOriginVertical", idx)}
                >
                  <RoundButton
                    click={anchorOriginVertical === idx}
                    color={"green"}
                  />
                  <ButtonName>{name}</ButtonName>
                </Label>
              ))}
            </Content>
          </ContentBox>
          <ContentBox>
            <Content direction={"column"}>
              <ContentHeader>transformOrigin.vertical</ContentHeader>
              {vertical.map((name, idx) => (
                <Label
                  key={idx}
                  onClick={() => selectItemAttr("transformOriginVertical", idx)}
                >
                  <RoundButton
                    click={transformOriginVertical === idx}
                    color={"blue"}
                  />
                  <ButtonName>{name}</ButtonName>
                </Label>
              ))}
            </Content>
          </ContentBox>
        </ContentWrapper>
        <ContentWrapper>
          <ContentBox>
            <ContentHeader>anchorOrigin.horizontal</ContentHeader>
            <Content direction={"row"}>
              {horizontal.map((name, idx) => (
                <Label
                  key={idx}
                  onClick={() => selectItemAttr("anchorOriginHorizontal", idx)}
                >
                  <RoundButton
                    click={anchorOriginHorizontal === idx}
                    color={"green"}
                  />
                  <ButtonName>{name}</ButtonName>
                </Label>
              ))}
            </Content>
          </ContentBox>
          <ContentBox>
            <ContentHeader>transformOrigin.horizontal</ContentHeader>
            <Content direction={"row"}>
              {horizontal.map((name, idx) => (
                <Label
                  key={idx}
                  onClick={() =>
                    selectItemAttr("transformOriginHorizontal", idx)
                  }
                >
                  <RoundButton
                    click={transformOriginHorizontal === idx}
                    color={"blue"}
                  />
                  <ButtonName>{name}</ButtonName>
                </Label>
              ))}
            </Content>
          </ContentBox>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Main;
