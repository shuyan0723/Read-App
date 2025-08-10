// 主分类与子分类配置

export const MAIN_CATEGORIES = [
  {
    key: 'wenxue',
    name: '文学',
    subcategories: ['经典著作', '当代作品', '外国文学', '中国现当代', '诗歌', '散文', '戏剧'],
  },
  {
    key: 'zhexue',
    name: '哲学',
    subcategories: ['经典著作', '当代作品', '伦理学', '认识论', '美学', '逻辑学'],
  },
  {
    key: 'lishi',
    name: '历史',
    subcategories: ['通史', '断代史', '世界史', '中国史', '文明史', '史学理论'],
  },
  {
    key: 'kehuan',
    name: '科幻',
    subcategories: ['硬科幻', '软科幻', '太空歌剧', '赛博朋克', '时间旅行', '反乌托邦'],
  },
  {
    key: 'jishu',
    name: '技术',
    subcategories: ['编程语言', '算法', '架构', '人工智能', '云原生', '安全'],
  },
  {
    key: 'xinlixue',
    name: '心理学',
    subcategories: ['认知', '发展', '社会', '临床', '心理成长', '心理咨询'],
  },
  {
    key: 'jingjixue',
    name: '经济学',
    subcategories: ['宏观', '微观', '行为经济学', '金融', '贸易', '经济史'],
  },
  {
    key: 'shehui',
    name: '社会文化',
    subcategories: ['社会学', '文化研究', '人类学', '传播学', '性别研究', '教育'],
  },
  {
    key: 'yishu',
    name: '艺术',
    subcategories: ['美术', '音乐', '电影', '建筑', '设计', '摄影'],
  },
  {
    key: 'zhuanji',
    name: '传记',
    subcategories: ['历史人物', '科学家', '企业家', '作家艺术家', '政治家', '回忆录'],
  },
]

export function getCategoryByKey(key) {
  return MAIN_CATEGORIES.find((c) => c.key === key) || null
}

export function getCategoryKeyByName(name) {
  const found = MAIN_CATEGORIES.find((c) => c.name === name)
  return found ? found.key : null
}

export function getAllCategoryTags() {
  return MAIN_CATEGORIES.map((c) => ({ key: c.key, name: c.name }))
}

export function getRelatedCategories(key, limit = 3) {
  const idx = MAIN_CATEGORIES.findIndex((c) => c.key === key)
  if (idx < 0) return MAIN_CATEGORIES.slice(0, limit).map((c) => c.name)
  const ordered = [...MAIN_CATEGORIES.slice(idx + 1), ...MAIN_CATEGORIES.slice(0, idx)]
  return ordered.slice(0, limit).map((c) => c.name)
}


