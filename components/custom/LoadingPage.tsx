'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const LoadingPage = () => {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/5 to-background overflow-hidden">
            {/* Spotlight effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-[10px] opacity-50">
                    {/* Light theme spotlight */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl dark:hidden" />

                    {/* Dark theme spotlight */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl hidden dark:block" />
                </div>
            </div>

            {/* Content */}
            <div className="text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                >
                    <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
                </motion.div>
                <motion.h2
                    className="mt-4 text-2xl font-semibold text-primary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    Loading...
                </motion.h2>
                <motion.p
                    className="mt-2 text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    Please wait while we prepare your experience
                </motion.p>
            </div>
        </div>
    )
}

export default LoadingPage