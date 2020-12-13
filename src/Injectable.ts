import { BehaviorSubject } from "rxjs";
import { InjectableConstructor } from "./types";

type Setter<Value> = (prev: Value) => Value

export abstract class Injectable<StoreType = void> {

    abstract getDefaultState(): StoreType

    private subj: BehaviorSubject<StoreType>;

    private isBinded = false

    private injectablesMap: Record<string, Injectable<any>> = {};

    subscribe(...args: Parameters<BehaviorSubject<StoreType>["subscribe"]>){
        return this.subj.subscribe(...args)
    }

    getState(){
        return this.subj.getValue();
    }

    _bind(map: Record<string, Injectable<any>>, initValue: StoreType){
        this.isBinded = true;
        this.injectablesMap = map;
        this.subj = new BehaviorSubject(initValue)
    }
    
    asObservable(){
        return this.subj.asObservable();
    }

    protected getInjection<T extends Injectable<any>>(target: InjectableConstructor<T>){
        return this.injectablesMap[target.name] as T
    }

    protected setState(next: StoreType | Setter<StoreType>) {
        if(next instanceof Function) {
            this.subj.next(next(this.subj.getValue()))
        }else{
            this.subj.next(next)
        }
    }

}