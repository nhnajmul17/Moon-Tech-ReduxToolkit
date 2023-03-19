import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";


const Cart = () => {

  const cartProducts = useSelector(state => state.cart.cart)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
      {
        cartProducts.map(product => <ProductCard product={product} key={product._id}></ProductCard>)
      }
    </div>
  );
};

export default Cart;
