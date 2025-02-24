import { useEffect, useState, useRef } from "react"
import { Search, X, Check, ChevronLeft } from "lucide-react"
import { useClickOutside } from "../../hooks/useClickOutside"
import {
  Command,
  CommandEmpty,
  CommandList,
} from "../ui/command"
import { ArticleCard } from "../command/ArticleCard"
import { AICard } from "../command/AICard"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { LoadingMessages } from "../ui/LoadingMessages"
import { SourceLink } from "../ui/SourceLink"
import { InitialLoader } from "../ui/InitialLoader"

export function CommandKDemo() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isAIMode, setIsAIMode] = useState(false)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiResponse, setAIResponse] = useState("")
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showSources, setShowSources] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(false)

  const articles = [
    { title: 'How to get started with our platform', path: 'getting-started' },
    { title: 'Managing your account and settings', path: 'account-settings' },
    { title: 'Common issues and solutions', path: 'troubleshooting' }
  ]

  // All items array (AI + articles)
  const items = [
    { type: 'ai', id: 'ai-answer' },
    ...articles.map(article => ({ type: 'article', ...article }))
  ]

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(i => (i + 1) % items.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(i => (i - 1 + items.length) % items.length)
          break
        case 'Enter':
          e.preventDefault()
          const selectedItem = items[selectedIndex]
          if (selectedItem.type === 'ai') {
            handleAIGeneration()
          } else {
            handleArticleSelect(selectedItem.path)
          }
          break
        case 'Escape':
          if (!isGeneratingAI) {
            setOpen(false)
            setSelectedIndex(0)
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, items.length, isGeneratingAI])

  // Reset selection when opening/closing
  useEffect(() => {
    if (open) {
      setSelectedIndex(0)
    }
  }, [open])

  // Handle click outside
  useClickOutside(dropdownRef as React.RefObject<HTMLElement>, () => {
    if (open && !isGeneratingAI) setOpen(false)
  })

  const handleAIGeneration = () => {
    setIsAIMode(true)
    setIsGeneratingAI(true)
    setAIResponse("") // Reset previous response
    setShowSources(false) // Reset sources visibility
    
    // Shorter delay for loading simulation of 5s)
    const loadingTimer = setTimeout(() => {
      const response = `To secure your Intercom Messenger for customer support, implement these key measures: First, enable end-to-end encryption for sensitive conversations and file transfers. Set up IP allowlisting to restrict access to trusted networks only. Configure identity verification to ensure only authenticated users can initiate conversations. Use role-based access control (RBAC) to limit staff permissions based on their responsibilities. Enable audit logging to track all interactions and security events. Finally, regularly update your security settings and monitor for any unusual patterns in messenger usage.`
      
      let index = 0
      setIsGeneratingAI(false) // Stop showing skeleton before starting stream
      setAIResponse("") // Ensure we start with empty string
      
      // Streaming effect with smoother interval
      const streamInterval = setInterval(() => {
        if (index <= response.length) { // Changed from < to <= to include last character
          setAIResponse(response.slice(0, index)) // Use slice instead of concatenation
          index++
        } else {
          clearInterval(streamInterval)
          setShowEvaluation(true)
          setShowSources(true) // Show sources after streaming
        }
      }, 10) // Faster typewriter animation
      
      // Cleanup streaming interval
      return () => clearInterval(streamInterval)
    }, 5000)

    // Cleanup loading timer
    return () => clearTimeout(loadingTimer)
  }

  const handleArticleSelect = (path: string) => {
    // Navigate to article
    console.log(`Navigating to: ${path}`)
    setOpen(false)
  }

  const handleEvaluation = (helpful: boolean) => {
    // Handle feedback
    setShowEvaluation(false)
    if (!helpful) {
      setIsAIMode(false)
      setAIResponse("")
      setQuery("")
    }
  }

  const resetAIMode = () => {
    setIsAIMode(false)
    setAIResponse("")
    setShowEvaluation(false)
    setSelectedIndex(0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    if (value.length > 0) {
      setIsInitialLoading(true)
      setOpen(true)
      
      // Simulate initial loading
      setTimeout(() => {
        setIsInitialLoading(false)
      }, 1000)
    } else {
      setOpen(false)
      setIsInitialLoading(false)
    }
  }

  return (
    <div>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b">
        <div className="font-bold text-xl">Logo</div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">Community</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Academy</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Dev Hub</a>
          <button className="text-gray-600 hover:text-gray-900">
            English
          </button>
        </div>
      </nav>

      {/* Hero Section with Gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-200" />
        

        <div className="relative px-8 py-24 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-gray-900">
            Great service changes everything.
          </h1>
          
          {/* Search Container */}
          <div className="relative">
            {/* Search Input Wrapper */}
            <div className="relative flex items-center">
              {/* Back/Search Icon */}
              <button 
                className="absolute left-3 z-20 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => isAIMode && resetAIMode()}
              >
                {isAIMode ? (
                  <ChevronLeft className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>

              {/* Input Container */}
              <div className="relative flex items-center w-full">
                {/* Search Input Field */}
                <input
                  ref={inputRef}
                  className={`
                    w-full h-14 rounded-xl border bg-white/80 backdrop-blur-sm text-lg focus:outline-none
                    ${isAIMode ? 'pl-32' : 'pl-10'} pr-12
                    transition-all duration-200
                  `}
                  placeholder="Search for answers or articles..."
                  value={query}
                  onChange={handleInputChange}
                />

                {/* AI Mode Badge */}
                {isAIMode && (
                  <div className="absolute left-10 z-10">
                    <Badge 
                      variant="outline" 
                      className="flex items-center gap-0.5 pl-2 h-7 bg-white"
                    >
                      <span>Ask Fin</span>
                      <button
                        className="ml-1 hover:bg-muted rounded-full p-0.5"
                        onClick={resetAIMode}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </div>
                )}
              </div>

              {/* Close Button */}
              {query && (
                <div className="absolute right-2 z-20">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setQuery('')
                      setOpen(false)
                      inputRef.current?.focus()
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Command Palette Dropdown */}
            <div className={`
              absolute w-full mt-2 rounded-xl border shadow-lg bg-white overflow-hidden transition-all duration-200 ease-in-out
              ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
              max-h-[calc(100vh-8em)] min-h-[400px]
            `}>
              <Command className="border-0">
                <CommandList className="max-h-[calc(100vh-8em)] min-h-[400px] overflow-y-auto">
                  {isInitialLoading ? (
                    <InitialLoader />
                  ) : (
                    <>
                      {!isAIMode && <CommandEmpty>No results found.</CommandEmpty>}
                      
                      {!isAIMode ? (
                        <>
                          <AICard
                            query={query}
                            isGenerating={isGeneratingAI}
                            isSelected={selectedIndex === 0}
                            onSelect={handleAIGeneration}
                          />

                          {/* Articles Section Heading */}
                          <div className="px-7 mt-4 text-sm text-muted-foreground/70">
                            Articles
                          </div>

                          {articles.map((article, index) => (
                            <ArticleCard
                              key={article.path}
                              title={article.title}
                              path={article.path}
                              isSelected={selectedIndex === index + 1}
                              onSelect={(path) => handleArticleSelect(path)}
                            />
                          ))}
                        </>
                      ) : (
                        <div className="p-4">
                          {isGeneratingAI ? (
                            <div>
                              <LoadingMessages isLoading={isGeneratingAI} />
                              <div className="space-y-3 animate-pulse px-4 mt-4">
                                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="px-4 text-sm text-muted-foreground/70">
                                Fin AI answer
                              </div>
                              <div className="px-4 mt-2 text-md leading-relaxed">
                                {aiResponse}
                              </div>
                              
                              {/* Sources Section */}
                              {showSources && (
                                <div className="mt-6">
                                  <div className="px-4 text-sm text-muted-foreground/70 mb-2">
                                    Sources
                                  </div>
                                  <div className="space-y-1">
                                    <SourceLink
                                      title="How to get started with our platform"
                                      path="getting-started"
                                      onClick={handleArticleSelect}
                                    />
                                    <SourceLink
                                      title="Managing your account and settings"
                                      path="account-settings"
                                      onClick={handleArticleSelect}
                                    />
                                  </div>
                                </div>
                              )}
                              
                              {showEvaluation && (
                                <div className="mt-6 bg-neutral-50 rounded-lg">
                                  <div className="flex items-center gap-2 py-4 px-4">
                                    <span className="text-sm text-muted-foreground">Did that help?</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEvaluation(true)}
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      Yes
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEvaluation(false)}
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      No
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </CommandList>
              </Command>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}