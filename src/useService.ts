import { useContext, useMemo } from "react"
import { Injectable } from "./Injectable";
import { InjectableContext } from "./InjectableContext"
import { InjectableConstructor } from "./types"

export const useService = <T extends Injectable<any>>(toGet: InjectableConstructor<T>): T => {
    const ctx = useContext(InjectableContext);

    const service = useMemo(() => {
        return ctx.map.get(toGet);
    }, [ctx, toGet])

    return service as T;
}