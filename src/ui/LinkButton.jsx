import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ to, children }) {
  const navigate = useNavigate();
  const className =
    'rounded-md text-blue-600 px-2 py-1 font-semibold hover:text-blue-700 hover:underline';
  if (to === '-1')
    return (
      <button onClick={() => navigate(-1)} className={className}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
