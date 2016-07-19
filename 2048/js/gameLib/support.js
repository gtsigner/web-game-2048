/**
 * Created by zhaojunlike on 2016/7/18.
 * Author：@zhaojunlike
 * GitHub：https://github.com/zhaojunlike
 * Email: 1716771371@qq.com
 */


/**
 * 获取对应数字应该带有的颜色
 * @param number
 * @returns {string}
 */
function getBoxNumberShowBackgroundColor(number) {
    var color = "#fff";
    switch (number) {
        case 2:
            color = "#eee4da";
            break;
        case 4:
            color = "#ede0c8";
            break;
        case 8:
            color = "#f2b179";
            break;
        case 16:
            color = "#f59563";
            break;
        case 32:
            color = "#f67c5f";
            break;
        case 64:
            color = "#f65e3b";
            break;
        case 128:
            color = "#edcf72";
            break;
        case 256:
            color = "#edcc61";
            break;
        case 512:
            color = "#9c0";
            break;
        case 1024:
            color = "#33b5e5";
            break;
        case 2048:
            color = "#09c";
            break;
        case 4096:
            color = "#a6c";
            break;
        case 8192:
            color = "#93c";
            break;
        default:
            break;
    }

    return color;
}

/**
 * 获取前景颜色
 * @param number
 * @returns {*}
 */
function getBoxNumberShowColor(number) {
    if (number <= 4) {
        return "#776e65"
    }
    return "white";
}





