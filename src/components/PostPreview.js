import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;
const PostSection = styled.div`
  height: auto;
  width: 50vw;
  margin: 10px 0;
  padding: 20px;
  background: #ffffff;
  border: 0.5px solid #7a7a7a;
  border-radius: 5px;
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    width: 80vw;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 95%;
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
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
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
  const parseEntities = (text) =>
    new DOMParser().parseFromString(text, 'text/html').body.innerText;

  return published ? (
    <PostContainer>
      <PostSection>
        <PostInfo>
          <PostLink to={`/posts/${id}`}>
            <PostTitle>{parseEntities(title)}</PostTitle>
          </PostLink>
          <PostAuthor>By: {author}</PostAuthor>
          <PostTextPreview>{parseEntities(postText)}</PostTextPreview>
        </PostInfo>
        <Divider />
        <PostData>
          <p>{postDate}</p>
          {comments.length === 0 ? (
            <p>
              <FontAwesomeIcon icon={faCommentAlt} /> Add a comment
            </p>
          ) : comments.length === 1 ? (
            <p>
              <FontAwesomeIcon icon={faCommentAlt} /> {comments.length} Comment
            </p>
          ) : (
            <p>
              <FontAwesomeIcon icon={faCommentAlt} /> {comments.length} Comments
            </p>
          )}
        </PostData>
      </PostSection>
    </PostContainer>
  ) : null;
};

export default PostPreview;
