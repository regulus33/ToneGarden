export default function Environment(): 'development'|'production' {
    if(window.location.href.includes('localhost')) {
        return 'development'
    }
    return 'production'
}