function wheelOnBar(event) {
    event.preventDefault()

    if (event.deltaY > 0) {
        event.currentTarget.scrollLeft += 100
    } else {
        event.currentTarget.scrollLeft -= 100
    }
}