import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await window.expressApi.hello();
      setData(res);
    };

    fetchData();
  }, []);

  // Extract date and time parts only if data and data.currentDate are defined
  const date = data?.currentDate ? data.currentDate.split('T')[0] : '';
  const time = data?.currentDate ? data.currentDate.split('T')[1].split('.')[0] : '';

  return (
    <>
      {!data ? (
        <span>Loading...</span>
      ) : (
        <fieldset>
          <legend>{data.serverName}</legend>
          <p>{data.message}</p>
          <ul>
            <li>Date: {date}</li>
            <li>Time: {time}</li>
            <li>Uptime: {data.uptime}</li>
            <li>Hostname: {data.hostname}</li>
          </ul>
        </fieldset>
      )}
    </>
  );
}

export default App;
