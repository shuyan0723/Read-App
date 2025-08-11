// Mock 数据生成工具 - 提供阅读应用所需的模拟数据

// 书籍数据 - 统一结构和格式
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
    priority: true
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
    priority: false
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
    priority: false
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
    priority: false
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
    priority: false
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
    priority: false
  },
  {
    id: '7',
    title: '平凡的世界',
    author: '路遥',
    cover: 'https://picsum.photos/seed/book_pfdsj/240/320',
    rating: '9.1',
    summary: '《平凡的世界》以孙少安、孙少平两兄弟的人生历程为主线，展现改革开放前后中国西北农村的社会变迁与普通人坚韧不屈的奋斗。书中既有艰辛困苦，也有激情理想，刻画了普通人在时代洪流中的情感、责任与选择，语言质朴、情感真挚，具有强烈的现实主义力量与人文关怀。',
    category: '文学',
    publishYear: 1986,
    priority: false
  },
  {
    id: '8',
    title: '红高粱',
    author: '莫言',
    cover: 'https://picsum.photos/seed/book_hgl/240/320',
    rating: '8.8',
    summary: '《红高粱》以高密东北乡为背景，通过叙述者祖辈的生命故事，呈现战争、家族与土地之间的复杂关系。作品以浓烈的生命力、粗砺的民间叙事和象征意象，描绘出人性在极端环境中的野性与尊严。小说语言张扬有力，富于魔幻现实色彩，是中国当代文学的重要作品之一。',
    category: '文学',
    publishYear: 1986,
    priority: false
  },
  {
    id: '9',
    title: '理想国',
    author: '柏拉图',
    cover: 'https://picsum.photos/seed/book_lxg/240/320',
    rating: '9.0',
    summary: '《理想国》是古希腊哲学家柏拉图的重要著作，通过苏格拉底与众人的对话探讨正义之本质、灵魂的秩序以及国家的理想治理。书中提出哲人王、教育与分工等著名思想，旨在追问“何为善的生活”。其影响深远，奠定了西方政治哲学与伦理学的重要基石。',
    category: '哲学',
    publishYear: -380,
    priority: false
  },
  {
    id: '10',
    title: '存在与时间',
    author: '海德格尔',
    cover: 'https://picsum.photos/seed/book_czyss/240/320',
    rating: '8.7',
    summary: '《存在与时间》是20世纪现象学与存在主义哲学代表作，海德格尔以“此在”的生存分析为路径，揭示时间性与存在意义之间的关联。书中讨论焦虑、良心、向死而在等概念，对现代哲学、文学与人文思想产生巨大影响。文本艰深，但思想锋芒深刻，重塑了“存在”之问题。',
    category: '哲学',
    publishYear: 1927,
    priority: false
  },
  {
    id: '11',
    title: '万历十五年',
    author: '黄仁宇',
    cover: 'https://picsum.photos/seed/book_wl15/240/320',
    rating: '9.0',
    summary: '《万历十五年》以明神宗在位第十五年为切入点，通过张居正、申时行等人物的命运，透视明代政治制度与社会运行的深层结构。作者以宏观历史观审视制度与人事的张力，文字简洁而洞见深刻，改变了大众理解中国历史的方式，是通俗与学术兼具的经典之作。',
    category: '历史',
    publishYear: 1982,
    priority: false
  },
  // 科幻类书籍
  {
    id: '12',
    title: '沙丘',
    author: '弗兰克·赫伯特',
    cover: 'https://book-cover.example.com/沙丘_cover.jpg',
    rating: '5.0',
    summary: '沙丘是弗兰克·赫伯特的经典作品，讲述了沙漠星球权力斗争与资源争夺的故事，语言生动，思想深刻，深受全球读者喜爱。',
    category: '科幻',
    publishYear: 1965,
    priority: true
  },
  {
    id: '13',
    title: '银河系漫游指南',
    author: '道格拉斯·亚当斯',
    cover: 'https://book-cover.example.com/银河系漫游指南_cover.jpg',
    rating: '9.0',
    summary: '银河系漫游指南是道格拉斯·亚当斯的经典作品，讲述了星际冒险与宇宙哲学的故事，语言生动，思想深刻，深受全球读者喜爱。',
    category: '科幻',
    publishYear: 1979,
    priority: true
  },
  {
    id: '14',
    title: '球状闪电',
    author: '刘慈欣',
    cover: 'https://book-cover.example.com/球状闪电_cover.jpg',
    rating: '8.9',
    summary: '球状闪电是刘慈欣的经典作品，讲述了宏观量子现象与武器研究的故事，语言生动，思想深刻，深受全球读者喜爱。',
    category: '科幻',
    publishYear: 2005,
    priority: true
  },
  {
    id: '15',
    title: '三体2：黑暗森林',
    author: '刘慈欣',
    cover: 'https://book-cover.example.com/三体2：黑暗森林_cover.jpg',
    rating: '7.9',
    summary: '三体2：黑暗森林是刘慈欣的经典作品，讲述了宇宙社会学与文明生存法则的故事，语言生动，思想深刻，深受全球读者喜爱。',
    category: '科幻',
    publishYear: 2008,
    priority: true
  },
  // 商业类书籍
  {
    id: '16',
    title: '原则',
    author: '瑞·达利欧',
    cover: 'https://book-cover.example.com/原则_cover.jpg',
    rating: '9.3',
    summary: '原则是瑞·达利欧的经典作品，讲述了生活与工作原则的故事，语言生动，思想深刻，深受全球读者喜爱。',
    category: '商业',
    publishYear: 2017,
    priority: true
  },
  {
    id: '17',
    title: '穷查理宝典',
    author: '彼得·考夫曼',
    cover: 'https://book-cover.example.com/穷查理宝典_cover.jpg',
    rating: '5.6',
    summary: '穷查理宝典是彼得·考夫曼的经典作品，讲述了查理·芒格的智慧箴言的故事，语言生动，思想深刻，深受全球读者喜爱。',
    category: '商业',
    publishYear: 2005,
    priority: true
  },
  // 科普类书籍
  {
    id: '18',
    title: '时间简史',
    author: '史蒂芬·霍金',
    cover: 'https://book-cover.example.com/时间简史_cover.jpg',
    rating: '5.4',
    summary: '时间简史是史蒂芬·霍金的经典作品，讲述了宇宙起源与时空理论的故事，语言生动，思想深刻，深受全球读者喜爱。',
    category: '科普',
    publishYear: 1988,
    priority: true
  },
  {
    id: '19',
    title: '上帝掷骰子吗',
    author: '曹天元',
    cover: 'https://book-cover.example.com/上帝掷骰子吗_cover.jpg',
    rating: '9.0',
    summary: '上帝掷骰子吗是曹天元的经典作品，讲述了量子力学发展史的故事，语言生动，思想深刻，深受全球读者喜爱。',
    category: '科普',
    publishYear: 2006,
    priority: true
  },
  {
    id: '20',
    title: '数学之美',
    author: '吴军',
    cover: 'https://book-cover.example.com/数学之美_cover.jpg',
    rating: '6.3',
    summary: '数学之美是吴军的经典作品，讲述了数学在信息时代的应用的故事，语言生动，思想深刻，深受全球读者喜爱。',
    category: '科普',
    publishYear: 2014,
    priority: true
  },
  // ... existing code ...
