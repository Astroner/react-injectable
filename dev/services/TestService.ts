import { Injectable } from "../../src";
import { TitleService } from "./TitleService";

export class TestService extends Injectable<number> {
    getDefaultState() {
        return 0
    }
    increment(){
        this.setState(p => p + 1)
        this.getInjection(TitleService).setTitle("Count: " + this.getState())
    }
}