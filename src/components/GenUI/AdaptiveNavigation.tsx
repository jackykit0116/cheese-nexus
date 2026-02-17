/**
 * AdaptiveNavigation - Generative UI Navigation Component
 * 
 * AI-generated navigation that adapts to user behavior and preferences
 */

'use client'

import { useGenUI } from './GenUIProvider'
import { useState, useEffect } from 'react'

export function AdaptiveNavigation() {
  const { userProfile, context, generateUI } = useGenUI()
  const [uiConfig, setUiConfig] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    generateUI('navigation').then(setUiConfig)
  }, [context, generateUI])

  if (!mounted || !uiConfig) {
    return <nav className="h-16 border-b bg-white dark:bg-gray-900">Loading...</nav>
  }

  const { layout, theme, accessibility } = uiConfig

  // Generate navigation items based on user profile and context
  const navItems = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'AI Trends', href: '/ai-trends', icon: '🤖' },
    { name: 'GenUI', href: '/genui', icon: '🎨' },
    { name: 'Research', href: '/research', icon: '📚' },
    { name: 'Blog', href: '/blog', icon: '📝' },
    { name: 'About', href: '/about', icon: '✨' }
  ]

  // Adaptive navigation style based on preferences
  const navigationStyle = userProfile?.preferences?.navigationStyle || 'sidebar'
  
  return (
    <nav
      className={`border-b ${theme.background} ${theme.text} ${
        navigationStyle === 'sidebar' ? 'flex-col' : 'flex-row'
      }`}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className={`p-4 ${navigationStyle === 'sidebar' ? 'border-b' : 'border-b'}`}>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🧀</span>
          <span className="text-indigo-600 dark:text-indigo-400">Cheese AI</span>
        </h1>
      </div>

      {/* Navigation Items */}
      <ul className={`flex ${navigationStyle === 'sidebar' ? 'flex-col' : 'flex-row'}`}>
        {navItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className={`flex items-center gap-2 px-4 py-3 transition-colors ${
                navigationStyle === 'sidebar' 
                  ? 'border-l-4 border-transparent hover:border-indigo-500' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* User Profile Section */}
      {userProfile && (
        <div className={`p-4 border-t ${navigationStyle === 'sidebar' ? 'border-t' : 'border-t'}`}>
          <div className={`text-sm ${theme.text} opacity-70`}>
            <p className="mb-1">👤 {userProfile.name}</p>
            <p className="mb-2">🎯 {userProfile.role}</p>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xs ${
                    i < ['beginner', 'intermediate', 'advanced', 'expert'].indexOf(
                      userProfile.experienceLevel
                    ) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Accessibility */}
      {accessibility && (
        <div className={`p-2 text-xs ${theme.text} opacity-60`}>
          <span aria-hidden="true">♿ Accessible</span>
        </div>
      )}
    </nav>
  )
}
