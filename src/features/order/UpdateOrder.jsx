import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';
function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  const isLoading = fetcher.state === 'loading';
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Make priority'}
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// RE-VALIDATION
// So when react sees this kind of action it refetches the data and reupdate the data
export async function action({ request, params }) {
  // console.log(Object.fromEntries(await request.formData()));
  const data = { priority: true }; // this is the data which we need to update.
  // we can use the updateOrder() API from service
  await updateOrder(params.orderId, data);
  return null;
}
