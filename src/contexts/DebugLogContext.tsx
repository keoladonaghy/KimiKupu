import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'

interface LogEntry {
  id: string
  message: string
  timestamp: Date
  level: 'log' | 'warn' | 'error' | 'info'
}

interface DebugLogContextType {
  logs: LogEntry[]
  log: (message: string, level?: LogEntry['level']) => void
  clearLogs: () => void
}

const DebugLogContext = createContext<DebugLogContextType | undefined>(
  undefined
)

interface DebugLogProviderProps {
  children: ReactNode
}

export const DebugLogProvider: React.FC<DebugLogProviderProps> = ({
  children,
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([])

  const log = useCallback(
    (message: string, level: LogEntry['level'] = 'log') => {
      const entry: LogEntry = {
        id: `${Date.now()}-${Math.random()}`,
        message,
        timestamp: new Date(),
        level,
      }
      setLogs((prevLogs) => [...prevLogs, entry])

      // Also log to browser console for development
      if (process.env.NODE_ENV === 'development') {
        console[level](message)
      }
    },
    []
  )

  const clearLogs = useCallback(() => {
    setLogs([])
  }, [])

  const value = {
    logs,
    log,
    clearLogs,
  }

  return (
    <DebugLogContext.Provider value={value}>
      {children}
    </DebugLogContext.Provider>
  )
}

export const useDebugLog = (): DebugLogContextType => {
  const context = useContext(DebugLogContext)
  if (context === undefined) {
    throw new Error('useDebugLog must be used within a DebugLogProvider')
  }
  return context
}
