import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useState, useEffect } from 'react';
import { Search } from '../Sections/Search';
import { DropdownLoggedOut, DropdownLoggedIn } from '../index';
import { useCart } from '../../context/CartContext';

export const Header = () => {
    const { cartCount } = useCart();
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
    const [search, setSearch] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    const token = JSON.parse(sessionStorage.getItem("token"));

    useEffect(() => { 
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode",JSON.stringify(darkMode))
    },
    [darkMode]);

  return (
    <header>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link to="/" className="flex items-center">
                    <img src={Logo} className="h-8 mr-3" alt="Codebook" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Codebook</span>
                </Link>
                <div className="flex items-center relative">
                    <span onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected"></span>
                    <span onClick={() => setSearch(!search)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search"></span>
                    <Link to="/cart" className="text-gray-700 dark:text-white mr-5">
                        <span className="text-2xl bi bi-cart-fill relative">
                            <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">{cartCount}</span>
                        </span>
                    </Link>
                    <span onClick={() => setDropDown(!dropDown)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-person-circle"></span>
                    {dropDown && (token ? <DropdownLoggedIn setDropDown={setDropDown} /> : <DropdownLoggedOut setDropDown={setDropDown} />)}
                </div>
            </div>
        </nav>
        {search && <Search setSearch={setSearch} /> }
    </header>
  )
}
