/**
 * Depth-First Search
 * Time: O(V + E) | Space: O(V)
 * Explores as deep as possible before backtracking. Does NOT guarantee shortest path.
 */
export function dfs(grid, start, end) {
  const frames = []
  const rows = grid.length
  const cols = grid[0].length
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null))

  const visitedSet = new Set()
  let found = false

  const addFrame = (msg) =>
    frames.push({ visitedSet: new Set(visitedSet), pathSet: [], msg })

  addFrame('Starting DFS — exploring as deep as possible first...')

  function dfsRecurse(row, col) {
    if (found) return
    if (row < 0 || row >= rows || col < 0 || col >= cols) return
    if (visited[row][col] || grid[row][col] === 'wall') return

    visited[row][col] = true
    const key = `${row},${col}`
    visitedSet.add(key)
    addFrame(`Visiting (${row}, ${col})`)

    if (row === end.row && col === end.col) {
      found = true
      return
    }

    const dirs = [[-1,0],[1,0],[0,-1],[0,1]]
    for (const [dr, dc] of dirs) {
      if (found) break
      const nr = row + dr, nc = col + dc
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] !== 'wall') {
        parent[nr][nc] = { row, col }
        dfsRecurse(nr, nc)
      }
    }
  }

  dfsRecurse(start.row, start.col)

  if (found) {
    const path = []
    let cur = end
    while (cur) {
      path.unshift(`${cur.row},${cur.col}`)
      cur = parent[cur.row][cur.col]
    }
    frames.push({ visitedSet: new Set(visitedSet), pathSet: path, msg: `Path found! Length: ${path.length} steps (not necessarily shortest)` })
    return { frames, found: true }
  }

  frames.push({ visitedSet: new Set(visitedSet), pathSet: [], msg: 'No path found' })
  return { frames, found: false }
}
