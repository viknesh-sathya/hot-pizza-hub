import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartquantity } from './CartSlice';
import { formatCurrency } from '../../utils/helpers';
function CartOverview() {
  // Doing the calculation in redux instead of calculating in the component is actually a good practise and recommended way
  // And note the calculation function starts with 'get' its a convention
  const totalCartquantity = useSelector(getTotalCartquantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartPrice) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-yellow-400 sm:justify-around sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-yellow-500 sm:space-x-6">
        <span>{totalCartquantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link
        to="/cart"
        className="rounded-md bg-yellow-500 px-2 py-1 font-semibold text-stone-800 hover:bg-yellow-400"
      >
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
