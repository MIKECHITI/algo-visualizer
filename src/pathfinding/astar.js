/**
 * A* Search
 * Time: O(E log V) | Space: O(V)
 * Uses a heuristic (Manhattan distance) to guide search toward the goal — fastest in practice.
 */
function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

export function astar(grid, start, end) {
  const frames = []
  const rows = grid.length
  const cols = grid[0].length
  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity))
  const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity))
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null))
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))

  gScore[start.row][start.col] = 0
  fScore[start.row][start.col] = heuristic(start, end)

  const openSet = [{ row: start.row, col: start.col }]
  const visitedSet = new Set()
  let found = false

  const addFrame = (msg) =>
    frames.push({ visitedSet: new Set(visitedSet), pathSet: [], msg })

  addFrame('Starting A* — using Manhattan distance heuristic to guide search...')

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore[a.row][a.col] - fScore[b.row][b.col])
    const { row, col } = openSet.shift()

    if (visited[row][col]) continue
    visited[row][col] = true
    const key = `${row},${col}`
    visitedSet.add(key)
    const h = heuristic({ row, col }, end)
    addFrame(`Visiting (${row}, ${col}) — g=${gScore[row][col]}, h=${h}, f=${gScore[row][col]+h}`)

    if (row === end.row && col === end.col) {
      found = true
      break
    }

    const neighbors = [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 },
    ]

    for (const n of neighbors) {
      if (n.row >= 0 && n.row < rows && n.col >= 0 && n.col < cols &&
          !visited[n.row][n.col] && grid[n.row][n.col] !== 'wall') {
        const tentativeG = gScore[row][col] + 1
        if (tentativeG < gScore[n.row][n.col]) {
          parent[n.row][n.col] = { row, col }
          gScore[n.row][n.col] = tentativeG
          fScore[n.row][n.col] = tentativeG + heuristic(n, end)
          openSet.push(n)
        }
      }
    }
  }

  if (found) {
    const path = []
    let cur = end
    while (cur) {
      path.unshift(`${cur.row},${cur.col}`)
      cur = parent[cur.row][cur.col]
    }
    frames.push({ visitedSet: new Set(visitedSet), pathSet: path, msg: `Shortest path found! Length: ${path.length} steps` })
    return { frames, found: true }
  }

  frames.push({ visitedSet: new Set(visitedSet), pathSet: [], msg: 'No path found' })
  return { frames, found: false }
}
