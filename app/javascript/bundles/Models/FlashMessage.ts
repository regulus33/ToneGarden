export enum FlashEnum {
    error = 'error',
    warning = 'warning',
    success = 'success',
    info = 'info'
}

export type FlashType =
    FlashEnum.error |
    FlashEnum.warning |
    FlashEnum.success |
    FlashEnum.info


class FlashMessage {
    private pType: FlashType
    public visible: boolean
    public text: string

    constructor(text: string, visible: boolean, type: FlashType) {
        this.text = text
        this.visible = visible
        this.pType = type
    }

    public get type(): FlashType {
        return this.pType
    }
}

export default FlashMessage