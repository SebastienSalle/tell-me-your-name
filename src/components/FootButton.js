import React from "react";
import './FootButton.css';

/**
 * Button component requiring
 * @param title (by default : 'title undefined')
 * @param value (by default : undefined)
 * @param icon (by default : undefined)
 * @param className (additional classes to default className : button)
 * @returns FootButton component
 */
export default function FootButton(props) {
  let title = props.title || "title undefined";
  let value = props.value;
  let icon = props.icon;
  let className = `button `+props.className;

  return (
    <div>
      <button type="button" value={value} className={className}>
        {title} {icon}
      </button>
    </div>
  );
}
