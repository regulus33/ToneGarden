import {createContext, useContext} from 'react';
import FlashMessage, {FlashEnum} from "../Models/FlashMessage";

export type FlashContextType = {
    flashMessage: FlashMessage,
    setFlashMessage: (flash: FlashMessage) => void;
}

export const FlashMessageContext = createContext<FlashContextType>({
    flashMessage: new FlashMessage('Success', false, FlashEnum.success),
    setFlashMessage: (m: FlashMessage) => null
});
export const useFlashMessage = () => useContext(FlashMessageContext)