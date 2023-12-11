import styled from "styled-components";
import type { LazyLoadImageProps } from ".";

export const Image = styled.img<{
  props: Pick<LazyLoadImageProps, "width" | "height" | "objectFit">;
}>`
  width: ${(props) => props.props.width ?? "initial"};
  height: ${(props) => props.props.height ?? "initial"};
  object-fit: ${(props) => props.props.objectFit ?? "fill"};
`;
