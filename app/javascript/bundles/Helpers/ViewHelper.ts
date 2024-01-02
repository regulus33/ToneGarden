import {Theme} from "../state/ThemeContext";

const modifier: string = '--dark-mode';

export function classList(list: Array<string>, theme: Theme): string {
    if (theme == Theme.Dark) return list.map((value) => value + modifier).join(' ');

    return list.join(' ');
}


