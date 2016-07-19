/**
 * Created by zhaojunlike on 2016/7/18.
 * Author：@zhaojunlike
 * GitHub：https://github.com/zhaojunlike
 * Email: 1716771371@qq.com
 */


var gameInitBox = new Array();//游戏面板
var gameScoreBoard = new Array();//游戏记分版
var userScore = 0;//用户分数
var isStart = true;
var gameBoxHtml = "";
var isGameOver = false;
var gameRow = 4, gameCol = 4;//定义游戏基础

/*新游戏入口点*/
function newGame() {
    gameInitBox = new Array();
    gameScoreBoard = new Array();
    userScore = 0;
    isStart = true;
    isGameOver = false;
    $(".game-box").html(gameBoxHtml);
    //初始化数据
    initGameBox();
}
function createGameBox() {


}
/*初始化游戏盒子  OK*/
function initGameBox() {
    /*清空之前的所有数据*/
    for (var bRow = 0; bRow < 4; bRow++) {
        var boxRow = new Array();
        var boxNumRow = new Array();
        for (var bCol = 0; bCol < 4; bCol++) {
            var item = getGameItemBox(bRow, bCol);
            boxRow.push(item);//加入集合
            boxNumRow.push(0);
        }
        gameScoreBoard.push(boxNumRow);
        gameInitBox.push(boxRow);
    }
    /*初始化2个数字*/
    createRandBoxNumber();
    createRandBoxNumber();
}


/* jqeury获取游戏盒子对象*/
function getGameItemBox(row, col) {
    return $(".game-box #box-" + row + "-" + col);
}

/**
 * 检查是否有空格子
 * @returns {boolean}
 */
function checkHaveSpaceBox() {
    var checkTag = false;
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            //如果其中有一个接点的值不为0了的话那么游戏就结束了
            //1.是否有空的
            if (gameScoreBoard[row][col] == 0) {
                checkTag = true;
            }
        }
    }
    return checkTag;
}

/*检查游戏是否结束了*/
function checkGameOver() {
    //1.有空
    //2.是否可以继续移动
    if (checkCanMove(MOVE_RIGHT) == false && checkCanMove(MOVE_LEFT) == false && checkCanMove(MOVE_DOWN) == false && checkCanMove(MOVE_TOP) == false && checkHaveSpaceBox() == false) {
        isGameOver = true;
    }
    return isGameOver;
}

/*移动  left*/
function moveGameBoxLeft() {
    if (checkCanMove(MOVE_LEFT) != true) {
        return false;
    }
    for (var row = 0; row < 4; row++) {
        for (var col = 1; col < 4; col++) {
            //判断是否有数字
            if (gameScoreBoard[row][col] != 0) {
                //判断可移动位置
                for (var mC = col - 1; mC >= 0; mC--) {
                    //移动的目标地址是不是空
                    if (gameScoreBoard[row][mC] == 0) {
                        moveWithAnimation(row, mC + 1, row, mC);
                    }
                    //2个盒子相同的情况
                    if (gameScoreBoard[row][mC] == gameScoreBoard[row][mC + 1]) {
                        getGameItemBox(row, mC + 1).find("span").animate({display: "none"});//移除盒子和样式d
                        getGameItemBox(row, mC + 1).html('');
                        setNumberWithAnimation(row, mC, 2 * gameScoreBoard[row][mC]);
                        userScore += (2 * gameScoreBoard[row][mC]);//分数
                        //为0
                        gameScoreBoard[row][mC + 1] = 0;
                        gameScoreBoard[row][mC] = 2 * gameScoreBoard[row][mC];
                    }
                }
            }
        }
    }
}
//下 Ok
function moveGameBoxDown() {
    if (checkCanMove(MOVE_DOWN) != true) {
        return false;
    }
    for (var col = 0; col < 4; col++) {
        for (var row = 2; row >= 0; row--) {
            //判断是否有数字
            if (gameScoreBoard[row][col] != 0) {
                //判断可移动位置
                for (var mC = row + 1; mC < 4; mC++) {
                    //移动的目标是不是空
                    if (gameScoreBoard[mC][col] == 0) {
                        moveWithAnimation(mC - 1, col, mC, col);
                    }
                    //2个盒子相同的情况
                    if (gameScoreBoard[mC - 1][col] == gameScoreBoard[mC][col]) {
                        getGameItemBox(mC - 1, col).html('');//移除盒子和样式
                        setNumberWithAnimation(mC, col, 2 * gameScoreBoard[mC][col]);
                        userScore += (2 * gameScoreBoard[mC][col]);//分数
                        gameScoreBoard[mC - 1][col] = 0;
                        gameScoreBoard[mC][col] = 2 * gameScoreBoard[mC][col];
                    }
                }
            }
        }
    }
}
//上 OK
function moveGameBoxTop() {
    if (checkCanMove(MOVE_TOP) != true) {
        return false;
    }
    for (var col = 0; col < 4; col++) {
        for (var row = 1; row < 4; row++) {
            //判断是否有数字
            if (gameScoreBoard[row][col] != 0) {
                //判断可移动位置
                for (var mC = row - 1; mC >= 0; mC--) {
                    //移动的目标是不是空
                    if (gameScoreBoard[mC][col] == 0) {
                        moveWithAnimation(mC + 1, col, mC, col);
                    }
                    //2个盒子相同的情况
                    if (gameScoreBoard[mC][col] == gameScoreBoard[mC + 1][col]) {
                        getGameItemBox(mC + 1, col).html('');//移除盒子和样式
                        setNumberWithAnimation(mC, col, 2 * gameScoreBoard[mC + 1][col]);
                        userScore += (2 * gameScoreBoard[mC][col]);//分数
                        gameScoreBoard[mC + 1][col] = 0;
                        gameScoreBoard[mC][col] = 2 * gameScoreBoard[mC][col];
                    }
                }
            }
        }
    }
}
//right ok
function moveGameBoxRight() {
    if (checkCanMove(MOVE_RIGHT) != true) {
        return false;
    }
    for (var row = 0; row < 4; row++) {
        for (var col = 2; col >= 0; col--) {
            //判断是否有数字
            if (gameScoreBoard[row][col] != 0) {
                //判断可移动位置
                for (var mC = col + 1; mC <= 3; mC++) {
                    //移动的目标是不是空
                    if (gameScoreBoard[row][mC] == 0) {
                        moveWithAnimation(row, mC - 1, row, mC);
                    }
                    //2个盒子相同的情况
                    if (gameScoreBoard[row][mC] == gameScoreBoard[row][mC - 1]) {
                        getGameItemBox(row, mC - 1).html('');//移除盒子和样式
                        setNumberWithAnimation(row, mC, 2 * gameScoreBoard[row][mC]);
                        userScore += (2 * gameScoreBoard[row][mC]);//分数
                        gameScoreBoard[row][mC - 1] = 0;
                        gameScoreBoard[row][mC] = 2 * gameScoreBoard[row][mC];
                    }
                }
            }
        }
    }
}

