import React from 'react';

const PostPreview = (props) => {
  const title = props.post.title;
  const author = props.post.author.username;
  const published = props.post.published;
  const postDate = props.post.postDate;
  const comments = props.post.comments;
  const postText = props.post.text;

  return published ? (
    <div>
      <div>
        <p>{title}</p>
        <p>By: {author}</p>
        <p>Posted {postDate}</p>
        <p>{postText}</p>
        <p>Comments: {comments.length}</p>
      </div>
    </div>
  ) : null;
};

export default PostPreview;
