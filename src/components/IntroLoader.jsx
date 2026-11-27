import React from 'react';

export default function IntroLoader() {
  return (
    <div className="intro" data-intro aria-hidden="true">
    	<div className="intro__panels">
    		<span style={{ '--c': '#622B14' }}></span>
    		<span style={{ '--c': '#7A381B' }}></span>
    		<span style={{ '--c': '#914624' }}></span>
    		<span style={{ '--c': '#A75830' }}></span>
    		<span style={{ '--c': '#BD6D40' }}></span>
    	</div>
    	<div className="intro__logo"><svg className="intro__svg"  aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1389.96 632.97">
      <g id="tp1-Layer_1" style={{ fill: '#efefe3' }}>
        <path id="tp1-n" d="M 100 543 C 89 547 80 541 80 530 L 80 190 C 80 179 89 167 100 163 L 140 152 C 151 149 160 153 165 161 L 225 419 L 225 149 C 225 138 234 127 245 125 L 265 120 C 276 118 285 125 285 136 L 285 476 C 285 487 276 498 265 500 L 225 509 C 214 512 205 507 200 499 L 140 242 L 140 512 C 140 523 131 534 120 537 Z" style={{ fill: '#efefe3' }} />
        <path id="tp1-i" d="M 345 485 C 334 486 325 479 325 468 L 325 128 C 325 117 334 106 345 105 L 370 100 C 381 99 390 106 390 117 L 390 457 C 390 468 381 479 370 480 Z" style={{ fill: '#efefe3' }} />
        <path id="tp1-b1" d="M 450 469 C 439 470 430 463 430 452 L 430 112 C 430 101 439 90 450 89 L 530 81 C 570 79 600 102 600 152 C 600 185 582 210 555 225 C 588 238 605 265 605 312 C 605 372 565 459 510 463 Z M 485 145 L 485 235 L 525 232 C 545 230 558 217 558 184 C 558 151 545 140 525 142 Z M 485 285 L 485 405 L 528 401 C 550 400 565 381 565 339 C 565 297 550 280 528 281 Z" style={{ fill: '#efefe3' }} />
        <path id="tp1-b2" d="M 660 456 C 649 456 640 447 640 436 L 640 96 C 640 85 649 76 660 76 L 740 77 C 780 79 810 106 810 156 C 810 189 792 212 765 223 C 798 240 815 270 815 317 C 815 377 775 459 720 457 Z M 695 136 L 695 226 L 735 227 C 755 228 768 217 768 184 C 768 151 755 138 735 137 Z M 695 276 L 695 396 L 738 397 C 760 398 775 381 775 339 C 775 297 760 278 738 277 Z" style={{ fill: '#efefe3' }} />
        <path id="tp1-l" d="M 870 467 C 859 465 850 456 850 445 L 850 105 C 850 94 859 85 870 87 L 895 89 C 906 91 915 101 915 112 L 915 417 L 990 428 C 1001 430 1010 441 1010 452 L 1010 467 C 1010 478 1001 485 990 483 Z" style={{ fill: '#efefe3' }} />
        <path id="tp1-o" d="M 1160 140 C 1225 158 1275 229 1275 364 C 1275 499 1225 538 1160 520 C 1095 504 1045 438 1045 303 C 1045 168 1095 124 1160 140 Z M 1160 205 C 1125 196 1105 231 1105 316 C 1105 401 1125 446 1160 455 C 1195 464 1215 430 1215 345 C 1215 260 1195 214 1160 205 Z" style={{ fill: '#efefe3' }} />
        <path id="tp1-sprout" d="M 1150 92 C 1130 87 1105 61 1110 33 C 1135 34 1165 66 1155 94 Z M 1165 96 C 1185 102 1210 89 1205 57 C 1180 45 1150 62 1160 95 Z" style={{ fill: '#efefe3' }} />
      </g>
    </svg></div>
    		<div className="intro__wait">
    		<span className="intro__pincho intro__crunch bite">
    			<img
    				src="/wp-content/themes/emg-nibblo/assets/img/fonds/packaging.svg"
    				alt="NIBBLO Packaging"
    				loading="eager"
    				decoding="sync"
    				className="intro__packaging-svg"
    				aria-hidden="true"
    			/>
    		</span>
    		<ul className="intro__msgs" style={{ '--n': '10', fontFamily: 'var(--f-title)' }}>
    		<li style={{ '--i': '0' }}>Popping crisp ancient millets: golden Jowar &amp; Ragi…</li>
    		<li style={{ '--i': '1' }}>Tempering silky, rich dark chocolate…</li>
    		<li style={{ '--i': '2' }}>Drizzling organic jaggery for caramel depth…</li>
    		<li style={{ '--i': '3' }}>Infusing airy rice crisps for the signature crunch…</li>
    		<li style={{ '--i': '4' }}>Baking to perfection, never fried. Wholesome &amp; crisp…</li>
    		<li style={{ '--i': '5' }}>Enrobing each bite in velvety dark chocolate…</li>
    		<li style={{ '--i': '6' }}>Quality check: zero maida, high fibre, 100% wholesome…</li>
    		<li style={{ '--i': '7' }}>Sealing fresh 150g resealable zipper pouches…</li>
    		<li style={{ '--i': '8' }}>The Smarter Snack: crunchy, wholesome, irresistible…</li>
    		<li style={{ '--i': '9' }}>Ready to crunch. Bite into NIBBLO!</li>
    		</ul>
    		<span className="intro__bar"><i data-intro-bar></i></span>
    	</div>
    	<p className="intro__done" data-intro-done>Crunch! Nibblo!</p>
    	<p className="intro__word">Nibblooo!</p>
    </div>
  );
}
