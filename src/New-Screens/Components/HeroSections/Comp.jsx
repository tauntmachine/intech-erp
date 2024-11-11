import React from "react";

const Comp = (props) => {
  return (
    props.value != null && (
      <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        <span
          style={{
            borderLeft: "10px solid " + props.value,
            paddingRight: "5px",
          }}
        ></span>
        {props.value}
      </div>
    )
  );
};

export default Comp;
