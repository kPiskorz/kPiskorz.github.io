import React, {useContext} from 'react';
import Post from './Post';
import { useParams } from 'react-router-dom';
import {StoreContext} from 'contexts/StoreContext';
function Home(props) {
  // const {store} = props;
  let {posts, users, comments, likes, currentUserId, addComment, addLike, removeLike} = useContext(StoreContext);
  const {postId} = useParams();
  function findUser(post){
    return users.find(user=>user.id===post.userId);
  }
  function findComments(post){
    return comments.filter(comment=>comment.postId===post.id);
  }
  function findLikes(post){
    let postLikes = likes.filter(like=>like.postId===post.id);
    console.log('postLikes', postLikes);
    return {
      self: postLikes.some(like=> like.userId===currentUserId),
      count: postLikes.length
    }
  }

  return (
    <div>
      {posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
      .filter(post=>postId?(post.id===postId):true)
      .map(post=><Post
        key={post.id}
        post={post}
        user={findUser(post)}
        comments={findComments(post)}
        likes={findLikes(post)}
        onComment={addComment}
        onLike={addLike}
        onUnlike={removeLike}
      />)}

    </div>
  );
}

export default Home;
