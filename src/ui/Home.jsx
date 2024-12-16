import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 text-center text-xl font-semibold md:text-4xl">
        Hot delicious pizza 🍕
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to your mouth 😋.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Hi {username}, continue ordering..{' '}
        </Button>
      )}
    </div>
  );
}

export default Home;
