import { useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)
    setImage(null)

    try {
      // Simulate API call to a text-to-image generator
      // In a real app, this would be: 
      // const response = await fetch('/api/generate', { method: 'POST', body: JSON.stringify({ prompt }) });
      // const data = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Using a placeholder image with a random seed based on prompt
      const seed = Math.floor(Math.random() * 1000000)
      setImage(`https://picsum.photos/seed/${seed}/800/800`)
      
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Imagine.</h1>
        <p>Turn your thoughts into stunning visuals in seconds.</p>
      </header>

      <main className="generator-card">
        <div className="input-group">
          <textarea
            className="prompt-input"
            placeholder="A futuristic city with floating gardens and neon lights..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? (
              <>
                <span className="loader-small"></span>
                Generating...
              </>
            ) : 'Generate'}
          </button>
        </div>

        <section className="image-display">
          {isLoading ? (
            <div className="loader-container">
              <span className="loader"></span>
              <p>Crafting your image...</p>
            </div>
          ) : image ? (
            <img 
              src={image} 
              alt={prompt} 
              className="generated-image" 
              loading="lazy"
            />
          ) : (
            <div className="placeholder-text">
              <p>Your creation will appear here.</p>
              {error && <p style={{ color: '#ef4444', marginTop: '1rem' }}>{error}</p>}
            </div>
          )}
        </section>
      </main>

      <footer style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#64748b' }}>
        Built with Google AI & React
      </footer>
    </div>
  )
}

export default App
