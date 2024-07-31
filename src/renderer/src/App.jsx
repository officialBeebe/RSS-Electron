import { useEffect, useState } from 'react';
import NewsCard from './components/NewsCard';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await window.api.rss();
      setData(res);
      console.log(res);
    };

    fetchData();
  }, []);

  // Extract date and time parts only if data and data.currentDate are defined
  // const date = data?.currentDate ? data.currentDate.split('T')[0] : '';
  // const time = data?.currentDate ? data.currentDate.split('T')[1].split('.')[0] : '';

  // Sort data by pubDate in descending order (most recent first)
  const sortedData = data?.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  return (
    <div className='content'>
      {!data ? (
        <span>Loading...</span>
      ) : (
        sortedData.map((item, index) => (
          <NewsCard key={index} data={item} />
        ))
      )}
    </div>
  );
}

export default App;
