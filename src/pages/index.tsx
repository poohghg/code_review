import { useMemo } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import MainProfile from "../components/main/mainProfile";
import MainSwiper from "../components/main/mainSwiprer";
import PageTitle from "../components/pageTitle";
import { GET_PRODUCT_ORDER } from "../graphql/gqlProduct";
import useRecentProducts from "../hoc/useRecentProducts";
import { authFetcher, QueryKeys } from "../queryClient";

const MainPage = () => {
  const { data, status, isSuccess } = useQuery(
    QueryKeys.PRODUCTS_MAINDATA,
    () => authFetcher(GET_PRODUCT_ORDER, {}),
    {
      refetchOnMount: true,
      staleTime: 1000 * 60 * 10,
    },
  );
  const { recentProducts } = useRecentProducts();

  const mainRecentProducts = useMemo(() => {
    return recentProducts.slice(-10).reverse();
  }, [recentProducts]);

  return (
    <>
      <PageTitle label="메인" />
      <Container>
        <MainProfile />
        <MainSwiper
          label="최근본 상품"
          data={mainRecentProducts}
          isSuccess={isSuccess}
        />
        <MainSwiper
          label="좋아요를 많이 받은 상품"
          data={data?.orderLikes}
          cntLabel="좋아요"
          isSuccess={isSuccess}
        />
        <MainSwiper
          label="많이 판매된 상품"
          data={data?.orderPayItems}
          cntLabel="판매수"
          isSuccess={isSuccess}
        />
      </Container>
    </>
  );
};
export default MainPage;

const Container = styled.div`
  /* padding: 0 1.5rem; */
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
`;
