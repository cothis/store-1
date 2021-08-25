import { Configuration } from 'webpack';

// 목업 데이터 추후 지울 예정
const productMock = [
  {
    id: '1',
    title: '잘나가요 세트',
    price: 15000,
    tags: ['best', 'new'],
    like: false,
  },
  {
    id: '2',
    title: '안보이는 양말 세트',
    price: 20000,
    tags: ['green', 'sale'],
    sale: {
      percent: 5,
      price: 19000,
    },
    like: true,
  },
  {
    id: '3',
    title: '피규어. 독고배달이',
    price: 14000,
    tags: ['soldout'],
    like: false,
  },
];

type sortKeyword = 'popular' | 'latest' | 'low-price' | 'high-price ';

const products = Array.from({ length: 12 }, (_, idx) => {
  return productMock[idx % 3];
});

const productsData = {
  totalPage: 11,
  totalCount: 11 * 12,
  products,
};

const detail = {
  id: '13',
  title: '수건. 너 먼저 씻어',
  tags: [],
  price: 9000,
  originalPrice: 10000,
  priceText: '0원. 마음껏 쓰세요.',
  imageUrl: 'image/13/thumbnail.jpg',
  content: ['image/13/content/1.jpg', 'image/13/content/2.jpg', 'image/13/content/3.jpg', 'image/13/content/4.jpg'],
  spec: [
    ['제품명', '수건. 너 먼저 씻어'],
    ['법에의한 인증', '허가등을 받았음을 확인할 수 있는 경우 그에 대한 사항', '해당 없음'],
  ],
  recommandations: ['169', '39', '115'],
};

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    contentBase: './public',
    port: 9000,
    historyApiFallback: true,
    // 추후 지울 예정
    before: (app, server, compiler) => {
      app.get('/api/v1/products', (req, res) => {
        const data: { [key: string]: any } = Object.assign({}, productsData);
        Object.entries(req.query).forEach(([key, value]) => {
          if (key === 'page') {
            data['currentPage'] = value;
            return;
          }
          data[key] = value;
        });
        if (!data['currentPage']) data['currentPage'] = 1;
        setTimeout(() => {
          res.json(data);
        }, 2000);
      });
      app.get('/api/v1/products/:id', (req, res) => {
        const data = { ...detail };
        // req.params.id
        res.json(data);
      });
    },
  },
};

export default devConfig;
