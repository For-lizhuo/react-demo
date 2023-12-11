import styled from "styled-components";

export const Wrapper = styled.div`
  height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    font-size: 20px;
    height: 40px;
    line-height: 40px;
  }
  .image-wrapper{
    height: 200px;
    flex-shrink: 0;
  }
`;
