import React, { Component } from "react";

const Like = (props) => {
  let name = "fa fa-heart";
  if (!props.like) name += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={name}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
