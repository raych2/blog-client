import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostPreview from './components/PostPreview';
import LoadingIndicator from './components/shared/LoadingIndicator';
import ErrorMessage from './components/shared/ErrorMessage';

const PostList = styled.div`
  margin-top: 50px;
  display: flex;
  flex-flow: column wrap;
  align-content: space-around;
`;

const App = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const blogAPI = 'https://rt-blog-api.herokuapp.com/posts';

  useEffect(() => {
    async function fetchBlogAPI() {
      setLoading(true);
      try {
        const response = await fetch(blogAPI);
        if (response.status === 404) {
          setError(response.statusText);
        } else {
          setError('');
          const data = await response.json();
          setBlogPosts(data.posts);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchBlogAPI();
  }, []);

  return (
    <div>
      {error ? (
        <ErrorMessage>Error: {error}</ErrorMessage>
      ) : (
        <>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <PostList>
              {blogPosts.map((post, index) => {
                return (
                  <div key={post._id}>
                    <PostPreview post={blogPosts[index]} />
                  </div>
                );
              })}
            </PostList>
          )}
        </>
      )}
    </div>
  );
};

export default App;
