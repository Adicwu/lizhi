import React, { ReactNode } from "react";
import "./aw-button.less";

export default function AwButton(props: {
  disable: boolean;
  onClick?: () => void;
  children?: ReactNode;
}) {
  const realClick = () => {
    if (!props.onClick || props.disable) {
      return;
    }
    props.onClick();
  };
  return (
    <button
      className={["aw-button", props.disable ? "disable" : ""].join(" ")}
      onClick={realClick}
    >
      {props.children}
    </button>
  );
}
