import React, { useEffect, useRef } from 'react'
import { useDebugLog } from '../contexts/DebugLogContext'

export const DebugOverlay: React.FC = () => {
  const { logs, clearLogs } = useDebugLog()
  const logsEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (
      logsEndRef.current &&
      typeof logsEndRef.current.scrollIntoView === 'function'
    ) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  if (logs.length === 0) {
    return null
  }

  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    })
  }

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'error':
        return 'text-red-400'
      case 'warn':
        return 'text-yellow-400'
      case 'info':
        return 'text-blue-400'
      default:
        return 'text-gray-300'
    }
  }

  return (
    <div
      className="fixed bottom-4 left-4 bg-black bg-opacity-80 text-white rounded-lg shadow-lg"
      style={{
        width: '400px',
        maxHeight: '300px',
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
    >
      {/* Header with Clear button */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-600">
        <h3 className="text-sm font-semibold text-gray-200">Debug Log</h3>
        <button
          onClick={clearLogs}
          className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Logs container */}
      <div
        className="overflow-y-auto max-h-64 p-2"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #1F2937' }}
      >
        {logs.map((log) => (
          <div key={log.id} className="mb-1 text-xs">
            <span className="text-gray-500">[{formatTime(log.timestamp)}]</span>
            <span className={`ml-2 ${getLevelColor(log.level)}`}>
              {log.level.toUpperCase()}:
            </span>
            <span className="ml-2 text-gray-200 break-words">
              {log.message}
            </span>
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  )
}
