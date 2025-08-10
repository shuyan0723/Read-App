import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import BottomNav from './components/BottomNav'
import ThemeToggle from './components/ThemeToggle'

const Shelf = lazy(() => import('./page/shelf'))
const Discover = lazy(() => import('./page/discover'))
const DiscoverCategory = lazy(() => import('./page/discover/category'))
const Book = lazy(() => import('./page/book'))
const Read = lazy(() => import('./page/read'))
const Notes = lazy(() => import('./page/notes'))
const Me = lazy(() => import('./page/me'))
const Chat = lazy(() => import('./page/chat'))

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<div style={{ padding: 16 }}>加载中...</div>}>
            <Routes>
              <Route path="/" element={<Shelf />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/discover/:key" element={<DiscoverCategory />} />
              <Route path="/book/:id" element={<Book />} />
              <Route path="/read/:id" element={<Read />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/me" element={<Me />} />
              <Route path="/ai" element={<Chat />} />

            </Routes>
          </Suspense>
          <ThemeToggle />
          <BottomNav />
        </ErrorBoundary>
      </BrowserRouter>
    </>
  )
}

export default App
