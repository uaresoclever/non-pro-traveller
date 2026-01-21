import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <p>
        {t(
          "© 2026 DC & Miyako. Sharing adventures around the world.",
          "© 2026 DC & Miyako。分享世界各地的冒險。",
          "© 2026 DC & Miyako。世界中の冒険をシェア。"
        )}
      </p>
      <div className="credits">
        <p>
          {t(
            "Website built with ❤️ using Kiro AI - Making travel dreams come to life through code",
            "網站由 Kiro AI 用心打造 ❤️ - 透過程式碼實現旅行夢想",
            "Kiro AIで❤️を込めて構築 - コードで旅の夢を実現"
          )}
        </p>
      </div>
    </footer>
  )
}

export default Footer