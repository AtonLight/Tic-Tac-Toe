import { _decorator, Component, Node } from 'cc';
import {game} from './GameLogic';
import {gameFlow} from "./GameFlow";
import { computer } from './Computer';
import { BattleView } from './BattleView';
import { PLAYER } from './Enum';
const { ccclass, property } = _decorator;

/** 
 * 程序入口
 */
@ccclass('Main')
export class Main extends Component {
    onLoad(){
        //加载模块
        game.chessBoard = [[0,0,0],[0,0,0],[0,0,0]];
        game.computer = new computer();
        game.gameFlow = new gameFlow();
        game.battleView = this.node.getComponent(BattleView);
    }
    start() {
        //开始游戏
      game.gameFlow.Reset()
    }

    update(deltaTime: number) {
        
    }
}


