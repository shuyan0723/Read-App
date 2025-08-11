import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCategoryByKey, getRelatedCategories } from '../../utils/categories.js'
import { getTopRatedByCategory, getRecentlyAddedBooks, getThematicCollections, getCrossCategoryRecommendations, getBooksBySubcategory } from '../../services/bookService.js'
import {mockBooks,mockCategories} from '../../utils/mockData.js'

const CategoryPage = () => {
  const { key } = useParams()
  const category = getCategoryByKey(key)
  const title = category?.name || '分类'
  const [topRated, setTopRated] = useState([])
  const [recent, setRecent] = useState([])
  const [collections, setCollections] = useState([])
  const [crossRecs, setCrossRecs] = useState([])
  const [activeSub, setActiveSub] = useState('')
  const [subList, setSubList] = useState([])

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [tr, rc, tc, cr] = await Promise.all([
          getTopRatedByCategory(title, 12),
          getRecentlyAddedBooks(12),
          getThematicCollections(title, 3),
          getCrossCategoryRecommendations(title, 4),
        ])
        if (!cancelled) {
          setTopRated(Array.isArray(tr) ? tr : tr?.list || [])
          setRecent(Array.isArray(rc) ? rc : rc?.list || [])
          setCollections(Array.isArray(tc) ? tc : tc?.list || [])
          setCrossRecs(Array.isArray(cr) ? cr : cr?.list || [])
        }
      } catch {
        if (!cancelled) {
          setTopRated([]); setRecent([]); setCollections([]); setCrossRecs([])
        }
      }
    }
    load()
    setActiveSub('')
    setSubList([])
    return () => { cancelled = true }
  }, [key, title])

  useEffect(() => {
    let cancelled = false
    async function loadSub() {
      if (!activeSub) { setSubList([]); return }
      try {
        const data = await getBooksBySubcategory(title, activeSub, 16)
        if (!cancelled) setSubList(Array.isArray(data) ? data : data?.list || [])
      } catch {
        if (!cancelled) setSubList([])
      }
    }
    loadSub()
    return () => { cancelled = true }
  }, [activeSub, title])

  const renderList = (list, blockTitle) => (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 12 }}>{blockTitle}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {list.map((b) => (
          <Link key={b.id} to={`/book/${b.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
              <img src={b.cover} alt={b.title} style={{ width: '100%', borderRadius: 6 }} />
              <div style={{ marginTop: 8, fontWeight: 600, fontSize: 14 }}>{b.title}</div>
              <div style={{ color: '#666', fontSize: 12 }}>{b.author}</div>
              <div style={{ color: '#f60', fontSize: 12 }}>评分 {b.rating}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )

  if (!category) {
    return <div style={{ padding: 16 }}>未找到分类</div>
  }

  const related = getRelatedCategories(key, 3)

  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <h2>{title}</h2>

      {/* 子分类 Tab */}
      {Array.isArray(category.subcategories) && category.subcategories.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '8px 0 16px' }}>
          {category.subcategories.slice(0, 8).map((s) => (
            <button
              key={s}
              className={`btn ${activeSub === s ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveSub(activeSub === s ? '' : s)}
              style={{ fontSize: 12 }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* 固定模块 */}
      {topRated.length > 0 && renderList(topRated, '读者好评')}
      {recent.length > 0 && renderList(recent, '新书上架')}
      {activeSub && subList.length > 0 && renderList(subList, `${title} · ${activeSub}`)}

      {/* 主题书单 */}
      {collections.length > 0 && (
        <div style={{ margin: '8px 0 24px' }}>
          <h3 style={{ marginBottom: 12 }}>主题书单</h3>
          <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
            {collections.map((c) => (
              <div key={c.id} className="card" style={{ textAlign: 'left' }}>{c.title}</div>
            ))}
          </div>
        </div>
      )}

      {/* 跨品类推荐 */}
      {crossRecs.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 12 }}>跨品类推荐</h3>
          {crossRecs.map((r) => (
            <div key={r.category} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, margin: '6px 0' }}>{r.category}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {(r.list || []).map((b) => (
                  <Link key={b.id} to={`/book/${b.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
                      <img src={b.cover} alt={b.title} style={{ width: '100%', borderRadius: 6 }} />
                      <div style={{ marginTop: 8, fontWeight: 600, fontSize: 14 }}>{b.title}</div>
                      <div style={{ color: '#666', fontSize: 12 }}>{b.author}</div>
                      <div style={{ color: '#f60', fontSize: 12 }}>评分 {b.rating}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 相关分类 */}
      <div style={{ marginTop: 8, color: 'var(--muted)' }}>你可能感兴趣：{related.join(' / ')}</div>
    </div>
  )
}

export default CategoryPage