/**
 * 检测是否可以移动
 * @param direction
 * @returns {boolean}
 */
function checkCanMove(direction) {
    switch (direction) {
        case MOVE_LEFT:
            for (var row = 0; row < 4; row++) {
                for (var col = 1; col < 4; col++) {
                    //判断是否有数字
                    if (gameScoreBoard[row][col] != 0) {
                        //判断可移动位置
                        for (var mC = col - 1; mC >= 0; mC--) {
                            //移动的目标地址是不是空
                            if (gameScoreBoard[row][mC] == 0) {
                                return true;
                            }
                            //2个盒子相同的情况
                            if (gameScoreBoard[row][mC] == gameScoreBoard[row][mC + 1]) {
                                return true;
                            }
                        }
                    }
                }
            }
            break;
        case MOVE_DOWN:
            for (var col = 0; col < 4; col++) {
                for (var row = 2; row >= 0; row--) {
                    //判断是否有数字
                    if (gameScoreBoard[row][col] != 0) {
                        //判断可移动位置
                        for (var mC = row + 1; mC < 4; mC++) {
                            //移动的目标是不是空
                            if (gameScoreBoard[mC][col] == 0) {
                                return true;
                            }
                            //2个盒子相同的情况
                            if (gameScoreBoard[mC - 1][col] == gameScoreBoard[mC][col]) {
                                return true;
                            }
                        }
                    }
                }
            }
            break;
        case MOVE_TOP:
            for (var col = 0; col < 4; col++) {
                for (var row = 1; row < 4; row++) {
                    //判断是否有数字
                    if (gameScoreBoard[row][col] != 0) {
                        //判断可移动位置
                        for (var mC = row - 1; mC >= 0; mC--) {
                            //移动的目标是不是空
                            if (gameScoreBoard[mC][col] == 0) {
                                return true;
                            }
                            //2个盒子相同的情况
                            if (gameScoreBoard[mC][col] == gameScoreBoard[mC + 1][col]) {
                                return true;
                            }
                        }
                    }
                }
            }
            break;
        case MOVE_RIGHT:
            for (var row = 0; row < 4; row++) {
                for (var col = 2; col >= 0; col--) {
                    //判断是否有数字
                    if (gameScoreBoard[row][col] != 0) {
                        //判断可移动位置
                        for (var mC = col + 1; mC <= 3; mC++) {
                            //移动的目标是不是空
                            if (gameScoreBoard[row][mC] == 0) {
                                return true;
                            }
                            //2个盒子相同的情况
                            if (gameScoreBoard[row][mC] == gameScoreBoard[row][mC - 1]) {
                                return true;
                            }
                        }
                    }
                }
            }
            break;
        default:
            //throw('system error');
            break;
    }
    return false;

}

$(function () {
    gameBoxHtml = $(".game-box").html();//获取初始的页面
    newGame();//新游戏
    $(document).keydown(function (event) {
        switch (event.keyCode) {
            //左
            case 37:
                event.preventDefault();
                moveGameBoxLeft();
                break;
            case 38:
                event.preventDefault();
                moveGameBoxTop();
                break;
            //you
            case 39:
                event.preventDefault();
                moveGameBoxRight();
                break;
            case 40:
                event.preventDefault();
                moveGameBoxDown();
                break;
            default:
                return false;
                break;
        }
        //没一次移动完成之后
        updateUserScore();
        if (checkGameOver() == true) {
            alert("Game Over !!");
            return false;
        } else {
            if (checkHaveSpaceBox() == true) {
                createRandBoxNumber();
            }
        }
        console.log(gameScoreBoard);

    });

    /*手机版touch*/
    document.addEventListener("touchstart", function (e) {

    });
    document.addEventListener("touchmove", function (e) {

    });
    document.addEventListener("touchend", function (e) {

        var actionType = 1;
        switch (actionType) {
            //左
            case 37:
                event.preventDefault();
                moveGameBoxLeft();
                break;
            //下
            case 38:
                event.preventDefault();
                moveGameBoxDown()
                break;
            //you
            case 39:
                event.preventDefault();
                moveGameBoxRight()
                break;
            //上
            case 40:
                event.preventDefault();
                moveGameBoxTop()
                break;
            default:
                return false;
                break;
        }
    });


});

function updateUserScore() {
    $("#gameScore").html(userScore);
}

