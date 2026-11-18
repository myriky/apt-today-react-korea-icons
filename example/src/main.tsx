import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import StressTest from './StressTest'
import StaticSvg from './StaticSvg'
import './index.css'

// 어느 페이지(#/static, #/stress)로 바로 들어와도 시스템 다크 모드를 따르도록 렌더 전에 적용
document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)

function Root() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  if (hash === '#/stress') return <StressTest />
  if (hash === '#/static') return <StaticSvg />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)

