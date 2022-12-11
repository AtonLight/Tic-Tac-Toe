import { _decorator, Component, Node } from 'cc';
import {game} from './GameLogic';
import { PLAYER,DRAW} from './Enum';

/** 
 * 游戏流程模块
 */
export class gameFlow  {
    player:number = 0;
    num:number = 3;
    constructor() { 
        this.player = PLAYER.COMPUTER;
    }  

     /** 交换玩家*/
    public ChangePlayer(){

        this.IsEnd(game.chessBoard)

        if(this.player == PLAYER.HUMAN)
        {
            this.player = PLAYER.COMPUTER
            game.computer.AiAction();
        }
        else if (this.player == PLAYER.COMPUTER)
        {
            this.player = PLAYER.HUMAN
        }
    }

     /** 设置落子数据*/
    public PlayChess(player:number,x:number,y:number){
        if (game.chessBoard[x][y]!= 0)
        {
            return
        }else{
             if(this.player == PLAYER.HUMAN)
            {
                game.chessBoard[x][y] = 1
                //game.computer.currentDepth = game.computer.currentDepth + 1
            }
            else if (this.player == PLAYER.COMPUTER)
            {
                game.chessBoard[x][y] = -1
                console.log("x:"+x+" y:"+y+" "+game.chessBoard[x][y] )
               //game.computer.currentDepth = game.computer.currentDepth + 1
            }
             game.battleView.DrawChessboard(DRAW.LABEL,x,y,player);
             this.ChangePlayer()
        }
    }

     /**判断终局*/
    public IsEnd(chessBoard:number[][]){
        let i = 0
        let j = 0
        let count:number = 0
        for(i = 0; i < this.num; i++) { //行
            count = 0;
            for(j = 0; j < this.num; j++)
                count = chessBoard[i][j] + count;
            if(count == 3 || count == -3){
                for(j = 0; j < this.num; j++) {
                    game.battleView.DrawChessboard(DRAW.END,i,j,null)
                }
            }
        }
        if(count == 3 || count == -3) return this.GameOver(count / 3);

        for(j = 0; j < this.num; j++) { //列
            count = 0;
            for(var k = 0; k < this.num; k++)
                count = chessBoard[k][j] + count;
                console.log("这里？？？？ x:"+k+" y:"+j+" c:"+count)
            if(count == 3 || count == -3){
                for(k = 0; k < this.num; k++) {
                    game.battleView.DrawChessboard(DRAW.END,k,j,null)
                }
            }
        }
        if(count == 3 || count == -3) return this.GameOver(count / 3);

        count = 0;
        count = chessBoard[0][0] + chessBoard[1][1] + chessBoard[2][2];
        if(count == 3 || count == -3){
            game.battleView.DrawChessboard(DRAW.END,0,0,null);
            game.battleView.DrawChessboard(DRAW.END,1,1,null);
            game.battleView.DrawChessboard(DRAW.END,2,2,null);
        }
        count = chessBoard[0][2] + chessBoard[1][1] + chessBoard[2][0];
        if(count == 3 || count == -3){
            game.battleView.DrawChessboard(DRAW.END,0,2,null);
            game.battleView.DrawChessboard(DRAW.END,1,1,null);
            game.battleView.DrawChessboard(DRAW.END,2,0,null);
        }

        if(count == 3 || count == -3){
            return this.GameOver(count / 3) 
        }else{
            for(i = 0;i<3;i++){
                for(j=0;j<3;j++){
                    if(chessBoard[i][j] == 0) return
                }
            }
            this.GameOver(2)
        }
    }

     /** 游戏结束*/
    protected GameOver(player:number){  
            game.battleView.SetGameEnd(player)
      
    }

     /**游戏重置*/
    public Reset(){
        for(var i = 0;i<3;i++){
            for(var j = 0;j<3;j++) {
                game.chessBoard[i][j] = 0;
                game.battleView.DrawChessboard(DRAW.RESET,i,j,null)
            }
        }
        game.battleView.SetGameReset()
        game.gameFlow.player = PLAYER.COMPUTER
        game.computer.AiAction()
    }
}


