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
    },
  },
};

export default devConfig;
