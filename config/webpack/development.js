process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

// module.exports = environment.toWebpackConfig()

const isDevelopment = process.env.NODE_ENV !== 'production';

const {devServer} = require('@rails/webpacker')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isWebpackDevServer = process.env.WEBPACK_DEV_SERVER

//plugins
if (isWebpackDevServer) {
    environment.plugins.append(
        'ReactRefreshWebpackPlugin',
        new ReactRefreshWebpackPlugin({
            overlay: {
                sockPort: devServer.port
            }
        })
    )
}

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devServer: {
        hot: true,
    },
    ...environment.toWebpackConfig()
};
