import './HomeVideo.scss';



import React from 'react';
import { Player } from 'video-react';
import Trailer from '../../images/Trailer.mp4'
 
export default props => {
  return (
      <div className="Trailer">
    <Player>
      <source src={Trailer} />
    </Player>
    </div>
  );
};


