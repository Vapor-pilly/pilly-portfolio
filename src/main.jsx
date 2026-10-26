import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from '../Lanyard.jsx';
import StarBorder from './components/StarBorder.jsx';
import JellyOrbit from './JellyOrbit.jsx';
import './style.css';
import './reference-motion.css';
import './detail-star.css';
import './scroll-fold.css';

const sections = [
  { id: 'undergraduate', title: 'Undergraduate', color: 'yellow', preview: 'SWJTU', eyebrow: 'Undergraduate',
    content: <><p>Southwest Jiaotong University <span className="detail-note">(ShanghaiRanking China: #49)</span></p><p>Major: Bioengineering</p></> },
  { id: 'postgraduate', title: 'Postgraduate', color: 'green', preview: '27 FALL', eyebrow: 'Next chapter',
    content: <p>27 Fall application in progress — HKU, CUHK, HKUST</p> },
  { id: 'summer', title: 'Summer Program', color: 'blue', preview: 'GSU', eyebrow: 'Summer Program',
    content: <><p>Georgia State University</p><p>Relevant Coursework: Introduction to Special Topics <span className="grade">(A+)</span>; Theme-Based Biology Laboratory <span className="grade">(A)</span></p></> },
  { id: 'contact', title: 'Contact me', color: 'black', eyebrow: "Let's chat",
    content: <><p>Tel/WeChat: <a href="tel:+8618384228223">183-8422-8223</a></p><p>Email: <a href="mailto:pillypeng@163.com">pillypeng@163.com</a></p></> },
];

function App() {
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const closingRef = useRef(false);
  const stageRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const folders = [...stage.querySelectorAll('.folder')];
    const offsets = [[-22, -15], [16, -7], [-10, 14], [24, 24]];
    let frame = 0;
    let geometry;
    const measure = () => {
      const stageRect = stage.getBoundingClientRect();
      const greeting = stage.querySelector('.welcome').getBoundingClientRect();
      geometry = {
        top: stageRect.top + window.scrollY,
        distance: Math.max(240, stage.offsetHeight * .42),
        destinations: folders.map((folder, index) => {
          const parent = folder.offsetParent.getBoundingClientRect();
          return [greeting.left + greeting.width / 2 - parent.left - folder.offsetLeft - folder.offsetWidth / 2 + offsets[index][0],
            greeting.top + greeting.height / 2 - parent.top - folder.offsetTop - folder.offsetHeight / 2 + offsets[index][1]];
        })
      };
      update();
    };
    const update = () => {
      frame = 0;
      const raw = reducedMotion.matches ? 0 : Math.min(1, Math.max(0, (window.scrollY - geometry.top) / geometry.distance));
      const progress = raw * raw * (3 - 2 * raw);
      folders.forEach((folder, index) => {
        folder.style.setProperty('--fold-x', `${geometry.destinations[index][0] * progress}px`);
        folder.style.setProperty('--fold-y', `${geometry.destinations[index][1] * progress}px`);
        folder.style.setProperty('--fold-scale', 1 - progress * .32);
      });
      stage.classList.toggle('is-folding', progress > .02);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(stage.querySelector('.welcome'));
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    reducedMotion.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      reducedMotion.removeEventListener('change', schedule);
    };
  }, []);
  useEffect(() => {
    if (!active) return;
    const dialog = dialogRef.current;
    dialog.showModal();
    closingRef.current = false;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const from = triggerRef.current.getBoundingClientRect();
    const to = dialog.getBoundingClientRect();
    const transform = `translate(${from.x + from.width / 2 - to.x - to.width / 2}px, ${from.y + from.height / 2 - to.y - to.height / 2}px) scale(${from.width / to.width}, ${from.height / to.height})`;
    const animation = dialog.animate([
      { transform, opacity: 0.45, borderRadius: '12px' },
      { transform: 'translate(0,0) scale(1)', opacity: 1, borderRadius: '20px' }
    ], { duration: 580, easing: 'cubic-bezier(.16,1,.3,1)' });
    return () => animation.cancel();
  }, [active]);
  const close = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    const dialog = dialogRef.current;
    const finish = () => { dialog.close(); setActive(null); triggerRef.current?.focus(); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return; }
    const to = triggerRef.current.getBoundingClientRect();
    const from = dialog.getBoundingClientRect();
    dialog.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${to.x + to.width / 2 - from.x - from.width / 2}px, ${to.y + to.height / 2 - from.y - from.height / 2}px) scale(${to.width / from.width}, ${to.height / from.height})`, opacity: 0 }
    ], { duration: 320, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }).onfinish = () => {
      dialog.getAnimations().forEach(animation => animation.cancel());
      finish();
    };
  };
  return (
    <main className="home">
      <div className="fixed-lanyard">
        <Lanyard
          frontImage="/card-photo.jpg"
          backImage="/card-back.jpg"
          strapImage="/band.png"
          anchor="left"
          anchorInset={150}
          size={0.3}
          strapLengthScale={0.5}
          strapColor="#ffffff"
          damping={0.6}
          breeze={0}
        />
      </div>
      <section ref={stageRef} className="home-stage" aria-label="Pilly's Space">
        <svg className="orbit-lines" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="500" cy="375" r="260" />
          <circle cx="500" cy="375" r="370" />
          <circle cx="500" cy="375" r="480" />
        </svg>
        <header className="welcome">
          <h1><span className="intro-word" style={{ '--word-delay': '140ms' }}>Hi!</span></h1>
          <p aria-label="Welcome to Pilly's Space">{['Welcome', 'to', "Pilly's", 'Space'].map((word, index) => <React.Fragment key={word}>
            {index > 0 && ' '}<span aria-hidden="true" className="intro-word" style={{ '--word-delay': `${560 + index * 180}ms` }}>{word}</span>
          </React.Fragment>)}</p>
        </header>
        <nav className="folders" aria-label="Explore my space">
          {sections.map(section => (
            <button key={section.id} className={`folder folder-${section.id} ${section.color} ${active?.id === section.id ? 'is-active' : ''}`}
              aria-label={section.title} aria-haspopup="dialog" onClick={event => { triggerRef.current = event.currentTarget; setActive(section); }}>
              <span className="folder-object" aria-hidden="true">
              {section.id !== 'contact' ? <>
                <span className="folder-back" aria-hidden="true" />
                <span className="folder-sheet sheet-back"><span className="preview-color" /><i /><i /></span>
                <span className="folder-sheet sheet-front"><span className="paper-symbol">{section.color === 'blue' ? 'BIOLOGY' : section.color === 'green' ? 'APPLICATION' : 'EDUCATION'}</span><strong>{section.preview}</strong><span className="preview-art" /><i /><i /></span>
                <span className="folder-pocket"><span className="folder-label">{section.title}</span></span>
              </> : <><span className="contact-mini"><i /><i /><span /></span><span className="folder-label">{section.title}</span></>}
              </span>
            </button>
          ))}
        </nav>
        <button className="scroll-next" aria-label="Explore more" onClick={() => {
          document.getElementById('jelly-space').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        }}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
      </section>
      <JellyOrbit />
      <dialog ref={dialogRef} className={`detail-dialog ${active?.color || ''}`} aria-labelledby="detail-title"
        onCancel={event => { event.preventDefault(); close(); }} onClick={event => {
          if (event.target === dialogRef.current) {
            const r = dialogRef.current.getBoundingClientRect();
            if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close();
          }
        }}>
        {active && <StarBorder key={active.id} as="div" className="detail-star" radius={20} thickness={2}
          duration={5} stars={2} glow={0.8} sparkle hover="brighten" clickPulse={false}
          theme={active.color === 'black' ? 'dark' : 'light'}
          color={{yellow:'#ad9732',green:'#5c9051',blue:'#438bbd',black:'#ece7c9'}[active.color]}
          backgroundColor={active.color === 'black' ? '#282a27' : '#fffef8'}
          textColor={active.color === 'black' ? '#f2f2ec' : '#34352f'}>
          <article>
          <div className="detail-topline"><button className="close-button" aria-label="Close details" onClick={close}>×</button></div>
          <h2 id="detail-title">{active.title}</h2><div className="detail-content">{active.content}</div>
          </article>
        </StarBorder>}
      </dialog>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
