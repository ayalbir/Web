import React, { useRef } from 'react';
import './Tags.css';
import tags from './Tags.json';

const Tags = () => {
  const tagsContainerRef = useRef(null);

  const scrollTags = (direction) => {
    if (tagsContainerRef.current) {
      const container = tagsContainerRef.current;
      const scrollAmount = direction === 'left' ? -container.clientWidth : container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="row bg-white mb-3 position-relative tags-row">
      <button 
        className="scroll-btn left" 
        onClick={() => scrollTags('left')}
      >
        &lt;
      </button>
      <div className="tags-container" ref={tagsContainerRef}>
        {tags.map((tag, index) => (
          <button key={index} type="button" className="btn btn-light m-3 tag">{tag.text}</button>
        ))}
      </div>
      <button 
        className="scroll-btn right" 
        onClick={() => scrollTags('right')}
      >
        &gt;
      </button>
    </div>
  );
};

export default Tags;
