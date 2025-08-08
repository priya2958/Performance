import { lazy, Suspense } from 'react'
import './App.css'

const ClaimsList = lazy(() => import('./ClaimsList'))

function App() {


  return (
    <>
      <Suspense fallback={<div>Loading Claims...</div>}>
        <ClaimsList />
      </Suspense>
   
    </>
  )
}

export default App
