// Mock 数据生成工具
export const mockBooks = [
  {
    id: '1',
    title: '三体',
    author: '刘慈欣',
    cover: 'https://picsum.photos/seed/book_1/120/160',
    rating: '9.3',
    summary: '地球文明向宇宙发出广播，寻找其他文明。但这一行为却引来了三体文明的入侵。',
    category: '科幻',
    publishYear: 2008,
  },
  {
    id: '2',
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    cover: 'https://picsum.photos/seed/book_2/120/160',
    rating: '9.2',
    summary: '布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰。',
    category: '文学',
    publishYear: 1967,
  },
  {
    id: '3',
    title: '活着',
    author: '余华',
    cover: 'https://picsum.photos/seed/book_3/120/160',
    rating: '9.4',
    summary: '农村人福贵悲惨的人生遭遇，福贵本是个阔少爷，可因为嗜赌成性，终于赌光了家业。',
    category: '文学',
    publishYear: 1993,
  },
  {
    id: '4',
    title: '人类简史',
    author: '尤瓦尔·赫拉利',
    cover: 'https://picsum.photos/seed/book_4/120/160',
    rating: '8.9',
    summary: '从认知革命、农业革命到科学革命，重新解读人类社会发展历程。',
    category: '历史',
    publishYear: 2014,
  },
  {
    id: '5',
    title: '算法导论',
    author: 'Thomas H. Cormen',
    cover: 'https://picsum.photos/seed/book_5/120/160',
    rating: '9.1',
    summary: '计算机科学领域的经典教材，全面介绍了各种算法设计方法。',
    category: '技术',
    publishYear: 2009,
  },
  {
    id: '6',
    title: '红楼梦',
    author: '曹雪芹',
    cover: 'https://picsum.photos/seed/book_6/120/160',
    rating: '9.6',
    summary: '中国古典四大名著之一，描写了贾、史、王、薛四大家族的兴衰。',
    category: '古典文学',
    publishYear: 1791,
  },
]

export const mockUser = {
  id: 'user_001',
  name: '阅读爱好者',
  avatar: 'https://picsum.photos/seed/user_001/100/100',
  joinDate: '2024-01-15',
  totalReadTime: 1560, // 分钟
  totalBooks: 23,
  currentStreak: 7, // 连续阅读天数
}

export const mockReadingProgress = {
  '1': { progress: 45, lastReadAt: '2024-08-08T10:30:00Z', chapter: 12 },
  '2': { progress: 78, lastReadAt: '2024-08-07T15:20:00Z', chapter: 8 },
  '3': { progress: 100, lastReadAt: '2024-08-06T09:15:00Z', chapter: 15 },
  '4': { progress: 23, lastReadAt: '2024-08-05T14:45:00Z', chapter: 3 },
}

export const mockNotes = [
  {
    id: 'note_001',
    bookId: '1',
    bookTitle: '三体',
    quote: '给岁月以文明，而不是给文明以岁月。',
    text: '这句话体现了文明发展的本质，不是简单地延长存在时间，而是要让文明本身有意义。',
    createdAt: '2024-08-08T10:30:00Z',
    chapter: 12,
    page: 156,
  },
  {
    id: 'note_002',
    bookId: '2',
    bookTitle: '百年孤独',
    quote: '许多年后，面对行刑队，奥雷里亚诺·布恩迪亚上校将会回想起，他父亲带他去见识冰块的那个遥远的下午。',
    text: '经典的开头，时间跨度很大，从未来回望过去，很有魔幻现实主义特色。',
    createdAt: '2024-08-07T15:20:00Z',
    chapter: 1,
    page: 1,
  },
  {
    id: 'note_003',
    bookId: '3',
    bookTitle: '活着',
    text: '福贵的人生经历让我深刻理解了什么是真正的活着，即使面对苦难也要坚持。',
    createdAt: '2024-08-06T09:15:00Z',
    chapter: 8,
    page: 89,
  },
  {
    id: 'note_004',
    bookId: '4',
    bookTitle: '人类简史',
    quote: '金钱、帝国、宗教，这三大力量塑造了现代世界。',
    text: '作者对人类历史的独特视角，将复杂的历史简化为几个关键要素。',
    createdAt: '2024-08-05T14:45:00Z',
    chapter: 5,
    page: 67,
  },
]

export const mockShelf = {
  '1': { status: 'reading', book: mockBooks[0] },
  '2': { status: 'reading', book: mockBooks[1] },
  '3': { status: 'read', book: mockBooks[2] },
  '4': { status: 'toRead', book: mockBooks[3] },
  '5': { status: 'toRead', book: mockBooks[4] },
  '6': { status: 'read', book: mockBooks[5] },
}

// 生成随机书籍列表
export function generateMockBookList(count = 10, query = '') {
  const titles = [
    '人工智能的未来', '区块链革命', '量子计算入门', '深度学习实战',
    '数据结构与算法', '设计模式', '重构', '代码整洁之道',
    'JavaScript高级程序设计', 'React实战', 'Vue.js权威指南',
    'Python编程', 'Java核心技术', 'C++ Primer', 'Go语言实战',
    'Docker容器技术', 'Kubernetes权威指南', '微服务架构',
    '分布式系统设计', '高并发编程', '网络编程实战',
  ]
  
  const authors = [
    '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
    '郑十一', '王十二', '冯十三', '陈十四', '褚十五', '卫十六',
  ]
  
  const categories = ['技术', '文学', '历史', '科幻', '哲学', '心理学', '经济学']
  
  return Array.from({ length: count }, (_, i) => {
    const id = String(i + 1)
    const title = query ? `${query} ${id}` : titles[i % titles.length]
    const author = authors[i % authors.length]
    const category = categories[i % categories.length]
    
    return {
      id,
      title,
      author,
      cover: `https://picsum.photos/seed/book_${id}/120/160`,
      rating: (Math.random() * 2 + 7).toFixed(1),
      summary: `这是《${title}》的简介，作者${author}在${category}领域有着深入的研究。`,
      category,
      publishYear: 2010 + (i % 14),
    }
  })
}

// 生成阅读统计
export function generateReadingStats() {
  return {
    totalReadTime: Math.floor(Math.random() * 2000) + 500,
    totalBooks: Math.floor(Math.random() * 50) + 10,
    currentStreak: Math.floor(Math.random() * 30) + 1,
    monthlyGoal: 5,
    monthlyRead: Math.floor(Math.random() * 8) + 2,
    favoriteCategory: '技术',
    averageRating: (Math.random() * 1 + 8).toFixed(1),
  }
}
