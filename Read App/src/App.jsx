import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Discover from './page/discover'
import Book from './page/book'
import Read from './page/read'
import Notes from './page/notes'
import Me from './page/me'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
