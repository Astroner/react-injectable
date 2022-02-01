import { useContext, useEffect, useMemo, useState } from "react"
import { Injectable } from "./Injectable";
import { InjectableContext } from "./InjectableContext"
import { InjectableConstructor } from "./types"

type RT<T extends Injectable<any>> = [ReturnType<T["getState"]>, T] & {
    state: ReturnType<T["getState"]>,
    service: T
}

export const useInjector = <T extends Injectable<any>>(toGet: InjectableConstructor<T>): RT<T> => {
    const ctx = useContext(InjectableContext);

    const service = useMemo(() => {
        return ctx.map.get(toGet);
    }, [ctx, toGet])

    const [value, setValue] = useState<ReturnType<T["getState"]>>(() => {
        return service.getState();   
    })

    const result = useMemo<RT<T>>(() => {
        return Object.assign(
            [value, service] as any,
            {
                state: value,
                service
            }
        )
    }, [value, service])

    useEffect(() => {
        const sub = service.subscribe(value => {
            setValue(value)
        })
        return () => sub.unsubscribe();
    }, [service])

    return result
}