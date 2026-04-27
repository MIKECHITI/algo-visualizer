export { bfs } from './bfs.js'
export { dfs } from './dfs.js'
export { dijkstra } from './dijkstra.js'
export { astar } from './astar.js'

export const PATHFINDING_ALGORITHMS = {
  bfs: {
    name: 'BFS',
    fullName: 'Breadth-First Search',
    time: 'O(V + E)',
    space: 'O(V)',
    description: 'Explores all neighbours level by level. Always finds the shortest path on unweighted grids.',
    guaranteesShortest: true,
    weighted: false,
  },
  dfs: {
    name: 'DFS',
    fullName: 'Depth-First Search',
    time: 'O(V + E)',
    space: 'O(V)',
    description: 'Dives deep before backtracking. Fast but does not guarantee shortest path.',
    guaranteesShortest: false,
    weighted: false,
  },
  dijkstra: {
    name: "Dijkstra's",
    fullName: "Dijkstra's Algorithm",
    time: 'O((V+E) log V)',
    space: 'O(V)',
    description: 'Expands the closest node first. Guarantees shortest path and supports weighted edges.',
    guaranteesShortest: true,
    weighted: true,
  },
  astar: {
    name: 'A*',
    fullName: 'A* Search',
    time: 'O(E log V)',
    space: 'O(V)',
    description: 'Uses Manhattan distance heuristic to guide search. Fastest in practice for grid pathfinding.',
    guaranteesShortest: true,
    weighted: true,
  },
}
