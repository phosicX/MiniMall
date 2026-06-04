export default {
  namespaced: true,

  state: {
    items: [
      // Digital 数码
      {
        id: 1,
        title: '大疆 Osmo Action 5 Pro',
        price: 1848,
        genre: 'Digital',
        imgPath: '../../assets/products/dji action5p.png',
        isHot: true, 
        isNew: false,
        shop: 'DJI大疆官方旗舰店'
      },
      {
        id: 2,
        title: '大疆 Mini 5 Pro',
        price: 4788,
        genre: 'Digital',
        imgPath: '../../assets/products/dji mini5p.png',
        isHot: false,
        isNew: false,
        shop: 'DJI大疆官方旗舰店'
      },
      {
        id: 3,
        title: 'Nikon Z6Ⅲ 单机身',
        price: 13698,
        genre: 'Digital',
        imgPath: '../../assets/products/nikon z63.png',
        shop: '尼康官方旗舰店',
        isHot: false,
        isNew: false,
      },
      {
        id: 4,
        title: '华为 WATCH GT Runner 2',
        price: 1978,
        genre: 'Digital',
        imgPath: '../../assets/products/hw gtrunner2.png',
        shop: '华为官方旗舰店',
        isHot: true,
        isNew: true,
      },
      {
        id: 5,
        title: 'Apple AirPods 4',
        price: 768,
        genre: 'Digital',
        imgPath: '../../assets/products/apple airpods4.png',
        shop: 'Apple官方旗舰店',
        isHot: true,
        isNew: false,
      },
      
      // Mobilephone 手机
      {
        id: 6,
        title: 'iPhone 17 Pro',
        describe: '256G',
        price: 7999,
        genre: 'Mobilephone',
        imgPath: '../../assets/products/iphone17p.png',
        shop: 'Apple官方旗舰店',
        isHot: true,
        isNew: false,
      },
      {
        id: 7,
        title: '小米 17 Pro Max',
        describe: '12+256G',
        price: 5399,
        genre: 'Mobilephone',
        imgPath: '../../assets/products/xiaomi17pm.png',
        shop: '小米官方旗舰店',
        isHot: true,
        isNew: false,
      },
      {
        id: 8,
        title: '华为 Pura 90 Pro Max',
        describe: '16+512G',
        price: 7399,
        genre: 'Mobilephone',
        imgPath: '../../assets/products/hw pura90pm.png',
        shop: '华为官方旗舰店',
        isHot: true,
        isNew: true,
      },
      {
        id: 9,
        title: '荣耀 Magic V6',
        describe: '12+512G',
        price: 9999,
        genre: 'Mobilephone',
        imgPath: '../../assets/products/honor magicv6.png',
        shop: '荣耀官方旗舰店',
        isHot: false,
        isNew: true,
      },
      {
        id: 10,
        title: 'OPPO Find X9 Pro',
        describe: '16+512G',
        price: 4799,
        genre: 'Mobilephone',
        imgPath: '../../assets/products/oppofindx9p.png',
        shop: 'OPPO官方旗舰店',
        isHot: false,
        isNew: true,
      },
      {
        id: 11,
        title: 'vivo X300 Ultra',
        describe: '12+256G',
        price: 6799,
        genre: 'Mobilephone',
        imgPath: '../../assets/products/vivox300u.png',
        shop: 'vivo官方旗舰店',
        isHot: true,
        isNew: true,
      },
      
      // ComputerComponents 电脑配件
      {
        id: 12,
        title: '致态 固态硬盘 TiPlus9100 2TB',
        price: 2564,
        genre: 'ComputerComponents',
        imgPath: '../../assets/products/zhitai tiplus9100.png',
        shop: '致态官方旗舰店',
        isHot: false,
        isNew: false,
      },
      {
        id: 13,
        title: '七彩虹 GeForce RTX 5070 Ti 16GB GDDR7',
        price: 7899,
        genre: 'ComputerComponents',
        imgPath: '../../assets/products/qch rtx5070.png',
        shop: '七彩虹电脑旗舰店',
        isHot: false,
        isNew: false,
      },
      {
        id: 14,
        title: '三星 内存条 16G DDR5 5600MHz',
        price: 1499,
        genre: 'ComputerComponents',
        imgPath: '../../assets/products/samsung ddr5 5600.png',
        shop: '三星存储旗舰店',
        isHot: true,
        isNew: false,
      },
      {
        id: 15,
        title: 'Intel Ultra7 处理器 270K Plus 24核心 24线程',
        price: 2319,
        genre: 'ComputerComponents',
        imgPath: '../../assets/products/intel u7 270k p.png',
        shop: '英特尔官方旗舰店',
        isHot: false,
        isNew: false,
      },
      
      // SportsOutdoor 运动户外
      {
        id: 16,
        title: '李宁 赤兔9Pro 跑鞋 无板 竞训减震',
        price: 419,
        genre: 'SportsOutdoor',
        imgPath: '../../assets/products/lining chitu9p.png',
        shop: '李宁官方旗舰店',
        isHot: false,
        isNew: false,
      },
      {
        id: 17,
        title: '安踏 速干T运动短袖 吸湿 透气 跑步训练服装',
        price: 61,
        genre: 'SportsOutdoor',
        imgPath: '../../assets/products/anti t-shirt.png',
        shop: '安踏官方旗舰店',
        isHot: true,
        isNew: true,
      },
      {
        id: 18,
        title: '喜德盛 山地自行车 黑客700 铝合金车身 24速 油压碟刹',
        price: 1899,
        genre: 'SportsOutdoor',
        imgPath: '../../assets/products/xds heike700.png',
        shop: '喜德盛运动旗舰店',
        isHot: false,
        isNew: false,
      },
      
      // FoodBeverage 食品饮料
      {
        id: 19,
        title: '伊利 纯牛奶 21盒 250ml 1月产',
        price: 39,
        genre: 'FoodBeverage',
        imgPath: '../../assets/products/yili milk.png',
        shop: '伊利官方旗舰店',
        isHot: true,
        isNew: false,
      },
      {
        id: 20,
        title: '康师傅 方便面 红烧牛肉面 145g*5',
        price: 13,
        genre: 'FoodBeverage',
        imgPath: '../../assets/products/ksf hsnrm.png',
        shop: '康师傅官方旗舰店',
        isHot: true,
        isNew: false,
      },
      {
        id: 21,
        title: '可口可乐 碳酸饮料 330ml*6罐',
        price: 12,
        genre: 'FoodBeverage',
        imgPath: '../../assets/products/coca.png',
        shop: '可口可乐旗舰店',
        isHot: false,
        isNew: false,
      },
      {
        id: 22,
        title: '特仑苏 纯牛奶 250ml×16',
        price: 59.9,
        genre: 'FoodBeverage',
        imgPath: '../../assets/products/telunsu milk.png',
        shop: '蒙牛特仑苏旗舰店',
        isHot: false,
        isNew: false,
      },

      // HomeAppliance 家电
      {
        id: 23,
        title: '海尔 456L法式多门冰箱 抗菌双 净化 一级 风冷 无霜',
        price: 2294,
        genre: 'HomeAppliance',
        imgPath: '../../assets/products/haier refrigerator .png',
        shop: '海尔官方旗舰店',
        isHot: true,
        isNew: false,
      },
      {
        id: 24,
        title: '美的 空调立式 3匹 冷暖 双排 纯铜管',
        price: 4249,
        genre: 'HomeAppliance',
        imgPath: '../../assets/products/midea air conditioner.png',
        shop: '美的官方旗舰店',
        isHot: true,
        isNew: true,
      },
      {
        id: 25,
        title: '海尔 12公斤全自动洗衣机 除毛单洗家用',
        price: 2998,
        genre: 'HomeAppliance',
        imgPath: '../../assets/products/haier washing machine.png',
        shop: '海尔官方旗舰店',
        isHot: false,
        isNew: true,
      },
      {
        id: 26,
        title: 'TCL 雷鸟电视 鹏7 Plus 75英寸 360Hz HDMI2.1',
        price: 2998,
        genre: 'HomeAppliance',
        imgPath: '../../assets/products/tcl tv peng7p.png',
        shop: 'TCL官方旗舰店',
        isHot: false,
        isNew: true,
      },
      {
        id: 27,
        title: '海尔 200L单温冰柜 减霜一级能效 冷藏 冷冻',
        price: 747,
        genre: 'HomeAppliance',
        imgPath: '../../assets/products/haier freezer.png',
        shop: '海尔官方旗舰店',
        isHot: false,
        isNew: false,
      },
      {
        id: 28,
        title: '小天鹅 热泵式烘干机 10KG 去味 除螨 除潮',
        price: 2455,
        genre: 'HomeAppliance',
        imgPath: '../../assets/products/xiaotiane clothes dryer.png',
        shop: '小天鹅官方旗舰店',
        isHot: false,
        isNew: false,
      }
    ]
  },

  
  getters: {
    // 获取所有商品
    allProducts: (state) => state.items,
    
    // 根据类别获取商品
    getProductsByGenre: (state) => (genre) => {
      if (!genre) return state.items
      return state.items.filter(item => item.genre === genre)
    },
    
    // 获取单个商品
    getProductById: (state) => (id) => {
      return state.items.find(item => item.id === id)
    },
    
    // 获取所有类别及其数量统计
    genreCounts: (state) => {
      const counts = {}
      state.items.forEach(item => {
        counts[item.genre] = (counts[item.genre] || 0) + 1
      })
      return counts
    },
    
    // 价格区间筛选
    getProductsByPriceRange: (state) => (min, max) => {
      return state.items.filter(item => item.price >= min && item.price <= max)
    },
    
    // 获取热门商品 (isHot = true)
    getHotProducts: (state) => {
      return state.items.filter(item => item.isHot === true)
    },
    
    // 获取新品 (isNew = true)
    getNewProducts: (state) => {
      return state.items.filter(item => item.isNew === true)
    },
    
    // 获取既热门又是新品的商品
    getHotAndNewProducts: (state) => {
      return state.items.filter(item => item.isHot === true && item.isNew === true)
    }
  },
  
  mutations: {
    // 更新商品图片路径
    updateProductImage(state, { id, imagePath }) {
      const product = state.items.find(item => item.id === id)
      if (product) {
        product.imagePath = imagePath
      }
    },
    
    // 批量更新图片路径
    updateMultipleImages(state, imagesMap) {
      imagesMap.forEach(({ id, imagePath }) => {
        const product = state.items.find(item => item.id === id)
        if (product) {
          product.imagePath = imagePath
        }
      })
    },
    
    // 添加新商品
    addProduct(state, product) {
      const maxId = Math.max(...state.items.map(p => p.id), 0)
      state.items.push({
        ...product,
        id: maxId + 1,
        imagePath: product.imagePath || '',
        isHot: product.isHot || false,
        isNew: product.isNew || false
      })
    },
    
    // 更新热门状态
    updateHotStatus(state, { id, isHot }) {
      const product = state.items.find(item => item.id === id)
      if (product) {
        product.isHot = isHot
      }
    },
    
    // 更新新品状态
    updateNewStatus(state, { id, isNew }) {
      const product = state.items.find(item => item.id === id)
      if (product) {
        product.isNew = isNew
      }
    }
  },
  
  actions: {
    // 异步更新商品图片（示例）
    async setProductImage({ commit }, { id, imagePath }) {
      commit('updateProductImage', { id, imagePath })
    }
  }
}