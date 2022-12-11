import { _decorator, Component, Node, Button, Label, Sprite, color } from 'cc';
import { PLAYER,DRAW} from './Enum';
import { game } from './GameLogic';
const { ccclass, property } = _decorator;

/** 
 * 战斗界面模块
 */
@ccclass('BattleView')
export class BattleView extends Component {
    btn:Node;
    start() {

    }

    update(deltaTime: number) {
        
    }

    //** 按钮事件 */
    public CBCallback(event: Event, data: string) {
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        console.log(data); // foobar
       if (data == 'CB_00')
        {
           game.gameFlow.PlayChess(PLAYER.HUMAN,0,0);
        }
        if (data == 'CB_01')
        {
           game.gameFlow.PlayChess(PLAYER.HUMAN,0,1);
        }
        if (data == 'CB_02')
        {
           game.gameFlow.PlayChess(PLAYER.HUMAN,0,2);
        }
        if (data == 'CB_10')
        {
           game.gameFlow.PlayChess(PLAYER.HUMAN,1,0);
        }
        if (data == 'CB_11')
        {
           game.gameFlow.PlayChess(PLAYER.HUMAN,1,1);
        }
        if (data == 'CB_12')
        {
           game.gameFlow.PlayChess(PLAYER.HUMAN,1,2);
        }
        if (data == 'CB_20')
        {
           game.gameFlow.PlayChess(PLAYER.HUMAN,2,0);
        }
        if (data == 'CB_21')
        {
           game.gameFlow.PlayChess(PLAYER.HUMAN,2,1);
        }
        if (data == 'CB_22')
        {
           game.gameFlow.PlayChess(PLAYER.HUMAN,2,2);
        }
    }

    /** 重置游戏按钮事件 */
    public BtnResetCallback(event: Event, data: string) {
        game.gameFlow.Reset()
    }

    /** 为Label赋值 */
    protected DrawLabel(player:number,text:Label)
    {
        if(player == PLAYER.HUMAN)
        {
            text.string = "O";
        }
        else
        {
            text.string = "X";
        }

    }

    /** 绘制按钮颜色 */
    protected DrawButton(draw:number,Button:Node){
        if(draw == DRAW.END){
            Button.getComponent(Sprite).color = color(82,82,82,255);
        }else if(draw == DRAW.RESET){
            Button.getComponent(Sprite).color = color(255,255,255,255);
            Button.getChildByName("Label").getComponent(Label).string = ""
        }
    }

    /** 绘制棋盘*/
    public DrawChessboard(draw:number,x:number,y:number,player:number)
    {
        if (x == 0)
        {
           if (y == 0)
           {
                this.btn = this.node.getChildByName("CB_00");
           }else if(y == 1 )
           { 
                this.btn = this.node.getChildByName("CB_01");
           }else if(y == 2 )
           {
                this.btn = this.node.getChildByName("CB_02");
           }
        }else if(x == 1)
        {
            if (y == 0)
            {
                this.btn = this.node.getChildByName("CB_10");
            }else if(y == 1 )
            {
                this.btn = this.node.getChildByName("CB_11");
            }else if(y == 2 )
            {
                this.btn = this.node.getChildByName("CB_12");
            }
        }else if(x == 2)
        {
            if (y == 0)
            {
                this.btn = this.node.getChildByName("CB_20");
            }else if(y == 1 )
            {
                this.btn = this.node.getChildByName("CB_21");
            }else if(y == 2 )
            {
                this.btn = this.node.getChildByName("CB_22");
            }
        }
        if (draw == DRAW.LABEL){
            this.DrawLabel(player,this.btn.getChildByName("Label").getComponent(Label));
        }else if(draw == DRAW.END || draw == DRAW.RESET){
            this.DrawButton(draw,this.btn);
        }

    }

    /** 游戏结束，绘制界面 */
    public SetGameEnd(player:number){
        if(player == PLAYER.HUMAN) {
            this.node.getChildByName("Title").getComponent(Label).string = "胜利！"
        }
        else if (player == PLAYER.COMPUTER){
            this.node.getChildByName("Title").getComponent(Label).string = "失败！"
        }
        else{
            this.node.getChildByName("Title").getComponent(Label).string = "平局！"
        }
        this.node.getChildByName("BtnReset").active = true
    }

     /** 游戏重置，绘制界面 */
    public SetGameReset(){
        this.node.getChildByName("Title").getComponent(Label).string = "井字棋"
        this.node.getChildByName("BtnReset").active = false
    }

}


