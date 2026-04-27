import React from 'react'

const BAR_COLORS = {
  sorted:    'bg-teal-400',
  swapped:   'bg-red-400',
  pivot:     'bg-pink-400',
  comparing: 'bg-amber-400',
  default:   'bg-blue-300',
}

export function BarCanvas({ frame }) {
  if (!frame) return <div className="w-full h-64 rounded-xl bg-slate-800 border border-slate-700" />

  const max = Math.max(...frame.arr)
  const { hl } = frame

  return (
    <div className="w-full h-64 rounded-xl bg-slate-800 border border-slate-700 flex items-end gap-px px-2 py-2 overflow-hidden">
      {frame.arr.map((val, i) => {
        const heightPct = Math.max(2, (val / max) * 100)
        let color = BAR_COLORS.default
        if (hl.sorted?.includes(i))    color = BAR_COLORS.sorted
        else if (hl.swapped?.includes(i))  color = BAR_COLORS.swapped
        else if (hl.pivot?.includes(i))    color = BAR_COLORS.pivot
        else if (hl.comparing?.includes(i)) color = BAR_COLORS.comparing

        return (
          <div
            key={i}
            className={`flex-1 rounded-t transition-colors duration-75 ${color}`}
            style={{ height: `${heightPct}%`, minWidth: '2px' }}
          />
        )
      })}
    </div>
  )
}
