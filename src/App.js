import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse';
import RentalTable from './RentalTable';




function App() {
  const [data, setData] = useState([])

  async function fetchCsv(setData) {
    const response = await fetch('data/rentals.csv')
    const reader = response.body.getReader()
    const result = await reader.read()
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value)
    const parsed = Papa.parse(csv)
    setData(parsed.data)
  }
  useEffect(() => {
    fetchCsv(setData)
  }, []);

  return (
    <RentalTable data={data} />
  );
}

export default App;