// 在mockBooks数组末尾添加以下新书籍
  {
    id: '21',
    title: '解忧杂货店',
    author: '东野圭吾',
    cover: 'https://picsum.photos/seed/book_jygzd/240/320',
    rating: '8.5',
    summary: '在僻静街道旁的一家杂货店，只要写下烦恼投进店前门卷帘门的投信口，第二天就会在店后的牛奶箱里得到回答。',
    category: '小说',
    publishYear: 2012,
    priority: true
  },
  {
    id: '22',
    title: '围城',
    author: '钱钟书',
    cover: 'https://picsum.photos/seed/book_wc/240/320',
    rating: '8.7',
    summary: '《围城》是钱钟书所著的长篇小说，以留学归国的方鸿渐为主角，描绘了抗日战争初期知识分子的群像。',
    category: '文学',
    publishYear: 1947,
    priority: false
  },
  {
    id: '23',
    title: '嫌疑人X的献身',
    author: '东野圭吾',
    cover: 'https://picsum.photos/seed/book_xyrdxs/240/320',
    rating: '9.0',
    summary: '百年一遇的数学天才石神，每天唯一的乐趣，便是去固定的便当店买午餐，只为看一眼在便当店做事的邻居靖子。',
    category: '悬疑',
    publishYear: 2005,
    priority: true
  },
  {
    id: '24',
    title: '哈利波特与魔法石',
    author: 'J.K.罗琳',
    cover: 'https://picsum.photos/seed/book_hp1/240/320',
    rating: '9.2',
    summary: '一岁的哈利·波特失去父母后，被寄养在姨妈家，饱受欺凌。十一岁生日那天，他收到了霍格沃茨魔法学校的录取通知书，从此开始了奇幻的魔法之旅。',
    category: '奇幻',
    publishYear: 1997,
    priority: true
  },
  {
    id: '25',
    title: '被讨厌的勇气',
    author: '岸见一郎',
    cover: 'https://picsum.photos/seed/book_btydyq/240/320',
    rating: '8.6',
    summary: '本书以希腊哲学的苏格拉底对话式写法，探讨了“人如何能够获得幸福”这一哲学命题。',
    category: '心理学',
    publishYear: 2013,
    priority: true
  },
  {
    id: '26',
    title: '云边有个小卖部',
    author: '张嘉佳',
    cover: 'https://picsum.photos/seed/book_ybygxb/240/320',
    rating: '8.3',
    summary: '让刘十三陪着你，走进云边镇的春夏秋冬，见证每一场相遇与离别。',
    category: '小说',
    publishYear: 2018,
    priority: true
  },
  {
    id: '27',
    title: '中国通史',
    author: '吕思勉',
    cover: 'https://picsum.photos/seed/book_zgtongshi/240/320',
    rating: '9.1',
    summary: '《中国通史》是吕思勉先生的通史代表作，是一部简明扼要、深入浅出的中国通史读物。',
    category: '历史',
    publishYear: 1923,
    priority: false
  },
  {
    id: '28',
    title: 'Python编程：从入门到实践',
    author: '埃里克·马瑟斯',
    cover: 'https://picsum.photos/seed/book_python/240/320',
    rating: '8.9',
    summary: '本书是一本面向初学者的Python编程入门书籍，通过实际项目帮助读者掌握Python编程技能。',
    category: '技术',
    publishYear: 2016,
    priority: true
  },
  {
    id: '29',
    title: '沉默的大多数',
    author: '王小波',
    cover: 'https://picsum.photos/seed/book_cmdszd/240/320',
    rating: '9.0',
    summary: '《沉默的大多数》是王小波的一部杂文集，收录了他对社会、文化、人性等方面的思考。',
    category: '杂文',
    publishYear: 1997,
    priority: false
  },
  {
    id: '30',
    title: '活着本来单纯',
    author: '丰子恺',
    cover: 'https://picsum.photos/seed/book_hzbldc/240/320',
    rating: '8.8',
    summary: '《活着本来单纯》是丰子恺的一部散文集，收录了他对生活、艺术、自然的感悟。',
    category: '散文',
    publishYear: 2016,
    priority: true
  }
