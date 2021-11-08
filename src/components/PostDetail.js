import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import CommentDetail from './CommentDetail';

const SpinnerContainer = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const PostLayout = styled.div`
  margin: 50px auto 0 auto;
  height: auto;
  width: 50vw;
  background: #ffffff;
  border: 0.5px solid #e5e5e5;
  border-radius: 5px;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const PostSection = styled.div`
  padding: 20px;
`;
const CommentSection = styled.div`
  padding: 20px;
`;
const CommentList = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  margin: 5px auto;
`;
const Author = styled.h2`
  margin: 5px auto;
`;
const Date = styled.p`
  margin: 5px auto 20px auto;
  color: #7a7a7a;
`;
const Text = styled.p`
  margin: 10px auto;
`;
const CommentHeader = styled.h2`
  margin: 5px auto;
`;
const PostDetail = ({ match }) => {
  const [blogPost, setBlogPost] = useState([]);
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchBlogPostAPI() {
      setError(false);
      setLoading(true);
      try {
        const response = await fetch(
          `https://rt-blog-api.herokuapp.com/posts/${match.params.id}`
        );
        const data = await response.json();
        setBlogPost(data.post);
        setAuthor(data.post.author.username);
      } catch (err) {
        console.log(err);
        setError(true);
      }
      setLoading(false);
    }

    fetchBlogPostAPI();
  }, [match.params.id]);

  return (
    <div>
      {error && <div>An error occurred</div>}
      {loading ? (
        <SpinnerContainer>
          <Spinner name="ball-spin-fade-loader" color="#FCA311" />
        </SpinnerContainer>
      ) : (
        <PostLayout>
          <PostSection>
            <Title>{blogPost.title}</Title>
            <Author>{author}</Author>
            <Date>Posted on {blogPost.postDate}</Date>
            <Text>{blogPost.text}</Text>
          </PostSection>
          <CommentSection>
            <CommentHeader>Comments:</CommentHeader>
            <CommentList>
              {blogPost.comments && blogPost.comments.length > 0 ? (
                blogPost.comments.map((comment) => {
                  return (
                    <div key={comment._id}>
                      <CommentDetail comment={comment} />
                    </div>
                  );
                })
              ) : (
                <p>There are no comments. Be the first to add a comment.</p>
              )}
            </CommentList>
          </CommentSection>
        </PostLayout>
      )}
    </div>
  );
};

export default PostDetail;
