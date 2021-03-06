import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommentDetail from './CommentDetail';
import LoadingIndicator from './shared/LoadingIndicator';
import ErrorMessage from './shared/ErrorMessage';

const PostLayout = styled.div`
  margin: 50px auto 0 auto;
  height: auto;
  width: 50vw;
  background: #ffffff;
  border: 0.5px solid #7a7a7a;
  border-radius: 5px;
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    width: 90%;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 95%;
  }
`;
const PostSection = styled.div`
  padding: 20px;
`;
const CommentSection = styled.div`
  padding: 20px;
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;
const CommentForm = styled.form`
  display: flex;
  flex-flow: column wrap;
  margin: 10px auto 0 auto;
  padding: 20px;
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    padding: 0;
  }
`;
const GuestName = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  margin: 10px auto;
  font-size: 1em;
  padding-left: 5px;
  border: 0.5px solid #e5e5e5;
  border-radius: 5px;
`;
const GuestComment = styled.textarea`
  display: block;
  width: 100%;
  margin: 10px auto;
  font-size: 1em;
  padding: 10px 0 0 5px;
  border: 0.5px solid #e5e5e5;
  border-radius: 5px;
`;
const SubmitButton = styled.input`
  margin: 5px auto;
  width: 25%;
  padding: 10px;
  text-align: center;
  color: #e8eddf;
  background-color: #242423;
  border-color: #242423;
  border-radius: 3px;
  font: 100 1rem 'Noto Sans JP', sans-serif;
`;
const CommentList = styled.div`
  padding: 20px;
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    padding: 0;
  }
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
const CommentError = styled.div`
  padding: 0 20px;
  color: #a9232e;
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    padding: 0;
  }
`;

const PostDetail = ({ match }) => {
  const [blogPost, setBlogPost] = useState([]);
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [commentError, setCommentError] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestComment, setGuestComment] = useState('');
  const parseEntities = (text) =>
    new DOMParser().parseFromString(text, 'text/html').body.innerText;

  useEffect(() => {
    async function fetchBlogPostAPI() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rt-blog-api.herokuapp.com/posts/${match.params.id}`
        );
        if (response.status === 404) {
          setError(response.statusText);
        } else {
          setError('');
          const data = await response.json();
          setBlogPost(data.post);
          setAuthor(data.post.author.username);
          setComments(data.post.comments);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    fetchBlogPostAPI();
  }, [match.params.id]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://rt-blog-api.herokuapp.com/posts/${match.params.id}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            author: guestName,
            text: guestComment,
          }),
        }
      );
      const commentData = await response.json();
      if (commentData.errors) {
        let commentErrors = [];
        commentData.errors.forEach((error) => {
          commentErrors.push(`${error.msg} `);
        });
        setCommentError(commentErrors);
      } else {
        setCommentError('');
        setComments([...comments, commentData.comment]);
      }
    } catch (err) {
      console.log(err);
    }
    setGuestName('');
    setGuestComment('');
  };

  return (
    <div>
      {error ? (
        <ErrorMessage>Error: {error}</ErrorMessage>
      ) : (
        <>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <PostLayout>
              <PostSection>
                <Title>{parseEntities(blogPost.title)}</Title>
                <Author>{author}</Author>
                <Date>Posted on {blogPost.postDate}</Date>
                <Text>{parseEntities(blogPost.text)}</Text>
              </PostSection>
              <CommentSection>
                <CommentHeader>Comments:</CommentHeader>
                <CommentForm onSubmit={addComment}>
                  <label htmlFor="guestName">Name:</label>
                  <GuestName
                    value={guestName}
                    type="text"
                    id="guestName"
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Name"
                    required
                  />
                  <label htmlFor="guestComment">Comment:</label>
                  <GuestComment
                    value={guestComment}
                    id="guestComment"
                    rows="3"
                    cols="33"
                    maxLength="500"
                    onChange={(e) => setGuestComment(e.target.value)}
                    placeholder="Share your thoughts on this blog post"
                    required
                  />
                  <SubmitButton type="submit" value="Submit" />
                </CommentForm>
                {commentError ? (
                  <CommentError>Error: {commentError}</CommentError>
                ) : (
                  <></>
                )}
                <CommentList>
                  {comments && comments.length > 0 ? (
                    comments.map((comment) => {
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
        </>
      )}
    </div>
  );
};

export default PostDetail;
