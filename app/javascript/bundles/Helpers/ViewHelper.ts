const modifier: string = '--dark-mode';

export function classList(list: Array<string>, theme: String): string {
    if (theme == "dark") {
        const darkMode = list.map((value) => value + modifier)
        return [...list,...darkMode].join(' ')
    }
    return list.join(' ')
}

export function chompString(chars: number, s: string) {
    if(s.length > chars) {
       return `${s.substring(0,chars)}...`
    }
    return s
}


