import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostPreview from './components/PostPreview';
import Spinner from 'react-spinkit';

const SpinnerContainer = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const PostList = styled.div`
  margin-top: 50px;
  display: flex;
  flex-flow: column wrap;
  align-content: space-around;
`;

const App = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const blogAPI = 'https://rt-blog-api.herokuapp.com/posts';

  useEffect(() => {
    async function fetchBlogAPI() {
      setError(false);
      setLoading(true);
      try {
        const response = await fetch(blogAPI);
        const data = await response.json();
        setBlogPosts(data.posts);
      } catch (err) {
        console.log(err);
        setError(true);
      }
      setLoading(false);
    }

    fetchBlogAPI();
  }, []);

  return (
    <div>
      {error && <div>An error occurred</div>}
      {loading ? (
        <SpinnerContainer>
          <Spinner name="ball-spin-fade-loader" color="#FCA311" />
        </SpinnerContainer>
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
    </div>
  );
};

export default App;
