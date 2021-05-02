export type Player = string;
export type Score  = number;
export type Game = number;
export type Deuce = number;
export type Tie = number;

export enum ScoreHandler {
    Point,
    Deuce,
    TieBreak
}