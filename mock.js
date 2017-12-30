var Mock = require('mockjs')
var fs = require('fs')

var data = new Mock.mock({
    'bannar|4': [
        {
            'id|+1': 1,
            'bannar_img': '@image(320x120, @color)',
            'cids|4': [
                {
                    'name': '@cword(3, 5)'
                }
            ],
            'products|30-50': [
                {
                    // 子分类下标
                    'cidIndex|0-3': 10,
                    'product_id|+1': 1,
                    'product_img': '@image(168x168,@color)',
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
            'category_img': '@image(320x76, @color)',
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
            'cidIndex|0-3': 10,
            // 商品的图片
            'imgs': {
                'min': '@image(80x80, @color, @cname)',
                'big': '@image(300x300, @color, @cname)'
            },
            'name': '@cword(3,10)',
            'price|1-100.1': 10,
            // 商品的单位
            'unit|10-1000': 10,
            // 商品的品牌
            'brand': '@cword(2, 4)',
            // 保质期
            'expiration_date|1-3.1': 10,
            // 数量
            'num': 0,
            // 商品详情
            'details': '@cparagraph()'
        }
    ],
    'users': [],
    'carts': []
})

fs.writeFile('db.json', JSON.stringify(data, null, 2), function () {
    console.log('写入成功')
})