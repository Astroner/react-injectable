import { createContext } from "react";
import { Injectable } from "./Injectable";
import { InjectableConstructor } from "./types";

export interface IInjectableContext {
    map: Map<InjectableConstructor<any>, Injectable<any>>
}

export const InjectableContext = createContext<IInjectableContext>({
    map: new Map()
})