// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const isDevelopment = process.env.NODE_ENV !== 'production';
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
//   mode: isDevelopment ? 'development' : 'production',
//   entry: './index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
//   // TODO чтобы распилить код на мелкие js
//   // output: {
//   //   path: path.resolve(__dirname, 'dist'),
//   //   filename: '[name].[contenthash].js', // Unique filename for main and runtime chunks
//   //   chunkFilename: '[name].[contenthash].chunk.js', // Unique filenames for dynamic imports
//   //   clean: true, // Clears old builds
//   // },
//   // resolve: {
//   //   alias: {
//   //     react: path.resolve('./node_modules/react'),
//   //     'react-dom': path.resolve('./node_modules/react-dom'),
//   //     'react-native': 'react-native-web', // Ensures React Native modules are interpreted correctly for web
//   //     'react-native-fast-image': '@preflower/react-native-web-fast-image',
//   //     '@react-native-clipboard/clipboard' : 'react-native-web-clipboard'
//   //     },
//   //   extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.json'],
//   //   fallback: {
//   //     process: require.resolve('process/browser'), // Polyfill for process
//   //   },

//   // },
//   resolve: {
//     alias: {
//       react: path.resolve('./node_modules/react'),
//       'react-dom': path.resolve('./node_modules/react-dom'),
//       'react-native': 'react-native-web', 
//       'react-native-fast-image': '@preflower/react-native-web-fast-image',
//       '@react-native-clipboard/clipboard': 'react-native-web-clipboard',
//     },
//     extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js', '.json', '.mjs'],
//     fallback: {
//       process: require.resolve('process/browser'),
//       fs: false,
//       path: require.resolve('path-browserify'),
//       buffer: require.resolve('buffer/'),
//     },
//   },
//   module: {
//     // rules: [
//     //   // Babel loader for handling JS, JSX, TS, and TSX
//     //   {
//     //     test: /\.(js|jsx|ts|tsx)$/,
//     //     exclude: /node_modules/,
//     //     use: {
//     //       loader: 'babel-loader',
//     //       options: {
//     //         presets: [
//     //           'module:@react-native/babel-preset',
//     //           '@babel/preset-env',
//     //           '@babel/preset-react',
//     //           '@babel/preset-typescript',
//     //         ],
//     //         plugins: ['@babel/plugin-transform-flow-strip-types'],
//     //       },
//     //     },
//     //   },
//     //   // Loader for handling specific node_modules code (React Native modules)
//     //   {
//     //     test: /\.js$/,
//     //     include: /node_modules\/@react-native\/assets-registry/,
//     //     use: {
//     //       loader: 'babel-loader',
//     //       options: {
//     //         presets: [
//     //           '@babel/preset-env',
//     //           '@babel/preset-react',
//     //           '@babel/preset-typescript',
//     //         ],
//     //         plugins: ['@babel/plugin-transform-flow-strip-types'],
//     //       },
//     //     },
//     //   },
//     //   // Built-in Webpack loader for assets (images, fonts, etc.)
//     //   {
//     //     test: /\.(png|jpe?g|gif|svg)$/i,
//     //     type: 'asset/resource', // Webpack 5 built-in loader
//     //   },
//     // ],
//     rules: [
//       // Babel loader for handling JS, JSX, TS, and TSX

//       {
//         test: /\.(js|jsx|ts|tsx)$/,
//         exclude: /node_modules/, // Exclude all node_modules except specific ones
        
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               'module:@react-native/babel-preset',
//               '@babel/preset-env',
//               '@babel/preset-react',
//               '@babel/preset-typescript',
//             ],
//             plugins: [
//               '@babel/plugin-transform-flow-strip-types',
//               '@babel/plugin-transform-class-properties', 
//               '@babel/plugin-transform-private-methods',
//               '@babel/plugin-transform-private-property-in-object',
//               'react-native-reanimated/plugin', // For React Native reanimated
//             ],
//           },
//         },
//       },
//       // Loader for handling specific node_modules code (React Native modules)
//       {
//         test: /\.(js|ts|tsx)$/,
//         include: [
//           /node_modules\/react-native-swiper-flatlist/,
//           /node_modules\/react-native-snap-carousel-v2-maintained/, // Add react-native-snap-carousel to be transpiled
//           /node_modules\/@react-native\/assets-registry/, // Keep the existing handling for other react-native modules
//           /node_modules\/react-native/, // Optionally include all react-native packages if needed
//           // /node_modules\/@gorhom\/bottom-sheet/
          
//         ],
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               '@babel/preset-env',
//               '@babel/preset-react',
//               '@babel/preset-typescript',
//               "@babel/preset-flow"
//             ],
//             plugins: [
//               '@babel/plugin-transform-flow-strip-types',
//               '@babel/plugin-transform-class-properties', 
//               '@babel/plugin-transform-private-methods',
//               '@babel/plugin-transform-private-property-in-object',
//             ],
//           },
//         },
//       },
      
//       // Built-in Webpack loader for assets (images, fonts, etc.)
//       {
//         test: /\.(png|jpe?g|gif|svg)$/i,
//         type: 'asset/resource', // Webpack 5 built-in loader for static assets
//       },
//     ],
//   },
//   plugins: [
//     new CleanWebpackPlugin(), // Очищает директорию dist перед новой сборкой

//     new HtmlWebpackPlugin({
//       template: './public/index.html',
//     }),
//     new webpack.ProvidePlugin({
//       process: 'process/browser', // Polyfill for process
//     }),
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
//       '__DEV__': JSON.stringify(isDevelopment),
//     }),

