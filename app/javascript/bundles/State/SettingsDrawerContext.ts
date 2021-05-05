import { createContext, useContext } from 'react'
import DrawerState from '../Models/DrawerState'

export type SettingsDrawerContextType = {
    drawerState: DrawerState,
    setDrawerState: (drawerState: DrawerState) => void
}

export const SettingsDrawerContext = createContext<SettingsDrawerContextType>({drawerState: new DrawerState(false, 'left'), setDrawerState: (drawerState => {})});
export const useSettingsDrawer = () => useContext(SettingsDrawerContext)