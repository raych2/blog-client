import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PostPreview from './components/PostPreview';

const App = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(false);
  const blogAPI = 'https://rt-blog-api.herokuapp.com/posts';

  useEffect(() => {
    async function fetchBlogAPI() {
      setError(false);
      try {
        const response = await fetch(blogAPI);
        const data = await response.json();
        setBlogPosts(data.posts);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }

    fetchBlogAPI();
  }, []);

  return (
    <div>
      {error && <div>An error occurred</div>}
      <div>
        {blogPosts.map((post, index) => {
          return (
            <div key={post._id}>
              <PostPreview post={blogPosts[index]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
