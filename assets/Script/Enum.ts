import { _decorator, Component, Node } from 'cc';

/** 
 * 玩家阵营枚举
 */
export enum PLAYER{
        HUMAN = 1,
        COMPUTER = -1,
    }

/** 
 * 界面绘制指令枚举
 */
export enum DRAW{
    LABEL = 0,
    END = 1,
    RESET = 2,

}
