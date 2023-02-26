import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../graphql/gqlProduct";
import LazyImg from "../lazyImg";
import AddCart from "./addCart";
import AddLike from "./addLike";

interface ProductItemProps extends Product {}

const ProductItem = ({
  id,
  imageUrl,
  price,
  title,
  hit = 1,
  isLike,
}: ProductItemProps) => {
  return (
    <Item>
      <Link to={`/products/${id}`}>
        <ImgWrap>
          <LazyImg src={imageUrl} />
          <Blur />
        </ImgWrap>
        <Title>{title}</Title>
        <Price>${price}</Price>
        <span>조회수 {hit}</span>
        <FlexBox>
          <AddCart productId={id} />
          <AddLike productId={id} isLike={isLike} />
        </FlexBox>
      </Link>
    </Item>
  );
};
export default memo(ProductItem);

const Item = styled.li``;

const Title = styled.p`
  padding-top: 0.3rem;
  color: ${({ theme }) => theme.colors.mainColor};
  font-weight: 300;
  min-height: 5.7rem;
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  white-space: normal;
`;

const ImgWrap = styled.div`
  position: relative;
  height: 20vh;
  border-radius: 12px;
  border: 2px solid rgb(248, 249, 250);
  overflow: hidden;
  padding: 0.3rem;
  && img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  :hover {
    > div {
      display: block;
    }
  }
`;

const Blur = styled.div`
  position: absolute;
  display: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const Price = styled.h4`
  padding-top: 0.2rem;
  padding-bottom: 0.15rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainColor};
`;

const FlexBox = styled.div`
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid rgb(248, 249, 250);
  border-radius: 8px;
  > button {
    width: 50%;
    padding: 0.5rem 0;
    cursor: pointer;
  }
  button:nth-child(1) {
    border-right: 2px solid rgb(248, 249, 250);
  }
`;
