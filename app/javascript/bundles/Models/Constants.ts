export const CARRIER_CANVAS_ID = 'carrierCanvas'
export const BEAT_CANVAS_ID = 'beatCanvas'
export const MAIN_CONTAINER_ID = 'mainContainer'
export const NAVBAR_HEIGHT = '72px'
export const BOTTOM_BAR_HEIGHT = '56px' // TODO definitely subject to change as bottom nav is not symmetrical vertically
export const FEATURE_GRAPH_BACKGROUND = '#301D54'

export const animationStyles =
`
<style>
    .fadeOutUp {
        animation: fadeOutUp 1s forwards;
    }
    
    .fadeInDown {
        animation: fadeInDown 0.5s forwards;
    }
    
    @keyframes fadeOutUp {
        0% {
            opacity: 1;
            top: 0;
        }
        100% {
            opacity: 0;
            top: -100%
        }
    }
    
    @keyframes fadeInDown {
        0% {
            opacity: 0;
            top: -100%
        }
        100% {
            opacity: 1;
            top: 0;
        }
    }
    
    
    /*used in twinkleTwinkle*/
    @keyframes twinkle {
        0% {
            opacity: 1;
        }
        30% {
            opacity: 1;
        }
        70% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
`