//     new webpack.HotModuleReplacementPlugin(),
//     new ReactRefreshWebpackPlugin(),  // Плагин для HMR React

    
//     // new webpack.DefinePlugin({
//     //   'process.env.NODE_ENV': JSON.stringify('production')
//     // }),
//     // new webpack.DefinePlugin({
//     //   __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
//     // }),
//   ],
//   devServer: {
//     static: {
//       directory: path.join(__dirname, 'dist'), // Serve static files from dist
//     },
//     // server: 'spdy',
//     compress: true, // Enable gzip compression
//     port: 8080,
//     historyApiFallback: true, // Ensures client-side routing works
//     hot: true, // Enable hot module replacement
//     allowedHosts: 'all',
//     devMiddleware: {
//       index: false, // specify to enable root proxying
//     },

//     proxy: [
//       {
//         context: ['/api'],

//         pathRewrite: { '^/api': '' },
//         target: 'https://plitkazavr.ru/',
//         secure: true,
//         changeOrigin: true, // Ensure the origin is the target URL
//         onProxyReq: (proxyReq, req, res) => {
//           // Проверяем наличие заголовка 'content-type'
//           if (req.headers['Content-Type']) {
//             proxyReq.setHeader('Content-Type', req.headers['Content-Type']);
//           }
        
//           // Остальные заголовки
//           proxyReq.setHeader('x-api-key', req.headers['x-api-key'] || '');
//           proxyReq.setHeader('access-token', req.headers['access-token'] || '');
//         },
//         onProxyRes: (proxyRes, req, res) => {
//           // Modify the response if needed
//           proxyRes.headers['access-control-allow-origin'] = 'https://plitkazavr.ru';
//         }
//       },
//     ]
//   },
//   // optimization: {
//   //   splitChunks: {
//   //     chunks: 'all',
//   //     minSize: 20000, // Minimum size for chunk to be split
//   //     maxSize: 500000, // Maximum size for individual chunks
//   //     automaticNameDelimiter: '.',
//   //     cacheGroups: {
//   //       vendors: {
//   //         test: /[\\/]node_modules[\\/]/,
//   //         name: 'vendors',
//   //         chunks: 'all',
//   //       },
//   //       commons: {
//   //         test: /[\\/]src[\\/]/,
//   //         name: 'commons',
//   //         chunks: 'all',
//   //         minChunks: 2,
//   //       },
//   //     },
//   //   },
//   //   runtimeChunk: 'single', // Creates a separate runtime chunk
//   // },
  
// };
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDevelopment = process.env.NODE_ENV !== 'production';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './index.js',
  // output: {
  //   path: path.resolve(__dirname, 'js'),
  //   filename: 'bundle.js',
  // },

  output: {
    path: path.resolve(__dirname, 'js'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    clean: true, // Automatically clean output directory
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-native': 'react-native-web',
      '@d11/react-native-fast-image': '@preflower/react-native-web-fast-image',
      '@react-native-clipboard/clipboard': 'react-native-web-clipboard',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
    },
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js', '.json', '.mjs', '.cjs'],
    fallback: {
      process: require.resolve('process/browser'),
      fs: false,
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'module:@react-native/babel-preset',
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-transform-flow-strip-types',
              '@babel/plugin-transform-class-properties',
              '@babel/plugin-transform-private-methods',
              '@babel/plugin-transform-private-property-in-object',
              'react-native-reanimated/plugin',
            ],
          },
        },
      },
      {
        test: /\.(js|mjs|ts|tsx)$/,
        include: [
          /node_modules\/react-native-swiper-flatlist/,
          /node_modules\/react-native-snap-carousel-v2-maintained/,
          /node_modules\/@react-native\/assets-registry/,
          /node_modules\/react-native/,
          /node_modules\/@gorhom\/bottom-sheet/,  // ✅ Ensuring bottom-sheet is transpiled
        ],
        type: 'javascript/auto', // ✅ Ensure Webpack treats modules correctly
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-transform-flow-strip-types',
              '@babel/plugin-transform-class-properties',
              '@babel/plugin-transform-private-methods',
              '@babel/plugin-transform-private-property-in-object',
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      '__DEV__': JSON.stringify(isDevelopment),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],

  experiments: {
    topLevelAwait: true, // ✅ Required for modern ES module handling
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    historyApiFallback: true,
    hot: true,
    allowedHosts: 'all',
    devMiddleware: {
      index: false,
    },
    proxy: [
      {
        context: ['/api'],
        pathRewrite: { '^/api': '' },
        target: 'https://creatile.pro/',
        secure: true,
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
          if (req.headers['Content-Type']) {
            proxyReq.setHeader('Content-Type', req.headers['Content-Type']);
          }
          proxyReq.setHeader('x-api-key', req.headers['x-api-key'] || '');
          proxyReq.setHeader('access-token', req.headers['access-token'] || '');
        },
        onProxyRes: (proxyRes, req, res) => {
          proxyRes.headers['access-control-allow-origin'] = 'https://creatile.pro';
        }
      },
    ],
  },

  optimization: {
    runtimeChunk: 'single', // Separate runtime code into its own chunk
    splitChunks: {
      chunks: 'all', // Split both dynamic and initial imports
      minSize: 20000, // Minimum size for a chunk to be generated
      maxSize: 240000, // Split bigger chunks
      minChunks: 1, // Minimum times a module has to be reused
      cacheGroups: {
        // Split React and ReactDOM into their own chunk
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-vendor',
          chunks: 'all',
          priority: 20,
        },
        // Other node_modules go here
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          enforce: true,
        },
        // Shared modules between multiple chunks
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },
  
};
