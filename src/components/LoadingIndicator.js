import React from 'react';
import loadingGif from '../loading.gif';
import './LoadingIndicator.css';

export default function LoadingIndicator() {
  return <img className="LoadingIndicator" src={loadingGif} alt="loading" />
}
