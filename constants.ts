

export const THEME = {
  primary: '#008184',
  secondary: '#004B4D',
  accent: '#E0F102',
  surface: '#FFFFFF',
  bg: '#F2F4F6',
  danger: '#FF4D4F'
};

export const COLOR_POOLS = {
  primary: ['#008184', '#1A73E8', '#9333EA', '#059669', '#DC2626'],
  auxiliary: ['#004B4D', '#1E40AF', '#5B21B6', '#065F46', '#991B1B', '#E0F102', '#FDB813']
};

export const CATEGORIES: any[] = [
  { id: 'cat_all', name: '全部分类', isEmployeeOnly: false, type: 'bundle' },
  { id: 'cat_water', name: '瓶装水', isEmployeeOnly: false, type: 'water' },
  { id: 'cat_barrel', name: '家庭大桶', isEmployeeOnly: false, type: 'barrel' },
  { id: 'cat_bubble', name: '潮流气泡', isEmployeeOnly: false, type: 'bubble' },
  { id: 'cat_welfare', name: '福利商城', isEmployeeOnly: false, isWelfare: true, type: 'bundle' },
  { id: 'emp_all', name: '员工特供', isEmployeeOnly: true, type: 'energy' },
  { id: 'emp_office', name: '行政申领', isEmployeeOnly: true, type: 'bundle' },
  { id: 'emp_parts', name: '耗材维护', isEmployeeOnly: true, type: 'water' },
];

export const MOCK_PRODUCTS: any[] = [
  {
    id: 'p1',
    categoryId: 'cat_water',
    name: '极地冰泉·天然矿泉水',
    desc: '源自长白山深层冷泉，矿物质丰富。每一滴都经过多年深层岩石过滤，纯净甘甜。',
    price: 3.5,
    originalPrice: 5.0,
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560023907-5f339617ea30?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=600&auto=format&fit=crop'
    ],
    tags: ['爆款', '包邮'],
    sales: 2300,
    stock: 500,
    isEmployeeOnly: false,
    couponCompatible: true,
    couponType: 'cash',
    deliveryRange: '深圳市全市范围（部分偏远山区除外）',
    specs: [
      { id: 's1', name: '330ml/瓶', price: 2.5, stock: 200 },
      { id: 's2', name: '550ml/瓶', price: 3.5, stock: 300 },
      { id: 's3', name: '1.5L/瓶', price: 8.0, stock: 50 }
    ],
    usageRules: ['单笔订单满10瓶起送', '支持现金抵用券', '建议储存在阴凉干燥处']
  },
  {
    id: 'p2',
    categoryId: 'cat_barrel',
    name: '18.9L 润泽纯净桶装水',
    desc: '全自动无菌灌装，饮用放心。适合家庭、办公室长期饮用。',
    price: 18.0,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=600&auto=format&fit=crop',
    tags: ['次日达'],
    sales: 1200,
    stock: 0,
    isEmployeeOnly: false,
    couponCompatible: true,
    couponType: 'service',
    deliveryRange: '仅限南山区、福田区',
    specs: [{ id: 's1', name: '18.9L/桶', price: 18.0, stock: 0 }],
    usageRules: ['空桶押金50元/只', '限时享受买10送1服务', '需电梯房或3楼以下配送']
  },
  {
    id: 'w1',
    categoryId: 'cat_welfare',
    name: '福利券兑换：定制运动水壶',
    desc: '环保材质，随行补水，福利专属礼品。高质感磨砂工艺。',
    price: 0.1,
    originalPrice: 39.0,
    image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=600&auto=format&fit=crop',
    tags: ['福利点兑换'],
    sales: 890,
    stock: 120,
    isWelfare: true,
    isEmployeeOnly: false,
    couponCompatible: true,
    couponType: 'service',
    usageRules: ['仅限福利券用户兑换', '每人限领一个', '不支持现金退款'],
    deliveryRange: '仅限自提或随水配送'
  },
  {
    id: 'e1',
    categoryId: 'emp_all',
    name: '员工专享·进口苏打水内购',
    desc: '内部员工年终特惠，不予外售。清爽强劲气泡。',
    price: 1.0,
    originalPrice: 15.0,
    image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?q=80&w=600&auto=format&fit=crop',
    tags: ['员工内购'],
    sales: 52,
    stock: 100,
    isEmployeeOnly: true,
    couponCompatible: true,
    couponType: 'employee',
    usageRules: ['需校验员工身份', '每月限购2箱', '支持员工内购津贴券支付'],
    specs: [{ id: 's1', name: '330ml*24瓶/箱', price: 24.0, stock: 100 }],
    deliveryRange: '公司内部行政前台自提'
  }
];

