import { useDispatch, useSelector } from 'react-redux';
import Cards from './cards';
import { addInvoice, removeInvoice } from './utils/invoiceslice';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addId } from "./utils/idSlice";

const Body = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  let data = useSelector(store => store.invoice.invoice);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email= localStorage.getItem("email")
        dispatch(removeInvoice())
        const res = await axios
        .post("https://assignment-lavitation-backend.vercel.app/browse", { email });
        
        // .post("http://localhost:1234/browse", {email })
        const userId = res.data._id;
        dispatch(addId(userId));
        console.log(data)
        dispatch(removeInvoice());
        if (res.data.products.length > 0) {
          res.data.products.forEach((e) => {
            dispatch(addInvoice(e));
            console.log(e)
          });
        }
        navigate("/invoice");
      } catch (err) {
        console.error(err);
      }
    };

    if (!data.length) {
      fetchData();
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


































// import { useDispatch, useSelector } from 'react-redux';
// import Cards from './cards';
// import { addInvoice, removeInvoice } from './utils/invoiceslice';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addId } from "./utils/idSlice";

// const Body = () => {

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   let data = []; 
//   data = useSelector(store => store.invoice.invoice);

//   useEffect(() => {
//     const token = document.cookie;
//     const token1 = token.substring(6,)
//     if (!data.length) {
//       axios.post("https://assignment-lavitation-backend.vercel.app/browse", { token1 })
//       .then((res) => {
//         const userId = res.data._id
//         console.log(res)
//         dispatch(addId(userId))
//         dispatch(removeInvoice())
//         {
//           res?.data?.products.length > 0 && res.data.products.map((e) => {

//             dispatch(addInvoice(e))
//           })
//         }
//       })
//       .catch((err) => console.log(err));
//     }
//     token && navigate("/invoice")
//   }, [data]);

//   const invoice = useSelector((store) => store?.invoice?.invoice);

//   return (
//     <div className="flex flex-col min-h-[750px]">
//       <div>
//         <ul className='flex justify-between mx-4 py-4'>
//           <li className='text-xl font-bold w-1/5'>Product</li>
//           <li className='text-xl font-bold w-1/5'>Qyt</li>
//           <li className='text-xl font-bold w-1/5'>Rate</li>
//           <li className='text-xl font-bold w-1/5'>Total</li>
//         </ul>
//         <hr />
//         <Cards invoice={invoice} />
//         <hr />
//       </div>

//     </div>
//   );
// };

// export default Body;
