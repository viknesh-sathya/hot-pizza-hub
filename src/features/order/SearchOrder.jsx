import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        type="text"
        placeholder="Search order no..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-36 rounded-full bg-yellow-100 px-4 py-2 text-sm ring-yellow-600 ring-offset-1 transition-all duration-500 placeholder:text-stone-400 focus:w-40 focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
