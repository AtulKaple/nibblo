import React from 'react';

export default function Navbar() {
  return (
    <header className="topbar" data-topbar>
      <a
        className="topbar__logo"
        href="#"
        aria-label="NIBBLO — Back to top"
        data-magnetic
        onClick={(e) => e.preventDefault()}
        style={{
          background: '#efefe3',
          padding: '8px 16px',
          borderRadius: '999px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        }}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1389.96 632.97"
          style={{ width: '100px', height: 'auto' }}
        >
          <g style={{ fill: '#622B14' }}>
            <path d="M 100 520 C 89 520 80 511 80 500 L 80 160 C 80 149 89 140 100 140 L 140 140 C 151 140 160 147 165 156 L 225 430 L 225 160 C 225 149 234 140 245 140 L 265 140 C 276 140 285 149 285 160 L 285 500 C 285 511 276 520 265 520 L 225 520 C 214 520 205 513 200 504 L 140 230 L 140 500 C 140 511 131 520 120 520 Z" style={{ fill: '#622B14' }} />
            <path d="M 345 520 C 334 520 325 511 325 500 L 325 160 C 325 149 334 140 345 140 L 370 140 C 381 140 390 149 390 160 L 390 500 C 390 511 381 520 370 520 Z" style={{ fill: '#622B14' }} />
            <path d="M 450 520 C 439 520 430 511 430 500 L 430 160 C 430 149 439 140 450 140 L 530 140 C 570 140 600 165 600 215 C 600 248 582 272 555 285 C 588 300 605 328 605 375 C 605 435 565 520 510 520 Z M 485 200 L 485 290 L 525 290 C 545 290 558 278 558 245 C 558 212 545 200 525 200 Z M 485 340 L 485 460 L 528 460 C 550 460 565 442 565 400 C 565 358 550 340 528 340 Z" style={{ fill: '#622B14' }} />
            <path d="M 660 520 C 649 520 640 511 640 500 L 640 160 C 640 149 649 140 660 140 L 740 140 C 780 140 810 165 810 215 C 810 248 792 272 765 285 C 798 300 815 328 815 375 C 815 435 775 520 720 520 Z M 695 200 L 695 290 L 735 290 C 755 290 768 278 768 245 C 768 212 755 200 735 200 Z M 695 340 L 695 460 L 738 460 C 760 460 775 442 775 400 C 775 358 760 340 738 340 Z" style={{ fill: '#622B14' }} />
            <path d="M 870 520 C 859 520 850 511 850 500 L 850 160 C 850 149 859 140 870 140 L 895 140 C 906 140 915 149 915 160 L 915 465 L 990 465 C 1001 465 1010 474 1010 485 L 1010 500 C 1010 511 1001 520 990 520 Z" style={{ fill: '#622B14' }} />
            <path d="M 1160 140 C 1225 140 1275 195 1275 330 C 1275 465 1225 520 1160 520 C 1095 520 1045 465 1045 330 C 1045 195 1095 140 1160 140 Z M 1160 205 C 1125 205 1105 245 1105 330 C 1105 415 1125 455 1160 455 C 1195 455 1215 415 1215 330 C 1215 245 1195 205 1160 205 Z" style={{ fill: '#622B14' }} />
            <path d="M 1150 95 C 1130 95 1105 75 1110 45 C 1135 40 1165 65 1155 95 Z M 1165 95 C 1185 95 1210 75 1205 45 C 1180 40 1150 65 1160 95 Z" style={{ fill: '#622B14' }} />
          </g>
        </svg>
      </a>

      {/* <p className="topbar__status" data-status>
        <span className="topbar__dot" aria-hidden="true" />
        <span data-status-text>High Fibre · No Maida · Baked Not Fried</span>
      </p> */}

      <a className="topbar__link" href="#" data-magnetic data-cursor-text="Nibblo!" onClick={(e) => e.preventDefault()}>
        <span>The Smarter Snack</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </header>
  );
}
