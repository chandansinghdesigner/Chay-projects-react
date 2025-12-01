
import React, { useEffect, useRef, useState } from 'react';

export default function Header({ dark, setDark, showToast }) {

 


    return (
       <>
        
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

       </>
    )
}