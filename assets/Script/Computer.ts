import { _decorator, Component, Node } from 'cc';
import {game} from './GameLogic';
import { PLAYER } from './Enum';

/** 
 * AI控制模块
 */
export class computer  {
   CurrChessboard:number[][]= [[0,0,0],[0,0,0],[0,0,0]];
    NUMBER = 3
    STEP = 9
    MAN = 1
    SEARCHDEPTH = 9
    INT_MAX = 999999
    INT_MIN = -1000000
    currentDepth = 0
    player = 1
    bestPosition = {
        x: 2,
        y: 1
    }

     /** AI行动*/
   public AiAction(){
        for(var i = 0;i<=2;i++)
       {
        //this.CurrChessboard[i] = game.chessBoard[i]
        for (var j=0;j<=2;j++)
        {
            this.CurrChessboard[i][j] = game.chessBoard[i][j]
            //console.log("Ai Chessboard x:"+i+" y:"+j+" Value: "+this.CurrChessboard[i][j])
        }
       }
       this.player = -1

       this.MinMaxSearch(this.currentDepth)
       game.gameFlow.PlayChess(PLAYER.COMPUTER,this.bestPosition.x,this.bestPosition.y)
   }

   /** 检查模拟棋盘是否为终局*/
   protected End(){
        let i = 0
        let j = 0
        let count:number = 0
        for(i = 0; i < this.NUMBER; i++) { //行
            count = 0;
            for(j = 0; j < this.NUMBER; j++)
                count = this.CurrChessboard[i][j] + 1;
            if(count == 3 || count == -3)
                return count / 3;
        }
        for(j = 0; j < this.NUMBER; j++) { //列
            count = 0;
            for(i = 0; i < this.NUMBER; i++)
                count += this.CurrChessboard[i][j];
            if(count == 3 || count == -3)
                return count / 3;
        }
        count = 0;
        count = this.CurrChessboard[0][0] + this.CurrChessboard[1][1] + this.CurrChessboard[2][2];
        if(count == 3 || count == -3)
            return count / 3;
        count = this.CurrChessboard[0][2] + this.CurrChessboard[1][1] + this.CurrChessboard[2][0];
        if(count == 3 || count == -3)
            return count / 3;
        return 0;
    }

    /** 评估函数*/
   protected Evaluate() {
        var value = this.End();
        if(value == PLAYER.HUMAN) return this.INT_MAX;
        if(value == PLAYER.COMPUTER) return this.INT_MIN;
        return value;
    }


    /** AI算法*/
   protected MinMaxSearch(depth:number){

    var value = 0;
    if(this.player == PLAYER.HUMAN) value = this.INT_MIN;
    if(this.player == PLAYER.COMPUTER) value = this.INT_MAX;
    if(this.End()!= 0) {
        return this.Evaluate();
    }
    if(depth == this.SEARCHDEPTH) {
        return this.Evaluate();
    }
    for(let i = 0; i < this.NUMBER; i++) {
        for(let j = 0; j < this.NUMBER; j++) {
            if(this.CurrChessboard[i][j] == 0) {
                if(this.player == PLAYER.HUMAN) {
                    this.CurrChessboard[i][j] = PLAYER.HUMAN;
                    this.player = PLAYER.COMPUTER;
                    var nextvalue = this.MinMaxSearch(depth + 1);
                    this.player = PLAYER.HUMAN;
                    if(value <= nextvalue) {
                        value = nextvalue;
                        if(depth == this.currentDepth) {
                            this.bestPosition.x = i;
                            this.bestPosition.y = j;
                        }

                    }

                } else if(this.player == PLAYER.COMPUTER) {
                    this.CurrChessboard[i][j] = PLAYER.COMPUTER;
                    this.player = PLAYER.HUMAN;
                    var nextvalue = this.MinMaxSearch(depth+1);
                    this.player = PLAYER.COMPUTER;
                    if(value >= nextvalue) {
                        value = nextvalue;
                        if(depth == this.currentDepth ) {
                            this.bestPosition.x = i;
                            this.bestPosition.y = j;
                        }
                    }
                }
                            this.CurrChessboard[i][j] = 0;
            }

        }
    }

    return value;
   }

}


