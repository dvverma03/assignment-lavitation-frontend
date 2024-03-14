// import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from './cards';
import { addInvoice } from './utils/invoiceslice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addId } from "./utils/idSlice";

const Body = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector(store => store.invoice.invoice);
  console.log(data)

  useEffect(() => {
    const token = document.cookie;
    const token1 = token.substring(6,)
    token && navigate("/invoice")
    if (!data.length) {
      axios.post("https://assignment-lavitation-backend.vercel.app/browse", { token1 })
        .then((res) => {
          const userId = res.data._id
          console.log(res)
          dispatch(addId(userId))
          {
            res?.data?.products.length > 0 && res.data.products.map((e) => {
              dispatch(addInvoice(e))
            })
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const invoice = useSelector((store) => store?.invoice?.invoice);

  return (
    <div className="flex flex-col min-h-[750px]">
      <div>
        <ul className='flex justify-between mx-4 py-4'>
          <li className='text-xl font-bold w-1/5'>Product</li>
          <li className='text-xl font-bold w-1/5'>Qyt</li>
          <li className='text-xl font-bold w-1/5'>Rate</li>
          <li className='text-xl font-bold w-1/5'>Total</li>
        </ul>
        <hr />
        <Cards invoice={invoice} />
        <hr />
      </div>

    </div>
  );
};

export default Body;
