import React, { useRef } from "react";

/**
 * TextArea now receives text and setText from App.jsx
 */
export default function TextArea({ text, setText }) {
  const textareaRef = useRef(null);

  return (
    <div className="text-aria">
      <textarea
        ref={textareaRef}
        aria-label="Text editor"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
      />
    </div>
  );
}
