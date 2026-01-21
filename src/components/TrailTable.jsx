import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { trailData } from '../data/trailData'

const TrailTable = () => {
  const { currentLang, t } = useLanguage()
  const data = trailData[currentLang]

  return (
    <div className="trail-table-wrapper">
      <table className="trail-table">
        <thead>
          <tr>
            <th>{t("No.", "編號", "番号")}</th>
            <th>{t("Trail Name", "英文官方路名 / 常用稱呼", "トレイル名")}</th>
            <th>{t("Distance / Time", "大約距離 / 時間", "距離 / 時間")}</th>
            <th>{t("Self-Guided", "可否自行行走", "セルフガイド")}</th>
            <th>{t("Start / End Point", "起點 / 終點（是否易泊車）", "開始 / 終了地点")}</th>
            <th>{t("Highlights", "主要觀光重點", "ハイライト")}</th>
            <th>{t("Driving Rating", "自駕便利評分*", "運転評価")}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((trail, index) => (
            <tr key={index}>
              <td>{trail.no}</td>
              <td dangerouslySetInnerHTML={{ __html: trail.name }} />
              <td>{trail.distance}</td>
              <td dangerouslySetInnerHTML={{ __html: trail.selfGuided }} />
              <td dangerouslySetInnerHTML={{ __html: trail.startEnd }} />
              <td dangerouslySetInnerHTML={{ __html: trail.highlights }} />
              <td dangerouslySetInnerHTML={{ __html: trail.rating }} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrailTable