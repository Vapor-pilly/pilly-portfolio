import React from 'react';
import './certificate-card.css';
import './certificate-frost.css';

const categories = [
  { title: 'Internships', icon: 'internships', content: <>
    <li>West Securities | Intern, Strategy Research Team</li>
    <li>Shanghai Henlius Biopharmaceutical Co., Ltd. | Marketing Intern</li>
    <li>Shenwan &amp; Hongyuan Securities Co.,Ltd | Investment Banking Intern</li>
    <li>Leap Capital | Equity Research Intern in Technology Sector</li>
  </> },
  { title: 'Research', icon: 'research', content: <>
    <li>Dislocation-Driven Photopiezocatalysis: Selective CO₂ Conversion on Barium Titanate, H. Zhang, F. Zhuo, L. Peng (3rd Author), Y. Zhang, S. Liang, M. Tang, et al. [Under Review], 2026</li>
    <li>Undergraduate Student Research Training Program (SRTP)
      <p>Design and Preparation of Bilayer Hydrogels for Antibacterial Activity and Bone Tissue Repair</p>
    </li>
  </> },
  { title: 'Achievements', icon: 'achievements', content: <>
    <li><a href="https://vapor-pilly.github.io/Focusden/mobile/" target="_blank" rel="noopener noreferrer">Focusden</a> | Personal Open-source Project, GitHub
      <p>Developed an offline-first Pomodoro web application with Node.js. Implemented 8 interactive focus scenes, local audio playback, focus time statistics, scene unlocking, favourite collection and JSON data backup.</p>
    </li>
  </> },
  { title: 'Certificate', icon: 'certificates' }
];

export default function CertificateCard({ onClose, panelRef, categoryIndex = 3 }) {
  const category = categories[categoryIndex];
  return (
    <div className="certificate-scene" ref={panelRef}>
      <div className="certificate-frost">
      <article className="certificate-card" aria-labelledby="certificate-title">
        <img className="certificate-emblem" src={`/jelly/${category.icon}.png`} alt="" draggable={false} />
        <header className="certificate-header">
          <h2 id="certificate-title">{category.title}</h2>
          <button type="button" className="certificate-close" aria-label={`Close ${category.title.toLowerCase()} details`} onClick={onClose}>×</button>
        </header>
        <ul className="certificate-list">
          {category.content || <>
          <li>IELTS Overall6.5</li>
          <li>CET-4 CET-6: Professional Working Proficiency</li>
          <li>NCRE Level 2 Certificate for Advanced MS Office Applications</li>
          <li>2024 National University Robot Contest ROBOCON &quot;Grain in Barn&quot; | Project Lead
            <p>Received five National First Prizes, three National Second Prizes, one National Third Prize, and the National Runner-up Award for Overall Performance</p>
          </li>
          <li>National First Prize | The 7th National University Contest on Intelligent Robotic Innovation</li>
          </>}
        </ul>
      </article>
      </div>
    </div>
  );
}
