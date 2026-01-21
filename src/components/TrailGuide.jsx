import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import TrailTable from './TrailTable'

const TrailGuide = () => {
  const { t } = useLanguage()

  return (
    <section className="journeys">
      <div className="journey-card">
        <h2>
          {t(
            "Khao Yai National Park Hiking Trails",
            "考艾國家公園健行步道",
            "カオヤイ国立公園ハイキングトレイル"
          )}
        </h2>
        <p>
          {t(
            "A comprehensive guide to the best hiking trails in Thailand's oldest national park",
            "泰國最古老國家公園最佳健行步道完整指南",
            "タイ最古の国立公園の最高のハイキングトレイルの包括的なガイド"
          )}
        </p>
        
        <TrailTable />
      </div>
    </section>
  )
}

export default TrailGuide