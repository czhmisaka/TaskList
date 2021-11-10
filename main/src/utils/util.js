/*
 * @Author: czh
 * @Date: 2021-04-22 19:20:11
 */


// util里的所有函数直接注入Vue对象
let isMobile = function () {
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
}




export default {
    isMobile
}