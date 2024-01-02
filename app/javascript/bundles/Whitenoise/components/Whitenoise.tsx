import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import NoiseButton from './NoiseButton';
import { BROWN, PINK, WHITE } from '../../../static/colors';
import * as Tone from 'tone';
export interface Props {
  name:string;
}


const playBrown = () => {
  // alert("sound changed");
  // make the noise and connect it to the output
  const noise = new Tone.Noise({
    volume: 0,
    type: "brown"
  }).toDestination();

  const toneWaveform = new Tone.Waveform();
  noise.connect(toneWaveform);
  noise.start();
  // bind the inteface
}

const playWhite = ()=>{
  // alert("sound changed");
  // make the noise and connect it to the output
  const noise = new Tone.Noise({
    volume: -10,
    type: "white"
  }).toDestination();

  const toneWaveform = new Tone.Waveform();
  noise.connect(toneWaveform);
  noise.start();
  // bind the inteface
}

const playPink= ()=>{
  alert("sound changed");
  // make the noise and connect it to the output
  const noise = new Tone.Noise({
    volume: -10,
    type: "pink"
  }).toDestination();

  const toneWaveform = new Tone.Waveform();
  noise.connect(toneWaveform);
  noise.start();
  // bind the inteface
}


const Whitenoise: FunctionComponent<Props> = (props: Props) => {
  const [name, setName] = useState(props.name);
  
  return (
    <div>
      <div>
        <NoiseButton onSelect={playBrown} backgroundColor={WHITE} buttonText={"white"} />
      </div>
        <div>
        <NoiseButton onSelect={playPink} backgroundColor={PINK} buttonText={"pink"} />
      </div>
      <div>
        <NoiseButton onSelect={playWhite} backgroundColor={BROWN} buttonText={"brown"} />
      </div>
    </div>
  );
}
  
export default Whitenoise;
 