export const MOCK_SERVICES = [
  { id: 's1', name: '水质深度检测', price: 99, image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?q=80&w=600&auto=format&fit=crop', desc: '专业技师上门', isPopular: true },
  { id: 's2', name: '滤芯焕新服务', price: 150, image: 'https://images.unsplash.com/photo-1585909695437-084776100779?q=80&w=600&auto=format&fit=crop', desc: '原装适配', isPopular: true }
];

export const MOCK_WELFARE = [
  { id: 'welfare_1', name: '夏季清爽补水包', price: 49, originalPrice: 120, image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=600&auto=format&fit=crop', desc: '限时福利', isPopular: true, couponCompatible: true }
];

export const MOCK_NEWS = [
  { 
    id: 'n1', 
    type: 'news', 
    title: '智慧供水，科技赋能', 
    summary: '深圳水务启动数字化升级，全新智能水表将覆盖90%居民区。', 
    date: '03-24',
    content: '为响应国家智慧城市建设号召，深圳水务集团正式启动“智慧供水2.0”计划。本次升级将重点对老旧小区的机械水表进行智能化改造，预计今年年底前，全市90%的居民用户将用上能够实时传输数据的智能水表。这不仅能有效解决抄表难的问题，还能通过大数据分析，帮助居民更科学地管理用水习惯，及时发现漏水隐患。',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'n2', 
    type: 'notice', 
    title: '管网维护公告', 
    summary: '因罗湖区部分供水管网升级改造，部分片区将实行夜间低压供水。', 
    date: '03-25',
    content: '尊敬的用户：\n\n为提升供水安全保障能力，我司计划于2024年3月28日（周四）23:00至次日06:00，对罗湖区沿河路段的主供水管道进行升级维护。届时，沿河路以南、春风路以北片区的水压将有所降低，高层用户可能会出现暂时性缺水现象。\n\n请相关区域用户提前做好储水准备。给您带来的不便，敬请谅解。\n\n如有疑问，请拨打24小时服务热线：96968。',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'n3', 
    type: 'activity', 
    title: '空瓶回收活动', 
    summary: '参与空瓶回收计划，赢取精美环保好礼及积分奖励。', 
    date: '03-23',
    content: '为了保护环境，减少塑料污染，HydroPop 正式推出“空瓶新生”计划！\n\n即日起，将您饮用完毕的 HydroPop 品牌水空瓶（需保持瓶身完整）收集起来，交由我们的配送员或送至指定线下回收点，即可获得环保积分。\n\n每回收10个空瓶，即可获赠 50 积分，积分可在商城兑换环保袋、随行杯等精美周边。让我们一起行动，为地球减负！',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'n4', 
    type: 'news', 
    title: '夏季饮水健康指南', 
    summary: '高温天气来袭，专家建议每日饮水量应达到2500ml。', 
    date: '03-20',
    content: '随着夏季高温天气的到来，人体水分流失加快。健康专家提醒，除了日常饮食摄入的水分外，成年人每日的主动饮水量应保持在2000ml-2500ml之间。\n\n建议少量多次饮用温开水或矿泉水，避免一次性大量饮用冰水，以免对肠胃造成刺激。此外，运动后可适当补充含有电解质的饮品，以维持体内水盐平衡。',
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'n5', 
    type: 'activity', 
    title: '会员日双倍积分', 
    summary: '每月8号会员日，全场消费享双倍积分，更有好礼相送。', 
    date: '03-18',
    content: '感谢您一直以来的陪伴！为了回馈广大用户，我们将每月的8号设立为“HydroPop 会员日”。\n\n在会员日当天，所有等级会员在商城内的任意消费（不含运费），均可享受双倍积分奖励。同时，当天还将开启限时秒杀活动，多款人气爆品低至5折！定好闹钟，不要错过哦！',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop'
  }
];

export const MOCK_COUPONS = [
  { id: 'cp1', type: 'cash', title: '新人特惠券', value: 10, desc: '满50可用', expiry: '2025-12-31' },
  { id: 'cp2', type: 'service', title: '免费上门检测', value: 0, desc: '区域化服务', expiry: '2025-06-30' },
  { id: 'cp3', type: 'employee', title: '员工内购津贴', value: 50, desc: '仅限专属商城', expiry: '2025-12-31', linkedProductId: 'e1' }
];

export const MOCK_ADDRESSES = [
  { 
    id: 'a1', 
    name: '张三', 
    phone: '138****8000', 
    isDefault: true, 
    province: '广东省', 
    city: '深圳市', 
    district: '南山区', 
    detail: '粤海街道 ABC SOHO A座 1801', 
    waterServiceInfo: '该区域水质优良，水压稳定。' 
  }
];

export const MOCK_HISTORY = [
  { id: 'h1', type: 'points', title: '签到成功', time: '2024-03-24 09:00', amount: '+10' },
  { id: 'h2', type: 'points', title: '订单消费', time: '2024-03-23 15:30', amount: '-100' }
];