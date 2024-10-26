import React from 'react';
import Map from './Map';

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10">
          <Map />
        </div>
      </div>
    </div>
  );
}