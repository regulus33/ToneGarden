import * as React from 'react';
import { useState, FunctionComponent } from 'react';

export interface Props {
  name:string;
}

const Whitenoise: FunctionComponent<Props> = (props: Props) => {
  const [name, setName] = useState(props.name);
  
  return (
    <div>
     I am hereeeeeee derp dgjwk fhjefkefjfhssss
    </div>
  );
}
  
export default Whitenoise;
 