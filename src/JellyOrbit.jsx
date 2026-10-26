import React, { useEffect, useRef, useState } from 'react';
import OrbitImages from './components/OrbitImages.jsx';
import CertificateCard from './CertificateCard.jsx';
import './jelly-orbit.css';

// Internal category mapping only; no visible labels or captions yet.
const icons = [
  { src: `${import.meta.env.BASE_URL}jelly/internships.png`, alt: 'Internships' },
  { src: `${import.meta.env.BASE_URL}jelly/research.png`, alt: 'Research' },
  { src: `${import.meta.env.BASE_URL}jelly/achievements.png`, alt: 'Achievements' },
  { src: `${import.meta.env.BASE_URL}jelly/certificates.png`, alt: 'Certificates' },
];

export default function JellyOrbit() {
  const frameRef = useRef(null);
  const [radiusX, setRadiusX] = useState(420);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const showCertificate = selectedCategory !== null;
  const panelRef = useRef(null);
  const selectItem = index => {
    setSelectedCategory(index);
  };
  useEffect(() => {
    if (showCertificate) panelRef.current?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [selectedCategory]);
  const closeCertificate = () => {
    setSelectedCategory(null);
    frameRef.current.querySelector(`[data-orbit-item="${selectedCategory}"]`)?.focus({ preventScroll: true });
    frameRef.current.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  useEffect(() => {
    if (!showCertificate) return;
    const onKey = event => { if (event.key === 'Escape') closeCertificate(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedCategory]);
  useEffect(() => {
    const resize = new ResizeObserver(([entry]) => {
      setRadiusX(Math.min(420, Math.max(95, (entry.contentRect.width - 180) / 2)));
    });
    resize.observe(frameRef.current);
    return () => resize.disconnect();
  }, []);

  return (
    <section id="jelly-space" className={`jelly-section ${showCertificate ? 'is-expanded' : ''}`} aria-label="Jelly icon collection">
      <div className="jelly-stage" ref={frameRef}>
        <OrbitImages images={icons} className="jelly-orbit" shape="ellipse"
          radiusX={radiusX} radiusY={60} rotation={0} duration={24} itemSize={120}
          depth={0.85} showPath={false} itemRadius={0} shadow={0}
          hoverScale={1.12} hoverSpeed={0.3} draggable clickToFront height={360}
          onItemClick={selectItem} paused={showCertificate} />
      </div>
      {showCertificate && <CertificateCard key={selectedCategory} categoryIndex={selectedCategory} onClose={closeCertificate} panelRef={panelRef} />}
    </section>
  );
}
