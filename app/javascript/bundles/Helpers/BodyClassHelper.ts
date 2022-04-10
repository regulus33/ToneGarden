import {Theme} from "../State/ThemeContext";

function BodyClassHelper(currentTheme: Theme.Dark | Theme.Light) {
  if(currentTheme === Theme.Dark) {
    document.body.classList.remove(Theme.Light)
    document.body.classList.add(Theme.Dark)
  } else {
    document.body.classList.remove(Theme.Dark)
    document.body.classList.add(Theme.Light)
  }
}

export default BodyClassHelper
