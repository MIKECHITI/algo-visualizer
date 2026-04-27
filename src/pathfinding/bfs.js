/**
 * Breadth-First Search
 * Time: O(V + E) | Space: O(V)
 * Explores neighbours level by level — guarantees shortest path on unweighted grids.
 */
export function bfs(grid, start, end) {
  const frames = []
  const rows = grid.length
  const cols = grid[0].length
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null))
  const queue = [start]
  visited[start.row][start.col] = true

  const addFrame = (visitedSet, pathSet, msg) =>
    frames.push({ visitedSet: [...visitedSet], pathSet: [...pathSet], msg })

  const visitedSet = new Set()
  let found = false

  addFrame(visitedSet, [], 'Starting BFS — exploring level by level...')

  while (queue.length > 0) {
    const { row, col } = queue.shift()
    const key = `${row},${col}`

    if (row === end.row && col === end.col) {
      found = true
      break
    }

    visitedSet.add(key)
    addFrame(visitedSet, [], `Visiting (${row}, ${col})`)

    const neighbors = [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 },
    ]

    for (const n of neighbors) {
      if (n.row >= 0 && n.row < rows && n.col >= 0 && n.col < cols &&
          !visited[n.row][n.col] && grid[n.row][n.col] !== 'wall') {
        visited[n.row][n.col] = true
        parent[n.row][n.col] = { row, col }
        queue.push(n)
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
    addFrame(visitedSet, path, `Path found! Length: ${path.length} steps`)
    return { frames, found: true }
  }

  addFrame(visitedSet, [], 'No path found — destination unreachable')
  return { frames, found: false }
}
