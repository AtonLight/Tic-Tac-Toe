import { _decorator, Component, Node } from 'cc';
import {gameFlow} from "./GameFlow";
import { computer } from './Computer';
import { BattleView } from './BattleView';

/** 
 * 框架模块，存放有全局变量，方便业务模块调用
 */
export class game  {
    static   chessBoard:number[][] ;
    static   gameFlow:gameFlow;
    static   computer:computer;
    static   battleView:BattleView;
}


