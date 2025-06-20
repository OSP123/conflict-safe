import React, { useState, useEffect } from 'react';
import EmergencyMap from './components/EmergencyMap.jsx';

export default function App() {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    fetch('/api/shelters')
      .then(res => res.json())
      .then(data => setShelters(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <EmergencyMap shelters={shelters} />
    </div>
  );
}