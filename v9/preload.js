const {ipcRenderer} = require("electron")
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    const printBtn = document.getElementById("printBtn")
    printBtn.addEventListener('click', () => {
        ipcRenderer.send('print')
    })
    console.log(process.versions)
})
