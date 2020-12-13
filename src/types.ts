import { Injectable } from "./Injectable";

export interface InjectableConstructor<Type extends Injectable<any>> {
    new (): Type
}