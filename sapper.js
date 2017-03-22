var width = 8
var height = 8

// returns random number in range [0, max)
function rand(max) {
  return Math.floor(Math.random() * max)
}

function cellAt(x, y) {
    return document.getElementById('field').children[y].children[x]
}

// calls fn function for each neighbor of the cell at (x, y)
function forEachNeighbor(x, y, fn) {
    for (let cx = Math.max(0, x - 1); cx <= Math.min(x + 1, width - 1); ++cx)
        for (let cy = Math.max(0, y - 1); cy <= Math.min(y + 1, height - 1); ++cy)
            fn(cx, cy) // call fn function
}

// returns mine count around the given cell
function proximity(x, y) {
    let count  = 0
    forEachNeighbor(x, y, function(x, y) {
        if ($(cellAt(x, y)).hasClass('mine'))
            count += 1
    })
    return count;
}

// opens the cell at (x, y)
function open(x, y) {
    var cell = cellAt(x, y)
    if ($(cell).hasClass('open') || $(cell).hasClass('mark'))
        return
    $(cell).addClass('open')
    if ($(cell).hasClass('mine')) {
        $("#result").addClass('lose')
    }
    else {
        let p = proximity(x, y)
        if (p !== 0) {
            cell.innerText = p
        }
        else {
            forEachNeighbor(x, y, function(x, y) { open(x, y) })
        }
    }
}

function isWinner() {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var $cell = $(cellAt(x, y));
            if (!$cell.hasClass("open") && !$cell.hasClass("mine")) {
                return false
            }
        }
    }
    return true
}

function mark(x, y) {
    var $cell = $(cellAt(x, y))
    if (!$cell.hasClass('open')) {
        $cell.toggleClass('mark')
    }
}

function createField() {
    var $field = document.getElementById('field')
    for (let y = 0; y < height; ++y) { // for each row
        var $row = document.createElement('div')
        $row.className = 'row'
        for (let x = 0; x < width; ++x) { // for each cell in row
            let $cell = document.createElement('div')
            $cell.className = 'cell'
            $row.appendChild($cell)
            $cell.onclick = function() {
                open(x, y)
                if (isWinner()) {
                    $("#result").addClass('win')
                }
            }
            $cell.onmouseup = function(ev) { if (ev.button === 2) { mark(x, y) } }
        }
        $field.appendChild($row)
    }
}

function createMines(count) {
    for (var i = 0; i < count; ++i) {
        while (true) {
            var $cell = $(cellAt(rand(width), rand(height)))
            if (!$cell.hasClass('mine')) {
                $cell.addClass('mine')
                break
            }
        }
    }
}

window.onload = function() {
    window.oncontextmenu = function() { return false }
    $(".boom").hide()
    createField()
    createMines(10)
}
