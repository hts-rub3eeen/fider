import "./ShowTag.scss";

import * as React from "react";
import { Tag } from "@fider/models";
import { classSet } from "@fider/services";

interface TagProps {
  tag: Tag;
  size?: "mini" | "tiny" | "small" | "normal" | "large";
  circular?: boolean;
}

const getRGB = (color: string) => {
  const r = color.substring(0, 2);
  const g = color.substring(2, 4);
  const b = color.substring(4, 6);

  return {
    R: parseInt(r, 16),
    G: parseInt(g, 16),
    B: parseInt(b, 16)
  };
};

const idealTextColor = (color: string) => {
  const components = getRGB(color);
  const bgDelta = components.R * 0.299 + components.G * 0.587 + components.B * 0.114;
  return bgDelta > 140 ? "#333" : "#fff";
};

export const ShowTag = (props: TagProps) => {
  const className = classSet({
    "c-tag": true,
    [`m-${props.size || "normal"}`]: true,
    "m-circular": props.circular === true
  });

  return (
    <div
      title={`${props.tag.name}${!props.tag.isPublic ? " (Private)" : ""}`}
      className={className}
      style={{
        backgroundColor: `#${props.tag.color}`,
        color: idealTextColor(props.tag.color)
      }}
    >
      {!props.tag.isPublic && !props.circular && <i className="lock icon" />}
      {props.circular ? "" : props.tag.name || "Tag"}
    </div>
  );
};
