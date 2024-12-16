// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getOrder } from '../../services/apiRestaurant';
import OrderItem from '../order/OrderItem';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';
function Order() {
  const order = useLoaderData(); // this provide the api fetched data and render while the component renders
  const fetcher = useFetcher();
  // So using fetcher we can get the data from menu here.
  // Fetcher also has 3 states like useNavigation() , [idle, loading, submitting]
  useEffect(function () {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, []);
  // console.log(fetcher.data);
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  // console.log(order);
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      {/* Render the cart pizza's */}
      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={cart.id}
            isLoadingIngredients={fetcher.status === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-slate-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-slate-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

// Note: in worldwise app we used useParams hook but that cannot be used only in <Components/> but not in normal functions so reacter router give us this {params}
export async function loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}

export default Order;
