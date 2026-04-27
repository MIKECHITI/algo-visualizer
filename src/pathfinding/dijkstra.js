/**
 * Dijkstra's Algorithm
 * Time: O((V + E) log V) | Space: O(V)
 * Finds shortest path on weighted graphs. On unweighted grids behaves like BFS.
 */
export function dijkstra(grid, start, end) {
  const frames = []
  const rows = grid.length
  const cols = grid[0].length
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity))
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null))
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))

  dist[start.row][start.col] = 0
  // Simple priority queue using sorted array (good enough for grid sizes)
  const pq = [{ row: start.row, col: start.col, d: 0 }]
  const visitedSet = new Set()
  let found = false

  const addFrame = (msg) =>
    frames.push({ visitedSet: new Set(visitedSet), pathSet: [], msg })

  addFrame('Starting Dijkstra — always expanding the closest unvisited node...')

  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d)
    const { row, col, d } = pq.shift()

    if (visited[row][col]) continue
    visited[row][col] = true
    const key = `${row},${col}`
    visitedSet.add(key)
    addFrame(`Visiting (${row}, ${col}) — distance: ${d}`)

    if (row === end.row && col === end.col) {
      found = true
      break
    }

    const neighbors = [
      { row: row - 1, col, w: 1 },
      { row: row + 1, col, w: 1 },
      { row, col: col - 1, w: 1 },
      { row, col: col + 1, w: 1 },
    ]

    for (const n of neighbors) {
      if (n.row >= 0 && n.row < rows && n.col >= 0 && n.col < cols &&
          !visited[n.row][n.col] && grid[n.row][n.col] !== 'wall') {
        const newDist = d + n.w
        if (newDist < dist[n.row][n.col]) {
          dist[n.row][n.col] = newDist
          parent[n.row][n.col] = { row, col }
          pq.push({ row: n.row, col: n.col, d: newDist })
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
