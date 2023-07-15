import { Link } from 'react-router-dom';
import { useCart } from '../../../context';
import { useRef } from 'react';

export const CartCard = ({cartItem}) => {
  const { removeFromCart, removeMoreFromCart, cartList } = useCart();
  const qtyRef = useRef();

  const handleQty = (id) => {
    if (parseInt(document.getElementById("selected-"+id).value) === 0) {
      const product = cartList.filter(obj => obj.product.id === id);
      removeFromCart(product[0].product);
    }
    else {
      const product = cartList.filter(obj => obj.product.id === id);
      removeMoreFromCart(product, qtyRef.current.value);
    }
  }

  function handleRemove(product) {
    removeFromCart(product);
  }

  return (
    <div className="flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-2 mb-5 ">
      <div className="flex">
          <Link to={`/products/${cartItem.product.id}`}>
            <img className="w-32 rounded" src={cartItem.product.poster} alt={cartItem.product.name} />
          </Link>
          <div className="">
            <Link to={`/products/${cartItem.product.id}`}>
              <p className="text-lg ml-2 dark:text-slate-200">{cartItem.product.name}</p>
            </Link>            
            <button onClick={() => handleRemove(cartItem.product)} className="text-base ml-2 text-red-400">Remove</button>
          </div>
      </div>
      <div className="text-lg m-2">
        <select ref={qtyRef} id={`selected-${cartItem.product.id}`} value={cartItem.qty} onChange={() => handleQty(cartItem.product.id)}>
            {[...Array(cartItem.qty+1)].map((x, i) =>
              <option key={i} value={i}>{i}</option>
            )}
          </select> <span className="text-lg m-2 dark:text-slate-200">x ${cartItem.product.price}</span>
      </div>
      <div className="text-lg m-2 dark:text-slate-200">
        <span>${cartItem.product.price*cartItem.qty}</span>
      </div>
    </div>
  )
}
