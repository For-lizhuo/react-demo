import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .container {
    width: 50%;
    height: 500px;
    box-sizing: content-box;
    border: 2px solid #dcdcdc;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .header,
    .list-item,
    .footer {
      height: 50px;
      line-height: 50px;
    }
    .header {
      align-self: center;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .list-item {
      font-size: 16px;
      padding-left: 20px;
      &:nth-child(odd) {
        background-color: #f5f5f5;
      }
      &:nth-child(even) {
        background-color: #dcdcdc;
      }
    }
    .footer {
      align-self: center;
      .loading {
        animation: rotate 1s linear infinite;
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
    }
    .icon {
      color: #1e90ff;
      font-size: 20px;
    }
  }
`;
