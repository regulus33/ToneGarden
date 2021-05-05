export type Anchor = 'top' | 'left' | 'bottom' | 'right';

class DrawerState {
    anchor: Anchor
    open = false

    constructor(open: boolean, anchor: Anchor) {
        this.anchor = anchor
        this.open = open
    }
}

export default DrawerState

