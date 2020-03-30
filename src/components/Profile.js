import React, { useContext } from 'react';
import PostThumbnail from './PostThumbnail';
import css from './Profile.module.css';
import publicUrl from 'utils/publicUrl';
import {
  Link, useParams
} from "react-router-dom";
import { StoreContext } from 'contexts/StoreContext';
function Profile(props) {
  // const {store} = props;
  const {users, posts, followers, currentUserId, addFollower, removeFollower} = useContext(StoreContext);
  let {userId} = useParams();
  if (!userId){
    userId = currentUserId;
  }
  let user = users.find(u => u.id === userId);
  let userPosts = posts.filter(p => p.userId === userId);
  let userFollowers = followers.filter(f => f.userId === userId);
  let userFollowing = followers.filter(f => f.followerId === userId);
  function handleFollow(){
    addFollower(userId, currentUserId);
  }
  function handleUnfollow(){
    removeFollower(userId, currentUserId);
  }
  return (
    <div>
      <header className={css.header}>
        <div className={css.photo}>
          <img src={publicUrl(user.photo)} alt="Profile" />
        </div>
        <div className={css.id}>
          <span>{userId}</span>
          {userId!==currentUserId &&
            <div>
              {userFollowers.some(f=>f.followerId===currentUserId)?
                <button className={css.unfollowBtn} onClick={handleUnfollow}>Unfollow</button>
                :
                <button className={css.followBtn} onClick={handleFollow}>Follow</button>
              }
            </div>
          }
        </div>
      </header>
      <div className={css.user}>
        <div className={css.name}>
          {user.name}
        </div>
        <div className={css.bio}>

          {user.bio}
        </div>
      </div>
      <ul className={css.activity}>
        <li>
          <span>{posts.length}</span><br />
          posts
          </li>
        <li>
          <span>{followers.length}</span><br />
          followers
          </li>
        <li>
          <span>{userFollowing.length}</span><br />
          following
          </li>
      </ul>
      <div className={css.posts}>
        {userPosts.map(post =>
          <Link key={post.id} to={`/${post.id}`}><PostThumbnail post={post} /></Link>
        )}
      </div>
    </div>
  );
}

export default Profile;