// ... existing code ...
]
// 在mockBooks数组之后添加以下代码
// 书籍分类数据
export const mockCategories = [
  { key: 'literature', name: '文学' },
  { key: 'history', name: '历史' },
  { key: 'philosophy', name: '哲学' },
  { key: 'science', name: '科幻' },
  { key: 'technology', name: '技术' },
  { key: 'psychology', name: '心理学' },
  { key: 'society', name: '社会文化' },
  { key: 'business', name: '商业' },
  { key: 'popular', name: '科普' },
  { key: 'classics', name: '古典文学' }
]

// ... existing code ...
// 用户数据
export const mockUser = {
  id: 'user_001',
  name: '阅读爱好者',
  avatar: 'https://picsum.photos/seed/user_001/100/100',
  joinDate: '2024-01-15',
  totalReadTime: 1560, // 分钟
  totalBooks: 23,
  currentStreak: 7, // 连续阅读天数
}

// 阅读进度数据
export const mockReadingProgress = {
  '1': { progress: 45, lastReadAt: '2024-08-08T10:30:00Z', chapter: 12 },
  '2': { progress: 78, lastReadAt: '2024-08-07T15:20:00Z', chapter: 8 },
  '3': { progress: 100, lastReadAt: '2024-08-06T09:15:00Z', chapter: 15 },
  '4': { progress: 23, lastReadAt: '2024-08-05T14:45:00Z', chapter: 3 },
}

// 读书笔记数据
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

// 书架数据
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
