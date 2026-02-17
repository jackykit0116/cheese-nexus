/**
 * AdaptiveHero - Generative UI Hero Component
 * 
 * AI-generated hero section that adapts to user context and preferences
 */

'use client'

import { useGenUI } from './GenUIProvider'

export function AdaptiveHero({ 
  title, 
  subtitle, 
  intent = 'welcome' 
}: { 
  title: string
  subtitle: string
  intent?: string
}) {
  const { userProfile, context, generateUI, currentTheme } = useGenUI()
  const [uiConfig, setUiConfig] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Generate UI configuration based on user context
    generateUI(intent).then(setUiConfig)
  }, [context, intent, generateUI])

  if (!mounted || !uiConfig) {
    return <div className="animate-pulse">Loading...</div>
  }

  const { theme, layout, accessibility } = uiConfig

  const gradient = currentTheme === 'dark' 
    ? 'from-indigo-900 to-purple-900'
    : 'from-indigo-600 to-purple-600'

  return (
    <section 
      className="relative min-h-[500px] flex items-center justify-center"
      aria-labelledby="hero-title"
    >
      {/* Background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}
        aria-hidden="true"
      />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 
          id="hero-title"
          className={`text-${currentTheme === 'dark' ? '4xl md:text-6xl' : '4xl md:text-5xl'} font-bold mb-6 ${theme.text}`}
        >
          {title}
        </h1>
        
        <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${theme.text}`}>
          {subtitle}
        </p>

        {/* Dynamic greeting based on context */}
        {context.timeOfDay && (
          <p className="text-lg mb-8 opacity-80">
            {context.timeOfDay === 'morning' && '🌅 Good morning! Ready to explore?'}
            {context.timeOfDay === 'afternoon' && '☀️ Good afternoon! What would you like to do today?'}
            {context.timeOfDay === 'evening' && '🌙 Good evening! What are you working on?'}
            {context.timeOfDay === 'night' && '🌟 Good night! Your next breakthrough is close.'}
          </p>
        )}

        {/* Adaptive CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className={`px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
              currentTheme === 'dark' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
            }`}
            aria-label="Start exploring"
          >
            Explore Now
          </button>
          
          <button 
            className={`px-8 py-3 rounded-lg font-semibold border-2 transition-all transform hover:scale-105 ${
              currentTheme === 'dark' 
                ? 'border-white text-white hover:bg-white hover:text-gray-900' 
                : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
            }`}
            aria-label="Learn more"
          >
            Learn More
          </button>
        </div>

        {/* Accessibility skip link */}
        {accessibility.skipLinks && (
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 rounded"
          >
            Skip to main content
          </a>
        )}
      </div>
    </section>
  )
}
