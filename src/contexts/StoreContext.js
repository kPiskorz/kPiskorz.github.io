
import React, {createContext, useState, useEffect} from 'react';
import uniqueId from 'utils/uniqueId.js';
import initialStore from 'utils/initialStore.js';

export const StoreContext = createContext();

function StoreContextProvider(props){
    const [store, setStore] = useState(()=>{
        return JSON.parse(window.localStorage.getItem('store')) || initialStore;
    });
    useEffect(()=>{
        window.localStorage.setItem('store', JSON.stringify(store));
    }, [store]);

    function addLike(postId) {
      const like = {
        userId: store.currentUserId,
        postId,
        datetime: new Date().toISOString()
      };

      setStore({
        ...store,
        likes: store.likes.concat(like)
      });
    }
    function removeLike(postId) {
      // console.log('removeLike',postId, store.likes.filter(like=>!(like.userId===store.currentUserId && like.postId===postId)));
      setStore({
        ...store,
        likes: store.likes.filter(like => !(like.userId === store.currentUserId && like.postId === postId))
      });

    }
    function addComment(postId, text) {
      const comment = {
        userId: store.currentUserId,
        postId,
        text,
        datetime: new Date().toISOString()
      };
      setStore({
        ...store,
        comments: store.comments.concat(comment)
      });
    }
    function addPost(photo, desc) {
      const post = {
        id: uniqueId('post'),
        userId: store.currentUserId,
        photo,
        desc,
        datetime: new Date().toISOString()
      }
      setStore({
        ...store,
        posts: store.posts.concat(post)
      });
    }
    function addFollower(userId, followerId){
      setStore({
        ...store,
        followers: store.followers.concat({userId, followerId})
      });
    }
    function removeFollower(userId, followerId){
      setStore({
        ...store,
        followers: store.followers.filter(f=>f.userId!==userId&&f.followerId!==followerId)
      });
    }
    return (

        <StoreContext.Provider value = {{...store, addComment, addLike, removeLike, addPost, addFollower, removeFollower}}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
