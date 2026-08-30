'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function QuickActions(){
 const pathname=usePathname()
 const [open,setOpen]=useState(false)
 const print=()=>window.print()
 return <>
  <div className="quick-actions">
   <button className="qa-primary" onClick={()=>setOpen(v=>!v)}>PACE Tools <span>⌄</span></button>
   {open&&<div className="qa-menu">
    <a href="/tools"><strong>🎯 Your Play</strong><small>Do · Don't · Ask · Bring · Watch · Next</small></a>
    <a href="/tools#meeting"><strong>🎤 Meeting Mode</strong><small>One-screen meeting cheat sheet</small></a>
    <a href="/tools#tender"><strong>📄 Tender Mode</strong><small>PACE for government tenders</small></a>
    <a href="/compare"><strong>⇄ Compare Markets</strong><small>Compare up to four markets</small></a>
    <button onClick={print}><strong>🖨 Print / Save Brief</strong><small>Use your browser's PDF printer</small></button>
   </div>}
  </div>
  {pathname==='/'&&<div className="qa-hint">New: <b>PACE Tools</b> contains Meeting Mode, Tender Mode, Compare and Print Brief.</div>}
 </>
}
