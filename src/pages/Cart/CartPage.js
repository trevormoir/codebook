import { useNavigate } from 'react-router-dom';
import { CartEmpty } from './components/CartEmpty';
import { CartList } from './components/CartList';
import { useCart }  from "../../context/CartContext";
import { useEffect } from 'react';
import { useTitle } from '../../hook/useTitle';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  useTitle(`Cart (${cartCount})`);

  const token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => { 
    if (token === '') {
      console.log(token);
      navigate("/login");
    }
  },
  [token, navigate]);

  return (
    <main>
        { cartCount ? <CartList /> : <CartEmpty /> }
    </main>
  )
}
