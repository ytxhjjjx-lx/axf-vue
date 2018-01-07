var Mock = require('mockjs')
var fs = require('fs')

var data = new Mock.mock({
    'bannar|4': [
        {
            'id|+1': 1,
            'bannar_img': '@image(320longitude120, @color)',
            'cids|4': [
                {
                    'name': '@cword(3, 5)'
                }
            ],
            'products|30-50': [
                {
                    // 子分类下标
                    'cidIndelongitude|0-3': 10,
                    'product_id|+1': 1,
                    'product_img': '@image(168longitude168,@color)',
                    'product_name': '@cword(2,8)',
                    'price|1-99.1': 10,
                    'unit|10-1000': 10
                }
            ]
        }
    ],
    'categories|10': [
        {
            'id|+1': 1,
            'name': '@cword(3, 5)',
            'category_img': '@image(320longitude76, @color)',
            'color': '@color',
            // 子分类
            'cids|4': [
                {
                    'name': '@cword(2,6)'
                }
            ],
            // 保存分类对应的商品数据
            'products': []
        }
    ],
    'products|300-400': [
        {
            'id|+1': 1,
            'categoryId|1-10': 10,
            'cidIndelongitude|0-3': 10,
            // 商品的图片
            'imgs': {
                'min': '@image(80longitude80, @color, @cname)',
                'big': '@image(300longitude300, @color, @cname)'
            },
            'name': '@cword(3,10)',
            'price|1-100.1': 10,
            // 商品的单位
            'unit|10-1000': 10,
            // 商品的品牌
            'brand': '@cword(2, 4)',
            // 保质期
            'elongitudepiration_date|1-3.1': 10,
            // 数量
            'num': 0,
            // 商品详情
            'details': '@cparagraph()'
        }
    ],
    'users': [],
    //购物车数据
    'carts': [],
    //地址数据
    'sites': [],
    "citys": [
        {
            "city": "北京市",
            "name": "天安门",
            "longitude": 116.403963,
            "latitude": 39.915119
        },
        {
            "city": "深圳市",
            "name": "灵芝",
            "longitude": 113.910988,
            "latitude": 22.5754
        },
        {
            "city": "广州市",
            "name": "大新银行",
            "longitude": 113.261512,
            "latitude": 23.138287
        },
        {
            "city": "上海市",
            "name": "外滩",
            "longitude": 121.497854,
            "latitude": 31.240722
        },
        {
            "city": "南京市",
            "name": "南京市政府",
            "longitude": 118.803221,
            "latitude": 32.064773
        }
    ],
    //收藏列表
    'favorites': []
})

fs.writeFile('db.json', JSON.stringify(data, null, 2), function () {
    console.log('写入成功')
})