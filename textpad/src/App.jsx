import React, { useEffect, useState } from 'react';
import "./utils/textUtils.js"
import "./styles/style.css";
import Header from './components/Header.jsx'
import TextArea from './components/TextArea.jsx'
import Controls from './components/Controls.jsx';

export default function App() {

  const [text, setText] = useState("");
  const [toast, setToast] = useState('');

  // Toast helper
  const showToast = (msg, ms = 1400) => {
    setToast(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(''), ms);
  };

  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("textpad-dark") === "1"; }
    catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("textpad-dark", dark ? "1" : "0"); }
    catch {}
  }, [dark]);

  return (
    <div className={dark ? 'dark-root' : ''}>
      <div className="app-wrap">
        <div className="card" role="main">

          <Header dark={dark} setDark={setDark} showToast={showToast} />

          <TextArea text={text} setText={setText} />
          <Controls text={text} setText={setText} showToast={showToast} />


          <div className="stats" style={{ marginTop: 14 }}>
            <div className="small">
              Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd> for UPPER,
              <kbd>L</kbd> for lower, <kbd>R</kbd> for reverse
            </div>

            <div className="small text">Developed By Singh IS King 👑</div>
          </div>
        </div>

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}
