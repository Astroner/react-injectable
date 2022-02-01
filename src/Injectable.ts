import { BehaviorSubject } from "rxjs";
import { InjectableConstructor } from "./types";

type Setter<Value> = (prev: Value) => Value

export abstract class Injectable<StoreType = void> {

    abstract getDefaultState(): StoreType

    private subj: BehaviorSubject<StoreType>;

    private isBinded = false

    private injectablesMap: Map<InjectableConstructor<any>, Injectable<any>> = new Map();

    subscribe(...args: Parameters<BehaviorSubject<StoreType>["subscribe"]>){
        return this.subj.subscribe(...args)
    }

    getState(){
        return this.subj.getValue();
    }

    _bind(map: Map<InjectableConstructor<any>, Injectable<any>>, initValue: StoreType){
        this.isBinded = true;
        this.injectablesMap = map;
        this.subj = new BehaviorSubject(initValue)
    }
    
    asObservable(){
        return this.subj.asObservable();
    }

    protected getInjection<T extends Injectable<any>>(target: InjectableConstructor<T>){
        return this.injectablesMap.get(target) as T
    }

    protected setState(next: StoreType | Setter<StoreType>) {
        if(next instanceof Function) {
            this.subj.next(next(this.subj.getValue()))
        }else{
            this.subj.next(next)
        }
    }

}