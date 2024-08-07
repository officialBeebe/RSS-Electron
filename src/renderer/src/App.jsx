import { useEffect, useState } from 'react';
import NewsCard from './components/News/NewsCard';
import withLogging from './components/withLogging';

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

  // Sort data by pubDate in descending order (most recent first)
  const sortedData = data?.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  return (
    <div className='content'>
      {!data ? (
        <span>Loading...</span>
      ) : (
        sortedData.map((item, index) => {
          // Wrap NewsCard with the logging HOC and provide the publisher as the log title
          const NewsCardWithLogging = withLogging(NewsCard, `#${index + 1} - ${item.publisher}` || 'NewsCard');
          return <NewsCardWithLogging key={index} data={item} />;
        })
      )}
    </div>
  );
}

export default App;
