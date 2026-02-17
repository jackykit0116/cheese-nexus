/**
 * GenUIProvider - Generative UI Context Provider
 * 
 * Provides context for AI-powered dynamic interface generation
 * Implements adaptive UI based on user behavior and context
 */

'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface GenUIContextType {
  userId?: string
  userProfile?: UserProfile
  context: UserContext
  generateUI: (intent: string, preferences?: UIPreferences) => Promise<UIConfig>
  updatePreferences: (prefs: UIPreferences) => void
  currentTheme?: string
}

interface UserProfile {
  name: string
  role: 'developer' | 'designer' | 'manager' | 'researcher' | 'student'
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  preferences: UserPreferences
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  fontSize: 'small' | 'medium' | 'large' | 'extra-large'
  language: 'zh-TW' | 'en' | 'zh-CN' | 'ja'
  reducedMotion: boolean
  accessibility: {
    highContrast: boolean
    screenReader: boolean
    keyboardNavigation: boolean
  }
}

interface UserContext {
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'smartphone' | 'laptop'
  location: string
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  recentActivities: string[]
  sessionHistory: SessionData[]
}

interface UIConfig {
  components: ComponentConfig[]
  layout: LayoutConfig
  theme: ThemeConfig
  accessibility: AccessibilityConfig
}

interface ComponentConfig {
  id: string
  type: 'card' | 'narrative' | 'interactive' | 'visualization' | 'form' | 'navigation'
  priority: number
  adaptive: boolean
  dynamicProps: Record<string, any>
}

interface LayoutConfig {
  structure: 'grid' | 'flex' | 'adaptive' | 'minimal'
  responsive: {
    mobile?: string[]
    tablet?: string[]
    desktop?: string[]
  }
}

interface ThemeConfig {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  background: string
  text: string
}

interface AccessibilityConfig {
  skipLinks: string[]
  focusIndicators: boolean
  ariaLabels: boolean
  reducedMotion: boolean
}

interface SessionData {
  timestamp: number
  activities: string[]
  interactions: number
}

interface UIPreferences {
  complexity: 'minimal' | 'balanced' | 'rich'
  informationDensity: 'compact' | 'standard' | 'detailed'
  navigationStyle: 'breadcrumb' | 'sidebar' | 'top-bar' | 'minimal'
}

const GenUIContext = createContext<GenUIContextType | undefined>(undefined)

export function GenUIProvider({ 
  children, 
  userId = 'guest',
  initialUserProfile 
}: { 
  children: ReactNode,
  userId?: string,
  initialUserProfile?: UserProfile
}) {
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(initialUserProfile)
  const [context, setContext] = useState<UserContext>({
    deviceType: 'desktop',
    location: 'unknown',
    timeOfDay: 'afternoon',
    recentActivities: [],
    sessionHistory: []
  })
  const [currentTheme, setCurrentTheme] = useState<string>('light')

  // Simulate AI-driven UI generation
  const generateUI = async (intent: string, preferences?: UIPreferences) => {
    // In production, this would call an AI service
    // For now, simulate with deterministic generation based on context
    
    const { deviceType, timeOfDay } = context
    
    // Generate adaptive layout based on device and time
    const layout: LayoutConfig = {
      structure: deviceType === 'mobile' ? 'flex' : 'adaptive',
      responsive: {
        mobile: ['navigation', 'hero', 'content', 'features', 'footer'],
        tablet: ['navigation', 'hero', 'content-grid', 'sidebar', 'footer'],
        desktop: ['navigation', 'hero', 'content', 'sidebar', 'features', 'footer']
      }
    }

    // Generate theme based on time of day
    const theme: ThemeConfig = {
      primaryColor: timeOfDay === 'night' ? '#6366f1' : '#4f46e5',
      secondaryColor: timeOfDay === 'night' ? '#818cf8' : '#4338ca',
      accentColor: '#10b981',
      background: timeOfDay === 'night' ? '#0f172a' : '#ffffff',
      text: timeOfDay === 'night' ? '#f1f5f9' : '#1e293b'
    }

    // Generate components based on intent and preferences
    const components: ComponentConfig[] = [
      {
        id: 'hero',
        type: 'hero',
        priority: 1,
        adaptive: true,
        dynamicProps: {
          greeting: `Welcome back${userProfile?.name ? ', ' + userProfile.name : ''}!`,
          context: timeOfDay
        }
      },
      {
        id: 'narrative',
        type: 'narrative',
        priority: 2,
        adaptive: true,
        dynamicProps: {
          content: intent,
          style: preferences?.complexity === 'minimal' ? 'brief' : 'detailed'
        }
      },
      {
        id: 'interactive',
        type: 'interactive',
        priority: 3,
        adaptive: true,
        dynamicProps: {
          type: 'adaptation',
          level: userProfile?.experienceLevel || 'beginner'
        }
      }
    ]

    return {
      components,
      layout,
      theme,
      accessibility: {
        skipLinks: ['main-content', 'skip-navigation'],
        focusIndicators: true,
        ariaLabels: true,
        reducedMotion: false
      }
    }
  }

  const updatePreferences = (prefs: UIPreferences) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        preferences: {
          ...userProfile.preferences,
          complexity: prefs.complexity,
          informationDensity: prefs.informationDensity,
          navigationStyle: prefs.navigationStyle
        }
      })
    }
  }

  const value = {
    userId,
    userProfile,
    context,
    generateUI,
    updatePreferences,
    currentTheme
  }

  return (
    <GenUIContext.Provider value={value}>
      {children}
    </GenUIContext.Provider>
  )
}

export function useGenUI() {
  const context = useContext(GenUIContext)
  if (context === undefined) {
    throw new Error('useGenUI must be used within a GenUIProvider')
  }
  return context
}
