import React from 'react'

const items = [
  { color: 'bg-blue-300',  label: 'unsorted' },
  { color: 'bg-amber-400', label: 'comparing' },
  { color: 'bg-red-400',   label: 'swapping' },
  { color: 'bg-pink-400',  label: 'pivot' },
  { color: 'bg-teal-400',  label: 'sorted' },
]

export function Legend() {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-1.5 text-xs text-slate-400">
          <div className={`w-3 h-3 rounded-sm ${color}`} />
          {label}
        </div>
      ))}
    </div>
  )
}
