import { Link } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../graphql/gqlProduct";
import LazyImg from "../lazyImg";

interface SwiperItemProps extends Product {
  cntLabel?: string;
}

const SwiperItem = ({
  id,
  imageUrl,
  price,
  title,
  cnt,
  cntLabel,
}: SwiperItemProps) => {
  return (
    <Card>
      <Link to={`products/${id}`}>
        <CardImg>
          <LazyImg src={imageUrl} />
          <Blur />
        </CardImg>
      </Link>
      <ProductTitle>{title}</ProductTitle>
      <ViewBox>
        <Price>${price}</Price>
        {cntLabel && (
          <div>
            <span>{cntLabel}</span>
            <span>{cnt}</span>
          </div>
        )}
      </ViewBox>
    </Card>
  );
};

export default SwiperItem;

const Card = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  padding: 0.5rem 0;
`;

const CardImg = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgb(248, 249, 250);
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  cursor: pointer;
  > img {
    height: 15vh;
    max-height: 180px;
    max-width: 100%;
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

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 300;
  margin-top: 0.5rem;
  line-height: 1.5;
  min-height: calc(2.2 * 1.5rem);
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

const ViewBox = styled.div`
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    margin-left: 0.3rem;
    font-size: 0.9rem;
    font-weight: 400;
  }
`;
