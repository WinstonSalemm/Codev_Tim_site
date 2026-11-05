'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const transitionEvent = 'FireSafe:language-transition';

export default function LanguageTransitionOverlay() {
  const [visible, setVisible] = useState(false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearFallback = () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    };
    const onTransition = (event: Event) => {
      const phase = (event as CustomEvent<{ phase?: string }>).detail?.phase;
      if (phase === 'start') {
        clearFallback();
        setVisible(true);
        // Non-catalog pages have no data event to wait for.
        fallbackTimer.current = setTimeout(() => setVisible(false), 1_200);
      } else if (phase === 'end') {
        clearFallback();
        setVisible(false);
      }
    };
    window.addEventListener(transitionEvent, onTransition);
    return () => {
      clearFallback();
      window.removeEventListener(transitionEvent, onTransition);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-live="polite"
          aria-label="Changing language"
          className="fixed inset-0 z-[1000] cursor-wait bg-white/10 backdrop-blur-md"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <div className="pointer-events-none fixed left-1/2 top-2 z-[1001] -translate-x-1/2">
            <Image
              src="/fire-safety-store/OtherPics/logo.svg"
              alt="FireSafe"
              width={180}
              height={60}
              className="h-auto w-[140px] sm:w-[170px] md:w-[180px] drop-shadow-[0_4px_12px_rgba(255,255,255,0.9)]"
              priority
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
