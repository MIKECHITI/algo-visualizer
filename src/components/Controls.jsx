import React from 'react'

export function Controls({ playing, done, frameIdx, totalFrames, speed, size, onPlay, onPause, onStepForward, onStepBack, onRestart, onShuffle, onSpeedChange, onSizeChange }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex gap-2">
        <button
          onClick={onRestart}
          className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors"
          title="Go to start"
        >
          ⏮
        </button>
        <button
          onClick={onStepBack}
          disabled={frameIdx === 0}
          className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors disabled:opacity-30"
          title="Step back"
        >
          ‹
        </button>
        <button
          onClick={playing ? onPause : onPlay}
          disabled={done && !playing}
          className="px-5 py-1.5 text-sm rounded-lg border border-blue-500 bg-blue-500 hover:bg-blue-400 text-white font-medium transition-colors disabled:opacity-40"
        >
          {playing ? 'Pause' : done ? 'Done' : 'Play'}
        </button>
        <button
          onClick={onStepForward}
          disabled={frameIdx >= totalFrames - 1}
          className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors disabled:opacity-30"
          title="Step forward"
        >
          ›
        </button>
        <button
          onClick={onShuffle}
          className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors"
          title="New random array"
        >
          Shuffle
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span>Size</span>
        <input
          type="range" min="10" max="100" step="1" value={size}
          onChange={e => onSizeChange(parseInt(e.target.value))}
          className="w-24 accent-blue-400"
        />
        <span className="w-6 text-slate-300">{size}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span>Speed</span>
        <input
          type="range" min="1" max="10" step="1" value={speed}
          onChange={e => onSpeedChange(parseInt(e.target.value))}
          className="w-24 accent-blue-400"
        />
        <span className="w-4 text-slate-300">{speed}</span>
      </div>
    </div>
  )
}
