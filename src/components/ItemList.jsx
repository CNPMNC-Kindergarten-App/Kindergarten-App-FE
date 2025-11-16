import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_BASE}/items`)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Cannot load items');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id ?? item.name}>{item.name}</li>
      ))}
    </ul>
  );
}

export default ItemList;
