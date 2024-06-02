import React, { useRef } from 'react';
import './Tags.css';
import tags from './Tags.json';

const Tags = () => {
  const tagsContainerRef = useRef(null);

  const scrollTags = (direction) => {
    console.log('Scroll direction:', direction);
    if (tagsContainerRef.current) {
      const container = tagsContainerRef.current;
      const scrollAmount = direction === 'left' ? -container.clientWidth : container.clientWidth;
      console.log('Scroll amount:', scrollAmount);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="tags-container">
      <button className="scroll-btn left" onClick={() => scrollTags('left')}>
        &lt;
      </button>
      <div className="tags-inner" ref={tagsContainerRef}>
        {tags.map((tag, index) => (
          <button key={index} type="button" className="tag">{tag.text}</button>
        ))}
      </div>
      <button className="scroll-btn right" onClick={() => scrollTags('right')}>
        &gt;
      </button>
    </div>
  );
};

export default Tags;
