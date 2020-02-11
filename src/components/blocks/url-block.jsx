import React from "react";
import parse from "html-react-parser";

const UrlBlock = props => {
  const { content } = props;
  return (
    <div
      className={`block url-block${content.doubleTopPadding ? " pad-top" : ""}${
        content.doubleBottomPadding ? " pad-bottom" : ""
      }${content.setBottomPaddingToZero ? " no-pad-bottom" : ""}${
        content.setTopPaddingToZero ? " no-pad-top" : ""
      }`}
      style={{ backgroundColor: content.backgroundColor?.hex }}
    >
      <div className="wrapper centertext">
        <a
          href={`http://${content.url}`}
          style={{ color: content.textColor?.hex }}
        >
          {content.url}
        </a>
      </div>
    </div>
  );
};

export default UrlBlock;