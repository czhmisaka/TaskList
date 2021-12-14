/*
 * @Author: czh
 * @Date: 2021-04-22 19:20:11
 */
const devServer = {
    open: process.platform === 'czh',
    host: '127.0.0.1',
    port: 8050,
    https: false,
    hotOnly: false,
}

module.exports = {
    devServer,
}