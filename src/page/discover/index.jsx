// 在文件顶部导入新CSS文件
import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { searchBooks, getRecommendedBooks, getPopularBooks, getTopRatedBooks, getBooksByCategory, getTrendingBooks, getRecentlyAddedBooks, getEditorPicks, getHotReading, getReadingLeaderboard, getBooksBySubcategory, getWeeklyNewBooks, getMonthlyEditorPicks, getPersonalizedRecommendations } from '../../services/bookService.js'
import { MAIN_CATEGORIES } from '../../utils/categories.js'
import { useDebounce } from '../../hooks/useDebounce.js'
import '../../styles/discover.css' // 添加这一行
import {mockBooks,mockUser,mockNotes } from '../../utils/mockData.js'


const Discover = () => {
  const [query, setQuery] = useState('')
  const [recommended, setRecommended] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [byHistory, setByHistory] = useState([])
  const [byPhilosophy, setByPhilosophy] = useState([])
  const [byLiterature, setByLiterature] = useState([])
  const [bySociety, setBySociety] = useState([])
  const [trending, setTrending] = useState([])
  const [recent, setRecent] = useState([])
  const [weeklyNew, setWeeklyNew] = useState([])
  const [monthlyEditor, setMonthlyEditor] = useState([])
  const [personalized, setPersonalized] = useState([])
  const [editorPicks, setEditorPicks] = useState([])
  const [hotReading, setHotReading] = useState([])
  const [readingLeaderboard, setReadingLeaderboard] = useState([])
  const [literatureClassics, setLiteratureClassics] = useState([])
  const [literatureModern, setLiteratureModern] = useState([])
  const [philosophyClassics, setPhilosophyClassics] = useState([])
  const [philosophyModern, setPhilosophyModern] = useState([])
  const [recommendedActive, setRecommendedActive] = useState('editor')
  const [rankingActive, setRankingActive] = useState('top')
  const [literatureActive, setLiteratureActive] = useState('classic')
  const [philosophyActive, setPhilosophyActive] = useState('classic')
  const debounced = useDebounce(query, 400)
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [categoryBooks, setCategoryBooks] = useState([])

  // 加载推荐、热门、排行与分类/补充板块
  // ... existing code ...
// 调整加载数据的数量，将8改为12或16
useEffect(() => {
    async function loadData() {
      try {
        const [recData, popData, topData, his, phi, lit, soc, trd, rct, edi, hot, rlb,
          litC, litM, phiC, phiM, wnk, mne, per] = await Promise.all([
          getRecommendedBooks(12),  // 从8改为12
          getPopularBooks(12),      // 从8改为12
          getTopRatedBooks(12),     // 从8改为12
          getBooksByCategory('历史', 12),  // 从8改为12
          getBooksByCategory('哲学', 12),  // 从8改为12
          getBooksByCategory('文学', 12),  // 从8改为12
          getBooksByCategory('社会文化', 12),  // 从8改为12
          getTrendingBooks(12),     // 从8改为12
          getRecentlyAddedBooks(12), // 从8改为12
          getEditorPicks(12),       // 从8改为12
          getHotReading(12),        // 从8改为12
          getReadingLeaderboard(12), // 从8改为12
          getBooksBySubcategory('文学', '经典著作', 12), // 从8改为12
          getBooksBySubcategory('文学', '当代作品', 12), // 从8改为12
          getBooksBySubcategory('哲学', '经典著作', 12), // 从8改为12
          getBooksBySubcategory('哲学', '当代作品', 12), // 从8改为12
          getWeeklyNewBooks(16),    // 从10改为16
          getMonthlyEditorPicks(16), // 从12改为16
          getPersonalizedRecommendations(16), // 从12改为16
        ])
// ... existing code ...
        const recList = Array.isArray(recData) ? recData : recData?.list || []
        const popList = Array.isArray(popData) ? popData : popData?.list || []
        setRecommended(recList)
        setPopular(popList)
        setTopRated(Array.isArray(topData) ? topData : topData?.list || [])
        setByHistory(Array.isArray(his) ? his : his?.list || [])
        setByPhilosophy(Array.isArray(phi) ? phi : phi?.list || [])
        setByLiterature(Array.isArray(lit) ? lit : lit?.list || [])
        setBySociety(Array.isArray(soc) ? soc : soc?.list || [])
        setTrending(Array.isArray(trd) ? trd : trd?.list || [])
        setRecent(Array.isArray(rct) ? rct : rct?.list || [])
        setEditorPicks(Array.isArray(edi) ? edi : edi?.list || [])
        setHotReading(Array.isArray(hot) ? hot : hot?.list || [])
        setReadingLeaderboard(Array.isArray(rlb) ? rlb : rlb?.list || [])
        setLiteratureClassics(Array.isArray(litC) ? litC : litC?.list || [])
        setLiteratureModern(Array.isArray(litM) ? litM : litM?.list || [])
        setPhilosophyClassics(Array.isArray(phiC) ? phiC : phiC?.list || [])
        setPhilosophyModern(Array.isArray(phiM) ? phiM : phiM?.list || [])
        setWeeklyNew(Array.isArray(wnk) ? wnk : wnk?.list || [])
        setMonthlyEditor(Array.isArray(mne) ? mne : mne?.list || [])
        setPersonalized(Array.isArray(per) ? per : per?.list || [])
      } catch (error) {
        console.error('加载推荐书籍失败:', error)
        setRecommended([])
        setPopular([])
        setTopRated([])
        setByHistory([])
        setByPhilosophy([])
        setByLiterature([])
        setBySociety([])
        setTrending([])
        setRecent([])
        setEditorPicks([])
        setHotReading([])
        setReadingLeaderboard([])
        setLiteratureClassics([])
        setLiteratureModern([])
        setPhilosophyClassics([])
        setPhilosophyModern([])
        setWeeklyNew([])
        setMonthlyEditor([])
        setPersonalized([])
      }
    }
    loadData()
  }, [])

  // 分类标签点击筛选：动态加载分类书籍
  useEffect(() => {
    let cancelled = false
    async function loadCategory() {
      if (!activeCategory) {
        setCategoryBooks([])
        return
      }
      try {
        const data = await getBooksByCategory(activeCategory, 16)
        if (!cancelled) setCategoryBooks(Array.isArray(data) ? data : data?.list || [])
      } catch {
        if (!cancelled) setCategoryBooks([])
      }
    }
    loadCategory()
    return () => {
      cancelled = true
    }
  }, [activeCategory])

  useMemo(() => {
    let cancelled = false
    async function run() {
      if (!debounced) {
        setList([])
        return
      }
      setLoading(true)
      try {
        const res = await searchBooks(debounced, 1, 20)
        const data = Array.isArray(res) ? res : res?.list || []
        if (!cancelled) setList(data)
      } catch (e) {
        if (!cancelled) setList([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [debounced])

  // 更新renderBookList函数使用新的CSS类
  const renderBookList = (books, title, showCategory = false, onMore = null) => {
    const items = Array.isArray(books) ? books : books?.list || []
    return (
      <div className="book-section">
        <h3 className="section-title">{title}</h3>
        <div className="book-grid">
          {items.map((b) => (
            <Link key={b.id} to={`/book/${b.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="book-card ink-card">
                <img src={b.cover} alt={b.title} className="book-cover" />
                <div className="book-info">
                  <div className="book-title">{b.title}</div>
                  <div className="book-author">{b.author}</div>
                  {showCategory && <div className="book-category">{b.category}</div>}
                  <div className="book-rating">评分 {b.rating}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {onMore && (
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
            <button className="more-btn" onClick={onMore}>查看更多</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="discover-container">
      <h2 className="discover-title">发现</h2>
      
      {/* 搜索框 */}
      <div className="discover-search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索书籍..."
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
        />
      </div>

{/* // 在组件中添加一个新的书籍列表区块 */}
{/* // 在return语句中添加 */}
{!query && renderBookList(mockBooks, '全部书籍', true)}
{
  !query && (
    <div className="book-section">
      <h3 className="section-title">热门书籍</h3>
      <div className="book-grid">
        {mockBooks.slice(0, 8).map((b) => (
          <Link key={b.id} to={`/book/${b.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="book-card ink-card">
              <img src={b.cover} alt={b.title} className="book-cover" />
              <div className="book-info">
                <div className="book-title">{b.title}</div>
                <div className="book-author">{b.author}</div>
                <div className="book-category">{b.category}</div>
                <div className="book-rating">评分 {b.rating}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
      {/* 搜索结果 */}
      {query && (
        <div className="book-section">
          <h3 className="section-title">搜索结果</h3>
          {loading && <div>搜索中...</div>}
          {!loading && list.length === 0 && debounced && <div>没有找到结果</div>}
          {!loading && list.length > 0 && (
            <div className="book-grid">
              {list.map((b) => (
                <Link key={b.id} to={`/book/${b.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="book-card ink-card">
                    <img src={b.cover} alt={b.title} className="book-cover" />
                    <div className="book-info">
                      <div className="book-title">{b.title}</div>
                      <div className="book-author">{b.author}</div>
                      <div className="book-rating">评分 {b.rating}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 推荐 - Tab 切换 */}
      {!query && (
        <div className="book-section">
          <h3 className="section-title">推荐</h3>
          <div className="discover-tabs">
            {[
              { key: 'editor', label: '编辑精选' },
              { key: 'hot', label: '热门阅读' },
              { key: 'rec', label: '为你推荐' },
            ].map((t) => (
              <button
                key={t.key}
                className={`discover-tab ${recommendedActive === t.key ? 'active' : ''}`}
                onClick={() => setRecommendedActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {recommendedActive === 'editor' && editorPicks.length > 0 &&
            renderBookList(editorPicks, '编辑精选书籍', true, async () => {
              const more = await getEditorPicks(16)
              setEditorPicks(more)
            })}
          {recommendedActive === 'hot' && hotReading.length > 0 &&
            renderBookList(hotReading, '热门阅读', true, async () => {
              const more = await getHotReading(16)
              setHotReading(more)
            })}
          {recommendedActive === 'rec' && recommended.length > 0 &&
            renderBookList(recommended, '为你推荐', true, async () => {
              const more = await getRecommendedBooks(16)
              setRecommended(more)
            })}
        </div>
      )}

      {/* 全部分类 */}
      {!query && (
        <div className="book-section">
          <h3 className="section-title">全部分类</h3>
          <div className="category-tags">
            {MAIN_CATEGORIES.map((c) => (
              <Link key={c.key} to={`/discover/${c.key}`} className="category-tag">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 排行 - Tab 切换 */}
      {!query && (
        <div className="book-section">
          <h3 className="section-title">排行</h3>
          <div className="discover-tabs">
            {[
              { key: 'top', label: '高分排行' },
              { key: 'read', label: '阅读榜单' },
              { key: 'trend', label: '时间热度' },
            ].map((t) => (
              <button
                key={t.key}
                className={`discover-tab ${rankingActive === t.key ? 'active' : ''}`}
                onClick={() => setRankingActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {rankingActive === 'top' && topRated.length > 0 && renderBookList(topRated, '高分排行', true, async () => {
            const more = await getTopRatedBooks(16)
            setTopRated(more)
          })}
          {rankingActive === 'read' && readingLeaderboard.length > 0 && renderBookList(readingLeaderboard, '阅读榜单', true, async () => {
            const more = await getReadingLeaderboard(16)
            setReadingLeaderboard(more)
          })}
          {rankingActive === 'trend' && trending.length > 0 && renderBookList(trending, '时间热度排行', true, async () => {
            const more = await getTrendingBooks(16)
            setTrending(more)
          })}
        </div>
      )}

      {/* 其他书籍分类部分（历史、哲学、文学等）保持不变，但使用新的CSS类 */}
      {!query && byHistory.length > 0 && renderBookList(byHistory, '历史', true, async () => {
        const more = await getBooksByCategory('历史', 16)
        setByHistory(more)
      })}

      {/* 哲学 - Tab 切换 */}
      {!query && (
        <div className="book-section">
          <h3 className="section-title">哲学</h3>
          <div className="discover-tabs">
            {[
              { key: 'classic', label: '经典著作' },
              { key: 'modern', label: '当代作品' },
              { key: 'all', label: '综合' },
            ].map((t) => (
              <button
                key={t.key}
                className={`discover-tab ${philosophyActive === t.key ? 'active' : ''}`}
                onClick={() => setPhilosophyActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {philosophyActive === 'classic' && philosophyClassics.length > 0 && renderBookList(philosophyClassics, '哲学 · 经典著作', true, async () => {
            const more = await getBooksBySubcategory('哲学', '经典著作', 16)
            setPhilosophyClassics(more)
          })}
          {philosophyActive === 'modern' && philosophyModern.length > 0 && renderBookList(philosophyModern, '哲学 · 当代作品', true, async () => {
            const more = await getBooksBySubcategory('哲学', '当代作品', 16)
            setPhilosophyModern(more)
          })}
          {philosophyActive === 'all' && byPhilosophy.length > 0 && renderBookList(byPhilosophy, '哲学（综合）', true, async () => {
            const more = await getBooksByCategory('哲学', 16)
            setByPhilosophy(more)
          })}
        </div>
      )}

      {/* 文学 - Tab 切换 */}
      {!query && (
        <div className="book-section">
          <h3 className="section-title">文学</h3>
          <div className="discover-tabs">
            {[
              { key: 'classic', label: '经典著作' },
              { key: 'modern', label: '当代作品' },
              { key: 'all', label: '综合' },
            ].map((t) => (
              <button
                key={t.key}
                className={`discover-tab ${literatureActive === t.key ? 'active' : ''}`}
                onClick={() => setLiteratureActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {literatureActive === 'classic' && literatureClassics.length > 0 && renderBookList(literatureClassics, '文学 · 经典著作', true, async () => {
            const more = await getBooksBySubcategory('文学', '经典著作', 16)
            setLiteratureClassics(more)
          })}
          {literatureActive === 'modern' && literatureModern.length > 0 && renderBookList(literatureModern, '文学 · 当代作品', true, async () => {
            const more = await getBooksBySubcategory('文学', '当代作品', 16)
            setLiteratureModern(more)
          })}
          {literatureActive === 'all' && byLiterature.length > 0 && renderBookList(byLiterature, '文学（综合）', true, async () => {
            const more = await getBooksByCategory('文学', 16)
            setByLiterature(more)
          })}
        </div>
      )}

      {/* 其余部分（社会文化、时间热度等）保持不变，使用新的CSS类 */}
      {!query && bySociety.length > 0 && renderBookList(bySociety, '社会文化', true, async () => {
        const more = await getBooksByCategory('社会文化', 16)
        setBySociety(more)
      })}

      {!query && trending.length > 0 && renderBookList(trending, '时间热度排行', true, async () => {
        const more = await getTrendingBooks(16)
        setTrending(more)
      })}

      {!query && recent.length > 0 && renderBookList(recent, '最近上架', true, async () => {
        const more = await getRecentlyAddedBooks(16)
        setRecent(more)
      })}

      {!query && weeklyNew.length > 0 && renderBookList(weeklyNew, '每周新书', true, async () => {
        const more = await getWeeklyNewBooks(16)
        setWeeklyNew(more)
      })}

      {!query && monthlyEditor.length > 0 && renderBookList(monthlyEditor, '本月编辑推荐', true, async () => {
        const more = await getMonthlyEditorPicks(16)
        setMonthlyEditor(more)
      })}

      {!query && personalized.length > 0 && renderBookList(personalized, '为你定制', true, async () => {
        const more = await getPersonalizedRecommendations(16)
        setPersonalized(more)
      })}
    </div>
  )
}

export default Discover