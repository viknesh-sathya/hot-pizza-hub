import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/CartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
/*
const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];
*/
function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation(); // this returns the submiting state aslo
  const isSubmit = navigation.state === 'submitting';
  // Since this component is wired up with action we can receive the data it returns with a custom hook useActionData, mostly we use this for error handling
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === 'loading';
  // const cart = fakeCart;
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            defaultValue={username}
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className={`sm:basis-40 ${formErrors ? 'sm:-mt-12' : ''}`}>
            Phone number
          </label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-3 rounded-md bg-red-200 p-1 text-xs text-red-700 sm:mt-4">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              className="input w-full"
            />
            {addressStatus === 'error' && (
              <p className="mt-3 rounded-md bg-red-200 p-1 text-xs text-red-700 sm:mt-4">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.lalitude && !position.longitude && (
            <span className="sm: absolute right-[3px] top-[35px] z-50 sm:top-[3px] md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isSubmit || isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault(); // this is because the this btn is inside the form so clicking that will submit the form
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-5 w-5 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-semibold text-green-700">
            Want to give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.longitude && position.lalitude
              ? `${position.lalitude}, ${position.longitude}`
              : ''
          }
        />
        <div>
          <Button disabled={isSubmit} type="primary">
            {isSubmit
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
// Once the form gets sumbitted it creates a request and it will be intercepted with action function as soon as we have it connected with reacter router and the name action is just a convention
export async function action({ request }) {
  const formData = await request.formData(); // formData is a normal web function
  const data = Object.fromEntries(formData);

  // Below is just good formatting of form data + the cart data and the priority value we need is true/false not on or off
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  // console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you 🥺.';

  if (Object.keys(errors).length > 0) return errors;

  // now we need the all the createOrder API
  const newOrder = await createOrder(order); // if no errors and all okay only then we create new order and redirect

  // Note: since useDispatch is available only on components we need to import the whole store and then dispatch but note this should not be overused
  store.dispatch(clearCart());

  // Why no useNavigate hook because we cannot use it inside normal functions, so react-router gave us redirect
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
