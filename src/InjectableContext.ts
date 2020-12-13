import { createContext } from "react";
import { Injectable } from "./Injectable";

export interface IInjectableContext {
    map: Record<string, Injectable<any>>
}

export const InjectableContext = createContext<IInjectableContext>({
    map: {}
})