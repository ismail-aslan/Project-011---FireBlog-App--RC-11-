import { Timestamp } from "@firebase/firestore";
import React, { useState, useContext } from "react";
import { updateLike,updateComment } from "../helpers/firebase";
import "./BlogCard.css";
// import moment from "moment";
import { AuthContext } from "../contexts/AuthContext";



export default function BlogCard(props) {
  const [like, setLike] = useState(props.like);
  const [comment_count, setComment_count] = useState(props.comment_count);
  const { currentUser } = useContext(AuthContext);

  console.log("currentUser:",currentUser);

  const updateLikes = () => {
    updateLike(props.id,currentUser.email);
    setLike(like+1);
  };

  const updateComments = () => {

    const commentX = prompt("yorum giriniz:")
    updateComment(props.id,commentX,currentUser);
    setComment_count(comment_count + 1);
  };
 



  
  return (
    <div className="blog-card-container">
      <div
        className="blog-card blog-card-img-container"
        style={{ backgroundImage: `url(${props.image})` }}
      >
        {/* <img src={props.image} alt="blog image" /> */}
      </div>
      <div className="blog-card blog-card-main-container ">
        <h2>{props.title}</h2>
        <h3>{props.date}</h3>
        {/* <h3>{moment(props.date).format("MMM DD, YYYY")}</h3> */}
        <p>{props.content.length>80 ?props.content.substring(0,80) + "...":props.content}</p>
      </div>
      <div className="blog-card blog-card-footer-container ">
        <h2>
          <i className="fas fa-user-circle"></i> {props.author}
        </h2>
        
        <div className="blog-card-btn-container">
        <div>
          <button className="blog-card-btn" onClick={updateLikes}>
            <i className="fas fa-heart" style={like>0 ? {color:"red"} : {color:"black"}}></i> 
          </button>{like}
          </div>
          <div>
          <button className="blog-card-btn" onClick={updateComments}>
            <i className="far fa-comment" style={like>0 ? {color:"red"} : {color:"black"}}></i> 
          </button>{comment_count}</div>
        </div>
      </div>
    </div>
  );
}
