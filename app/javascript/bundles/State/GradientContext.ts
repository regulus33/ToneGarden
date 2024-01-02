import {createContext, useContext} from 'react';
import Gradient from "../Models/Gradient";

export type GradientContextType = {
    gradient: Gradient;
    setGradient: (gradient: Gradient) => void;
}

export const GradientContext = createContext<GradientContextType>({
    gradient: new Gradient('alpha'),
    setGradient: gradient => {}
});
export const useGradient = () => useContext(GradientContext)