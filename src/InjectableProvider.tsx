import { FC, useMemo } from 'react';
import * as React from 'react';

import { Injectable } from './Injectable';
import { InjectableContext, IInjectableContext } from './InjectableContext';
import { OnInit } from './lifecicle';

import { InjectableConstructor } from "./types";

export interface IInjectableProvider {
    inject: Array<
        | InjectableConstructor<Injectable<any>>
        | {
            getValue: () => Injectable<any>
        }
    >
}

const InjectableProvider: FC<IInjectableProvider> = props => {

    const value = useMemo<IInjectableContext>(() => {

        const map: Map<InjectableConstructor<any>, Injectable<any> & Partial<OnInit>> = new Map();

        for (const base of props.inject) {
            const value = base instanceof Function ? new base() : base.getValue();

            map.set(value.constructor as any, value)
        }

        for (const instance of map.values()) {
            instance._bind(map, instance.getDefaultState())
        }
        for (const instance of map.values()) {
            instance.onInit && instance.onInit();
        }

        return {
            map
        }
        // eslint-disable-next-line
    }, [])

    return (
        <InjectableContext.Provider value={value}>
            {props.children}
        </InjectableContext.Provider>
    )
}

export default InjectableProvider