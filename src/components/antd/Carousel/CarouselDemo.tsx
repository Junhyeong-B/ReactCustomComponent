import React from 'react';
import Carousel from './Carousel';

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
} as const;

const CarouselDemo = () => {
  const onChange = (currentSide: number) => {
    console.log(currentSide);
  };

  return (
    <div>
      <h2>Scroll X</h2>
      <Carousel afterChange={onChange}>
        <div>
          <h3 style={{ ...contentStyle, background: '#364d79' }}>1</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: '#6d7936' }}>2</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: '#793636' }}>3</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: '#367945' }}>4</h3>
        </div>
      </Carousel>

      <h2>Fade</h2>
      <Carousel effect="fade" afterChange={onChange}>
        <div>
          <h3 style={{ ...contentStyle, background: '#364d79' }}>1</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: '#6d7936' }}>2</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: '#793636' }}>3</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: '#367945' }}>4</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselDemo;
