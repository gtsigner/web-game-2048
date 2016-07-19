/**
 * Created by zhaojunlike on 2016/7/18.
 * Author：@zhaojunlike
 * GitHub：https://github.com/zhaojunlike
 * Email: 1716771371@qq.com
 */
/**
 * 移动方向
 * @type {number}
 */
const MOVE_TOP = 1;
const MOVE_DOWN = 2;
const MOVE_LEFT = 3;
const MOVE_RIGHT = 4;

/**
 * 指定位置写入数据,夹带动画效果
 * @param row
 * @param col
 * @param number
 */
function setNumberWithAnimation(row, col, number) {
    var itemBox = getGameItemBox(row, col);
    itemBox.html("<span>" + number + "</span>");
    itemBox.find("span").css("background", getBoxNumberShowBackgroundColor(number));
    itemBox.find("span").css("color", getBoxNumberShowColor(number));
}

/**
 * 设置对应盒子的数字
 * @param row
 * @param col
 * @param number
 */
function setBoxNumberStatic(row, col, number) {
    var itemBox = getGameItemBox(row, col);
    itemBox.html("<span>" + number + "</span>");
    itemBox.find("span").css("background", getBoxNumberShowBackgroundColor(number));
    itemBox.find("span").css("color", getBoxNumberShowColor(number));
}


/*生成一个盒子随机数*/
function createRandBoxNumber() {
    if (isGameOver) {
        alert("对不起游戏已经结束了！");
        return;
    }
    while (true) {
        var rand = parseInt(Math.floor(Math.random() * 16));//16之间了
        var iRow = parseInt(rand / 4);//行
        var iCol = rand % 4;//列
        if (gameScoreBoard[iRow][iCol] == 0) {
            console.log("初始化：" + iRow + "-" + iCol);//初始化各子
            var initRandNum = Math.random() <= 0.5 ? 2 : 4;//随机数字
            setBoxNumberStatic(iRow, iCol, initRandNum);//写入静态数字
            setGameBoardScore(iRow, iCol, initRandNum);//写入分数
            break;
        }
    }
    return true;
}

/**
 * 给游戏面板写入分数
 * @param row
 * @param col
 * @param score
 */
function setGameBoardScore(row, col, score) {
    gameScoreBoard[row][col] = score;
}

/**
 * 带有动画效果的移动
 * @param row
 * @param col
 * @param direction
 */
function moveWithAnimation(row, col, eRow, eCol) {
    var itemBox = getGameItemBox(row, col);
    itemBox.find("span").clone(true).appendTo(getGameItemBox(eRow, eCol));
    itemBox.find("span").animate({left: '200px'});
    gameScoreBoard[eRow][eCol] = gameScoreBoard[row][col];
    gameScoreBoard[row][col] = 0;
    console.log("move: " + row + "," + col + " to " + eRow + "," + eCol);
    itemBox.html('');
}



