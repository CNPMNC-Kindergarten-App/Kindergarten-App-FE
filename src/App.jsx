import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';

const API_BASE = 'http://localhost:8080/api';

function App() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    axios
      .get(`${API_BASE}/health`)
      .then((res) => {
        // giả sử backend trả { status: "OK" }
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.error(err);
        setStatus('Backend is unreachable');
      });
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <h1>Kindergarten Frontend</h1>
      <p>Health status: {status}</p>

      <h2>Items</h2>
      <ItemList />
    </div>
  );
}

export default App;
