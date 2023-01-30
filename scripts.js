const columns = document.querySelectorAll('.col')
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code === 'Space') {
        setRandomColor()
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type
    if (type === 'lock') {
        const node = event.target.nodeName === 'I' ? event.target : event.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickColor(event.target.textContent)
    }
})

/*const generateRandomColor = () => {
    const hex = '123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * hex.length)]
    }
    return color
}*/
const setRandomColor = (isInitial) => {
    const colors = isInitial ? getColorsFromHash() : []

    columns.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random()

        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = color
        col.style.background = color

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)


}
const setTextColor = (text, color) => {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'

}
const copyToClickColor = (text) => {
    return navigator.clipboard.writeText(text)

}

const updateColorsHash = (colors = []) => {
    document.location.hash = colors
        .map((col) => {
            return col.toString().substring(1)
        })
        .join('-')
}

const getColorsFromHash = () => {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((color) => '#' + color)
    }
    return []
}

setRandomColor(true)