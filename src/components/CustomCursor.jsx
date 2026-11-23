import React from 'react';

export default function CustomCursor() {
  return (
    <div className="cursor" data-cursor aria-hidden="true">
      <span className="cursor__dot"></span>
      <span className="cursor__label" data-cursor-label></span>
    </div>
  );
}

