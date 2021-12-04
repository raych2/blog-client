import React from 'react';
import styled from 'styled-components';

const CommentContainer = styled.div`
  height: auto;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  background: #ffffff;
  border-radius: 5px;
  border: 0.5px solid #e5e5e5;
`;
const Author = styled.p`
  margin-bottom: 20px;
  color: #7a7a7a;
`;

const CommentDetail = (props) => {
  const parseEntities = (text) =>
    new DOMParser().parseFromString(text, 'text/html').body.innerText;
  const author = props.comment.author;
  const commentDate = props.comment.commentDate;
  const text = parseEntities(props.comment.text);

  return (
    <CommentContainer>
      <Author>
        {author} • {commentDate}
      </Author>
      <p>{text}</p>
    </CommentContainer>
  );
};

export default CommentDetail;
