import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/80">Generating Reels</span>
        <span className="text-sm font-medium text-primary-400">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default ProgressBar 