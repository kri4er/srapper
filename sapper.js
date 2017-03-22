var width = 8
var height = 8
var mines = []

// returns random number in range [0, max)
function rand(max) {
  return Math.floor(Math.random() * max)
}

// returns mine count around the given cell
function proximity(cx, cy) { // cx = 2, cy = 5
    let count  = 0
    for (let x = Math.max(0, cx - 1); x <= Math.min(cx + 1, width - 1); ++x)
        for (let y = Math.max(0, cy - 1); y <= Math.min(cy + 1, height - 1); ++y)
            count += mines[y][x]
    return count;
}

function createField(count) {
    var $field = document.getElementById('field')
    for (let y = 0; y < height; ++y) { // for each row
        var $row = document.createElement('div')
        var row = []
        $row.className = 'row'
        for (let x = 0; x < width; ++x) { // fill row
            let $cell = document.createElement('div')
            $cell.className = 'cell'
            let $img = new Image()
            $img.src = 'mine.svg'
            $img.style.display = 'none'
            $cell.appendChild($img)
            $row.appendChild($cell)
            row.push(0)
            $cell.onclick = function() {
                if (mines[y][x]) {
                    $img.style.display = 'block'
                    $cell.style.background = '#800'
                    $("#boom").show(1000)
                }
                else {
                    let p = proximity(x, y)
                    if (p !== 0) {
                        $cell.innerHTML = p
                    }
                    $cell.style.background = '#0b0'
                }
            }
        }
        $field.appendChild($row)
        mines.push(row)
    }

    for (var i = 0; i < count; ++i) {
        while (true) {
            var x = rand(width)
            var y = rand(height)
            if (mines[y][x] === 0) {
                mines[y][x] = 1
                //mines[x][y].img.style.display = 'block'
                break;
            }
        }
    }
    console.log(JSON.stringify(mines))
}

window.onload = function() {
    $("#boom").hide()
    createField(15)
}
