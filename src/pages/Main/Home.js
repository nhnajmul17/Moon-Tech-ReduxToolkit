import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrand, toggleStock } from "../../App/Features/Filter/filterSlice";
import { getProducts } from "../../App/Features/Products/productSlice";

import ProductCard from "../../components/ProductCard";
const Home = () => {


  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(getProducts())
  }, [dispatch]);
  const { products, isLoading } = useSelector(state => state.products)
  const { stock, brands } = useSelector(state => state.filter);

  let content;
  if (isLoading) {
    content = <h1>Loading...</h1>
  }
  if (products.length && (stock || brands)) {
    content = products.filter(product => {
      if (stock) {
        return product.status === true
      } else {
        return product
      }
    })
      .filter(product => {
        if (brands.length) {
          return brands.includes(product.brand)
        }
        else {
          return product
        }
      })
      .map((product) => (<ProductCard key={product.model} product={product} />))
  } else {
    content = products.map((product) => (<ProductCard key={product.model} product={product} />))
  }

  const activeClass = "text-white bg-indigo-500 border-white";
  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          onClick={() => dispatch(toggleStock())}
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null
            } `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrand("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd") ? activeClass : null
            } `}
        >
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrand("intel"))}

          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("intel") ? activeClass : null
            } `}
        >
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {
          content
          // products.map((product) => (<ProductCard key={product.model} product={product} />))
        }
      </div>
    </div>
  );
};

export default Home;
