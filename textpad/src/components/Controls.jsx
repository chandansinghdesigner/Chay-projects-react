import React, { useEffect } from "react";

export default function Controls({ text, setText, showToast }) {
  // Utility Functions
  const toUpper = (str) => str.toUpperCase();
  const toLower = (str) => str.toLowerCase();
  const reverseStr = (str) => str.split("").reverse().join("");
  const trimExtra = (str) => str.replace(/\s+/g, " ").trim();

  // Action Handlers
  const handleUpper = () => {
    setText(toUpper(text));
    showToast && showToast("Converted to UPPERCASE");
  };

  const handleLower = () => {
    setText(toLower(text));
    showToast && showToast("Converted to lowercase");
  };

  const handleReverse = () => {
    setText(reverseStr(text));
    showToast && showToast("Text Reversed");
  };

  const handleTrim = () => {
    setText(trimExtra(text));
    showToast && showToast("Extra spaces removed");
  };

  const handleCopy = async () => {
    if (!text) return showToast && showToast("Nothing to copy");
    try {
      await navigator.clipboard.writeText(text);
      showToast && showToast("Copied!");
    } catch {
      showToast && showToast("Copy Failed");
    }
  };

  const handleClear = () => {
    setText("");
    showToast && showToast("Text Cleared");
  };

  // Keyboard Shortcuts (use text in deps so handlers use latest text)
  useEffect(() => {
    const onKey = (e) => {
      if (!e.ctrlKey || !e.shiftKey) return;

      switch (e.key.toLowerCase()) {
        case "u":
          e.preventDefault();
          handleUpper();
          break;
        case "l":
          e.preventDefault();
          handleLower();
          break;
        case "r":
          e.preventDefault();
          handleReverse();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [text]); // text in deps to ensure handlers operate on current text

  // Stats
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div style={{ marginTop: "14px" }}>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button className="btn" onClick={handleUpper} disabled={!text}>
          UPPER
        </button>
        <button className="btn" onClick={handleLower} disabled={!text}>
          lower
        </button>
        <button className="btn" onClick={handleReverse} disabled={!text}>
          Reverse
        </button>
        <button className="btn" onClick={handleTrim} disabled={!text}>
          Trim
        </button>
        <button className="btn" onClick={handleClear} disabled={!text}>
          Clear
        </button>
        <button className="btn" onClick={handleCopy} disabled={!text}>
          Copy
        </button>
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        Words: <b>{wordCount}</b> | Characters: <b>{charCount}</b>
      </div>
    </div>
  );
}
