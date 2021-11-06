import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostSection = styled.div`
  height: auto;
  width: 50vw;
  margin: 10px 0;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #000;
  border-radius: 5px;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const PostInfo = styled.div`
  max-width: 100%;
  text-align: left;
`;
const PostLink = styled(Link)`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  color: #000;
`;
const PostTitle = styled.h2`
  margin: 5px auto;
`;
const PostAuthor = styled.p`
  margin: 5px auto;
`;
const PostTextPreview = styled.div`
  margin: 10px auto;
`;
const Divider = styled.hr`
  margin: 10px auto;
  border: none;
  border-top: 1px solid #000;
`;
const PostData = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  max-width: 100%;
  margin: 0 auto;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;
const PostPreview = (props) => {
  const id = props.post._id;
  const title = props.post.title;
  const author = props.post.author.username;
  const published = props.post.published;
  const postDate = props.post.postDate;
  const comments = props.post.comments;
  const postText = props.post.text.substring(0, 75) + '...';

  return published ? (
    <div>
      <PostSection>
        <PostInfo>
          <PostLink to={`/posts/${id}`}>
            <PostTitle>{title}</PostTitle>
          </PostLink>
          <PostAuthor>By: {author}</PostAuthor>
          <PostTextPreview>{postText}</PostTextPreview>
        </PostInfo>
        <Divider />
        <PostData>
          <p>{postDate}</p>
          <p>Comments: {comments.length}</p>
        </PostData>
      </PostSection>
    </div>
  ) : null;
};

export default PostPreview;
