import React, {useState} from 'react';
import css from './Post.module.css';
import timespan from 'utils/timespan.js';
import publicUrl from 'utils/publicUrl.js';
import {
    Link
} from "react-router-dom";

function Post(props) {
    const [toggleComment, setToggleComment] = useState(false); // hidden initially
    const [comment, setComment] = useState('');
    function handleSubmitComment(event){
        props.onComment(props.post.id, comment); // this calls addComment from App.js
        setComment(''); //reset
        setToggleComment(false); //close comment box
        event.preventDefault(); // prevent page refresh
      }
    function handleLike(){
        props.onLike(props.post.id);
    }
    function handleUnlike(){
        props.onUnlike(props.post.id);
    }
    return (
        <article className={css.post}>
            <header className={css.header}>
                <Link className={css.user} to={`/profile/${props.user.id}`}>
                    <img src={publicUrl(props.user.photo)} alt='User Profile'/>
                    <span >{props.user.id} </span>
                </Link>
            </header>
            <section className={css.content}>
                <div className={css.imgContainer}>
                <img src={publicUrl(props.post.photo)} alt='Post'/>
                </div>

            </section>

            <section className={css.actions}>
                <button>
                    {props.likes.self?
                    <img src={publicUrl('/assets/unlike.svg')} alt='Unlike Action' onClick={handleUnlike}/> :
                    <img src={publicUrl('/assets/like.svg')} alt='Like Action' onClick={handleLike}/>
                    }

                </button>
                <button onClick={e=>setToggleComment(!toggleComment)}>
                    <img src={publicUrl('/assets/comment.svg')} alt='Comment Action'/>
                </button>
            </section>
            <section className={css.activity}>
                <div className={css.likes.count}>
                    {props.likes.count} likes
                </div>
                <div className={css.comments}>
                    <div>
                        <span><Link to={`/profile/${props.post.userId}`}>{props.post.userId}</Link></span>
                        <span>{props.post.desc}</span>
                    </div>
                    {props.comments.map((comment,i)=>
                        <div key={i}>
                            <span><Link to={`/profile/${comment.userId}`}>{comment.userId}</Link></span>
                            <span>{comment.text}</span>
                        </div>
                    )}
                </div>
                <time className={css.time}>
                    {timespan(props.post.datetime).toUpperCase()} AGO
                </time>
                {toggleComment && <form className={css.addComment} onSubmit={handleSubmitComment}>
                    <input type="text" placeholder="Add a comment…" value={comment} onChange={e=>setComment(e.target.value)}/>
                    <button type="submit">Post</button>
                </form>}
            </section>

        </article>
    );
}

export default Post;
