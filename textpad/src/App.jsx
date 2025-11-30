import React, { useEffect, useRef, useState } from 'react';
import "./utils/textUtils.js"
import "./styles/style.css";
import { toUpper, toLower, reverseStr, trimExtra } from "./utils/textUtils.js";

export default function App() {


  const [text, setText] = useState('')
  const [dark, setDark] = useState(() => {
    try { const v = localStorage.getItem('textpad-dark'); return v === '1' }
    catch { return false }
  })
  const [toast, setToast] = useState('')
  const textareaRef = useRef(null)

  // Save dark preference
  useEffect(() => {
    try { localStorage.setItem('textpad-dark', dark ? '1' : '0') } catch {}
  }, [dark])

  // Toast helper
  const showToast = (msg, ms = 1400) => {
    setToast(msg)
    clearTimeout(showToast._t)
    showToast._t = setTimeout(() => setToast(''), ms)
  }

  

// Handlers
const handleUpper = () => {
  setText(prev => toUpper(prev));
  showToast("Converted to UPPERCASE");
};

const handleLower = () => {
  setText(prev => toLower(prev));
  showToast("Converted to lowercase");
};

const handleReverse = () => {
  setText(prev => reverseStr(prev));
  showToast("Text reversed");
};

 const handleTrim = () => {
  setText(prev => trimExtra(prev));
  showToast("Text reversed");
};
  const handleCopy = async () => {
    if (!text) { showToast('Nothing to copy'); return }
    try {
      await navigator.clipboard.writeText(text)
      showToast('Copied to clipboard')
    } catch (e) {
      showToast('Copy failed')
    }
  }

const handleClear = () => { setText(''); showToast('Cleared') }  

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (!e.ctrlKey || !e.shiftKey) return
      const k = e.key.toLowerCase()
      if (k === 'u') { e.preventDefault(); handleUpper() }
      if (k === 'l') { e.preventDefault(); handleLower() }
      if (k === 'r') { e.preventDefault(); handleReverse() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Stats
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charCount = text.length

  // Auto-focus textarea on mount
  useEffect(() => { textareaRef.current?.focus() }, [])


  return (
    <div className={dark ? 'dark-root'  : ''}>
      <div className="app-wrap">
        <div className="card" role="main">
          <header>
            <div>
              <h1>Simple TextPad</h1>
              <div className="small">Fast text transforms • keyboard shortcuts: Ctrl+Shift+U/L/R</div>
            </div>
            <div style={{display:'flex', gap:10, alignItems:'center'}}>
              <button
                className="btn"
                onClick={() => { setDark(d => !d); showToast(dark ? 'Light mode' : 'Dark mode') }}
                aria-label="Toggle theme"
              >{dark ? 'Light' : 'Dark'}</button>
              <a className="small" href="#" onClick={(e)=>{e.preventDefault(); showToast('No external link')}}>About</a>
            </div>
          </header>

          <div>
            <textarea
              ref={textareaRef}
              aria-label="Text editor"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type or paste your text here..."
            />
          </div>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12, gap:12, flexWrap:'wrap'}}>
            <div className="controls" role="toolbar" aria-label="Text actions">
              <button className="btn primary" onClick={handleUpper} disabled={!text}>UPPER</button>
              <button className="btn" onClick={handleLower} disabled={!text}>lower</button>
              <button className="btn" onClick={handleReverse} disabled={!text}>Reverse</button>
              <button className="btn" onClick={handleTrim} disabled={!text}>Trim</button>
              <button className="btn" onClick={handleClear} disabled={!text}>Clear</button>
              <button className="btn" onClick={handleCopy} disabled={!text}>Copy</button>
            </div>

            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <div className="small">Words: <strong>{wordCount}</strong></div>
              <div className="small">Chars: <strong>{charCount}</strong></div>
            </div>
          </div>

          <div className="stats" style={{marginTop:14}}>
            <div className="small">Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd> for UPPER, <kbd>L</kbd> for lower, <kbd>R</kbd> for reverse</div>
            <div className="small">Built with React + Vite</div>
          </div>
        </div>

        {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
      </div>
    </div>
  )
}
