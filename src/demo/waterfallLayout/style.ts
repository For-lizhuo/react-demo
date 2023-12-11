import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  .image-wrapper {
    position: absolute;
    width: 200px;
    padding: 5px;
    box-sizing: border-box;
    img {
      display: block;
      width: 100%;
    }
  }
`;
