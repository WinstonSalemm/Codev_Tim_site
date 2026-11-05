'use client';
import { useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
export default function MapSection() {
  const [zoom,setZoom] = useState(1);
  const { i18n } = useTranslation();
  const caption = i18n.language.startsWith('en') ? 'Demo City · Sample Street, 47' : i18n.language.startsWith('uz') ? 'Demo City · Namuna ko‘chasi, 47' : 'Демоград · ул. Примерная, 47';
  return <div className="relative w-full max-w-[1200px] h-[400px] rounded-xl overflow-hidden shadow-xl border-2 border-[#660000] mx-auto my-8 bg-[#ebe9e0]">
    <svg viewBox="0 0 1000 400" className="w-full h-full" aria-label={caption} role="img">
      <defs><pattern id="blocks" width="150" height="110" patternUnits="userSpaceOnUse"><rect x="10" y="10" width="120" height="80" rx="8" fill="#d5dbce" stroke="#c4c9bf"/><path d="M0 100H150M140 0V110" stroke="white" strokeWidth="13"/></pattern></defs>
      <g style={{transform:`scale(${zoom})`,transformOrigin:'center',transition:'transform .3s'}}><rect width="1000" height="400" fill="url(#blocks)"/><path d="M-10 380Q250 90 510 190T1010 10" fill="none" stroke="#9dced3" strokeWidth="40"/><path d="M0 50L1000 350" stroke="#fff" strokeWidth="28"/><path d="M600 0L410 400" stroke="#fff" strokeWidth="24"/><circle cx="510" cy="190" r="29" fill="#660000"/><circle cx="510" cy="190" r="10" fill="white"/></g>
    </svg>
    <div className="absolute left-4 top-4 rounded-xl bg-white p-4 shadow"><strong className="text-[#660000]">FireSafe</strong><p className="text-sm text-gray-600">{caption}</p><p className="text-xs text-gray-500">+000 42 731 58 26 · Demo</p></div>
    <div className="absolute bottom-4 right-4 flex gap-2"><button type="button" aria-label="Zoom in" onClick={()=>setZoom(Math.min(2,zoom+.2))} className="h-10 w-10 rounded bg-white shadow">+</button><button type="button" aria-label="Zoom out" onClick={()=>setZoom(Math.max(1,zoom-.2))} className="h-10 w-10 rounded bg-white shadow">−</button></div>
  </div>;
}
