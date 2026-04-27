import React, { useCallback } from 'react'

const CELL_SIZE = 22

const CELL_STYLE = {
  empty:    'bg-slate-800',
  wall:     'bg-slate-400',
  visited:  'bg-blue-900',
  path:     'bg-amber-400',
  start:    'bg-teal-400',
  end:      'bg-red-400',
}

export function PathGrid({ grid, start, end, currentFrame, drawMode, isDrawing, setIsDrawing, onCellInteract, onMovePoint }) {
  const ROWS = grid.length
  const COLS = grid[0].length

  const getCellType = useCallback((row, col) => {
    if (row === start.row && col === start.col) return 'start'
    if (row === end.row && col === end.col) return 'end'

    if (currentFrame) {
      const key = `${row},${col}`
      if (currentFrame.pathSet?.includes(key)) return 'path'
      if (currentFrame.visitedSet?.has(key)) return 'visited'
    }

    return grid[row][col] === 'wall' ? 'wall' : 'empty'
  }, [grid, start, end, currentFrame])

  const handleMouseDown = useCallback((row, col, e) => {
    e.preventDefault()
    if (row === start.row && col === start.col) {
      onMovePoint(row, col, 'start')
      return
    }
    if (row === end.row && col === end.col) {
      onMovePoint(row, col, 'end')
      return
    }
    setIsDrawing(true)
    onCellInteract(row, col)
  }, [start, end, drawMode, setIsDrawing, onCellInteract, onMovePoint])

  const handleMouseEnter = useCallback((row, col) => {
    if (!isDrawing) return
    onCellInteract(row, col)
  }, [isDrawing, onCellInteract])

  const handleMouseUp = useCallback(() => setIsDrawing(false), [setIsDrawing])

  return (
    <div
      className="rounded-xl border border-slate-700 overflow-hidden select-none"
      style={{ display: 'inline-block' }}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {grid.map((row, r) => (
        <div key={r} style={{ display: 'flex' }}>
          {row.map((_, c) => {
            const type = getCellType(r, c)
            return (
              <div
                key={c}
                className={`border-r border-b border-slate-700/30 cursor-pointer transition-colors duration-75 ${CELL_STYLE[type]}`}
                style={{ width: CELL_SIZE, height: CELL_SIZE, flexShrink: 0 }}
                onMouseDown={e => handleMouseDown(r, c, e)}
                onMouseEnter={() => handleMouseEnter(r, c)}
              >
                {type === 'start' && (
                  <div className="w-full h-full flex items-center justify-center text-slate-900 font-bold text-xs">S</div>
                )}
                {type === 'end' && (
                  <div className="w-full h-full flex items-center justify-center text-slate-900 font-bold text-xs">E</div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
