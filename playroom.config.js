const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')

module.exports = {
  components: './src/playroom/components.ts',
  outputPath: './site/playroom',
  title: 'Mirror',
  snippets: './src/playroom/snippets.ts',
  themes: './src/playroom/themes.ts',
  frameComponent: './src/playroom/FrameComponent.tsx',
  scope: './src/playroom/useScope.ts',
  typeScriptFiles: ['src/**/*.{ts,tsx}', '!**/node_modules'],
  widths: [320, 640, 768, 1024, 1280],
  openBrowser: false,
  port: 8082,

  webpackConfig: () => ({
    plugins: [
      new VanillaExtractPlugin(),
      new MiniCssExtractPlugin({
        ignoreOrder: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.vanilla\.css$/i, // Targets only CSS files generated by vanilla-extract
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                url: false, // Required as image imports should be handled via JS/TS import statements
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: ['@vanilla-extract/babel-plugin'],
            },
          },
        },
      ],
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.ts', '.tsx'],
    },
  }),
}
