import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useAddCart } from "../../graphql/gqlCart";

import { useToLogin } from "../../hoc";
import { RootState } from "../../redux";
import AniLoading from "../aniLoading";

const AddCart = ({
  productId,
  amount,
}: {
  productId: string;
  amount?: number;
}) => {
  const isToLoginPage = useToLogin();
  const { mutate: addCart, isLoading } = useAddCart();
  const userId = useSelector((state: RootState) => state.userReducer.userId);

  const addCartListener = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!userId) return isToLoginPage();
      addCart({ id: productId, amount: amount ?? 1 });
    },
    [amount],
  );

  return (
    <>
      <Button onClick={addCartListener} disabled={isLoading}>
        <CartIcon src="/images/cart.png" />
        <Label>장바구니</Label>
      </Button>
      {isLoading && <AniLoading />}
    </>
  );
};

export default memo(AddCart);

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.span`
  margin-left: 4px;
  font-weight: 350;
  font-size: 0.8rem;
  transform: translateY(10%);
`;

const CartIcon = styled.img`
  width: 24px;
  height: 24px;
`;
