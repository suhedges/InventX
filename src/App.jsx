import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/Layout'
import Dashboard from '@/pages/Dashboard'
import Products from '@/pages/Products'
import Scanner from '@/pages/Scanner'
import Import from '@/pages/Import'
import Export from '@/pages/Export'
import MassAssignment from '@/pages/MassAssignment'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/import" element={<Import />} />
          <Route path="/export" element={<Export />} />
          <Route path="/massassignment" element={<MassAssignment />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
