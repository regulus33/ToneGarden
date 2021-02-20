const modifier: string = '--dark-mode';

export function classList(list: Array<string>, theme: String): string {
    if (theme == "dark") return list.map((value) => value + modifier).join(' ');
    return list.join(' ');
}


