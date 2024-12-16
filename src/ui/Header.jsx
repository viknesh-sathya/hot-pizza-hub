import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        <div className="flex items-center gap-2">
          <img
            src="pizza-logo.png"
            alt="logo"
            className="w-13 h-12 drop-shadow-xl"
          />
          <p>Hot Pizza Hub</p>
        </div>
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
