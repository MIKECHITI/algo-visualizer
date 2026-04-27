import { useState, useRef, useCallback } from 'react'
import { bfs, dfs, dijkstra, astar } from '../pathfinding/index.js'

const algoMap = { bfs, dfs, dijkstra, astar }

const ROWS = 20
const COLS = 35

function makeEmptyGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill('empty'))
}

function speedToDelay(speed) {
  return Math.round(500 / Math.pow(speed, 1.4))
}

export function usePathfinder() {
  const [algoKey, setAlgoKey] = useState('astar')
  const [speed, setSpeed] = useState(7)
  const [grid, setGrid] = useState(makeEmptyGrid)
  const [start, setStart] = useState({ row: 10, col: 5 })
  const [end, setEnd] = useState({ row: 10, col: 29 })
  const [frames, setFrames] = useState([])
  const [frameIdx, setFrameIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [done, setDone] = useState(false)
  const [drawMode, setDrawMode] = useState('wall') // 'wall' | 'erase' | 'start' | 'end'
  const [isDrawing, setIsDrawing] = useState(false)
  const timerRef = useRef(null)

  const stopPlay = useCallback(() => {
    clearInterval(timerRef.current)
    setPlaying(false)
  }, [])

  const clearPath = useCallback(() => {
    stopPlay()
    setFrames([])
    setFrameIdx(0)
    setDone(false)
  }, [stopPlay])

  const clearAll = useCallback(() => {
    stopPlay()
    setGrid(makeEmptyGrid())
    setFrames([])
    setFrameIdx(0)
    setDone(false)
  }, [stopPlay])

  const toggleCell = useCallback((row, col) => {
    if (row === start.row && col === start.col) return
    if (row === end.row && col === end.col) return
    setGrid(g => {
      const next = g.map(r => [...r])
      if (drawMode === 'wall') next[row][col] = next[row][col] === 'wall' ? 'empty' : 'wall'
      else if (drawMode === 'erase') next[row][col] = 'empty'
      return next
    })
    clearPath()
  }, [drawMode, start, end, clearPath])

  const movePoint = useCallback((row, col, type) => {
    if (grid[row][col] === 'wall') return
    clearPath()
    if (type === 'start') setStart({ row, col })
    else setEnd({ row, col })
  }, [grid, clearPath])

  const runAlgo = useCallback(() => {
    stopPlay()
    const fn = algoMap[algoKey]
    const { frames: newFrames } = fn(grid, start, end)
    setFrames(newFrames)
    setFrameIdx(0)
    setDone(false)

    setPlaying(true)
    timerRef.current = setInterval(() => {
      setFrameIdx(prev => {
        if (prev >= newFrames.length - 1) {
          clearInterval(timerRef.current)
          setPlaying(false)
          setDone(true)
          return prev
        }
        return prev + 1
      })
    }, speedToDelay(speed))
  }, [algoKey, grid, start, end, speed, stopPlay])

  const stepForward = useCallback(() => {
    stopPlay()
    setFrameIdx(prev => Math.min(prev + 1, frames.length - 1))
  }, [frames.length, stopPlay])

  const stepBack = useCallback(() => {
    stopPlay()
    setFrameIdx(prev => Math.max(prev - 1, 0))
  }, [stopPlay])

  const currentFrame = frames[frameIdx] || null

  return {
    algoKey, setAlgoKey,
    speed, setSpeed,
    grid, start, end,
    frames, frameIdx,
    playing, done,
    drawMode, setDrawMode,
    isDrawing, setIsDrawing,
    currentFrame,
    toggleCell, movePoint,
    runAlgo, stepForward, stepBack,
    clearPath, clearAll,
  }
}
