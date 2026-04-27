import React from 'react'
import { usePathfinder } from '../hooks/usePathfinder.js'
import { PathGrid } from './PathGrid.jsx'
import { PATHFINDING_ALGORITHMS } from '../pathfinding/index.js'

export function PathfinderView() {
  const {
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
  } = usePathfinder()

  const info = PATHFINDING_ALGORITHMS[algoKey]

  const stats = currentFrame
    ? { visited: currentFrame.visitedSet?.size ?? 0, path: currentFrame.pathSet?.length ?? 0 }
    : { visited: 0, path: 0 }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {Object.entries(PATHFINDING_ALGORITHMS).map(([key, a]) => (
          <button
            key={key}
            onClick={() => { setAlgoKey(key); clearPath() }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              algoKey === key
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-slate-600 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
          <p className="text-xs text-slate-400 mb-1">Algorithm</p>
          <p className="text-lg font-medium">{info.fullName}</p>
          <p className="text-sm text-slate-400 mt-1">{info.description}</p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
          <p className="text-xs text-slate-400 mb-2">Properties</p>
          <div className="flex gap-4 text-sm flex-wrap">
            <div>
              <p className="text-slate-400 text-xs">Time</p>
              <p className="font-mono font-medium text-amber-400">{info.time}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Space</p>
              <p className="font-mono font-medium text-blue-400">{info.space}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Shortest path?</p>
              <p className={`font-medium text-sm ${info.guaranteesShortest ? 'text-teal-400' : 'text-red-400'}`}>
                {info.guaranteesShortest ? 'Guaranteed' : 'Not guaranteed'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-slate-400">Draw:</span>
        {[
          { key: 'wall', label: 'Wall' },
          { key: 'erase', label: 'Erase' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setDrawMode(key)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
              drawMode === key
                ? 'bg-slate-500 border-slate-400 text-white'
                : 'border-slate-600 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
        <span className="text-xs text-slate-500">| Click+drag on grid to draw walls</span>
      </div>

      <div className="overflow-x-auto">
        <PathGrid
          grid={grid}
          start={start}
          end={end}
          currentFrame={currentFrame}
          drawMode={drawMode}
          isDrawing={isDrawing}
          setIsDrawing={setIsDrawing}
          onCellInteract={toggleCell}
          onMovePoint={movePoint}
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          <button
            onClick={clearPath}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors"
          >
            Clear path
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors"
          >
            Clear all
          </button>
          <button
            onClick={runAlgo}
            disabled={playing}
            className="px-6 py-1.5 text-sm rounded-lg border border-blue-500 bg-blue-500 hover:bg-blue-400 text-white font-medium transition-colors disabled:opacity-50"
          >
            {playing ? 'Running...' : 'Visualize!'}
          </button>
          <button
            onClick={stepBack}
            disabled={frameIdx === 0 || frames.length === 0}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors disabled:opacity-30"
          >
            ‹
          </button>
          <button
            onClick={stepForward}
            disabled={frameIdx >= frames.length - 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors disabled:opacity-30"
          >
            ›
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Speed</span>
          <input
            type="range" min="1" max="10" step="1" value={speed}
            onChange={e => setSpeed(parseInt(e.target.value))}
            className="w-24 accent-blue-400"
          />
          <span className="w-4 text-slate-300">{speed}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
          <span className="text-slate-400">Cells visited </span>
          <span className="font-medium text-blue-400">{stats.visited}</span>
        </div>
        <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
          <span className="text-slate-400">Path length </span>
          <span className="font-medium text-amber-400">{stats.path > 0 ? stats.path : '—'}</span>
        </div>
        <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
          <span className="text-slate-400">Step </span>
          <span className="font-medium text-slate-300">{frames.length > 0 ? frameIdx + 1 : 0}</span>
          <span className="text-slate-500"> / {frames.length}</span>
        </div>
        {currentFrame && (
          <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700 flex-1">
            <span className="text-slate-300 text-xs">{currentFrame.msg}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-slate-400">
        {[
          { color: 'bg-teal-400', label: 'Start (S)' },
          { color: 'bg-red-400',  label: 'End (E)' },
          { color: 'bg-slate-400', label: 'Wall' },
          { color: 'bg-blue-900', label: 'Visited' },
          { color: 'bg-amber-400', label: 'Path' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${color}`} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
