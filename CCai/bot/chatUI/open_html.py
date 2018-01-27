
import webbrowser

if __name__ == '__main__':

    chrome = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s"
    url = 'http://localhost:63342/CCai/bot/chatUI/index.html'
    webbrowser.get(chrome).open(url)