import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  const handlePage = (index) => {
    setPage(index);
  };

  const nextPage = () => {
    setPage((oldpage) => {
      let nextValue = oldpage + 1;
      if (nextValue > data.length - 1) {
        nextValue = 0;
      }
      return nextValue;
    });
  };

  const prevPage = () => {
    setPage((oldpage) => {
      let prevValue = oldpage - 1;
      if (prevValue < 0) {
        prevValue = data.length - 1;
      }
      return prevValue;
    });
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    setFollowers(data[page]);
  }, [loading, page]);
  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'loading...' : 'pagination'}</h1>
        <div className='underline'></div>
        <section className='followers'>
          <div className='container'>
            {followers.map((follower) => {
              return <Follower key={follower.id} {...follower} />;
            })}
          </div>
          {loading || (
            <div className='btn-container'>
              <button className='prev-btn' onClick={prevPage}>
                prev
              </button>
              {data.map((item, index) => {
                return (
                  <button
                    className={`page-btn ${
                      page === index ? 'active-btn' : null
                    }`}
                    key={index}
                    onClick={() => handlePage(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button className='next-btn' onClick={nextPage}>
                next
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
