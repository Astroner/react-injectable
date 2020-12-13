#### Injectables (DI/IoC) for React

---
##### Includes:
 - Injectable - abstract class for injectable creation
 - useInjector - getter hook for an Injectable
 - InjectableProvider - IoC container/provider
 - OnInit - lifecicle onInit hook

---
##### Injectable creation
```ts
export class TestService extends Injectable<{ counter: number }> {
    getDefaultState(){
        return {
            counter: 0
        }
    }

    increment(){
        this.setState(prev => ({
            counter: prev.counter + 1
        }))
    }
}
```
##### Injectable usage
```tsx
// initialization

render(
    <InjectableProvider inject={[TestService, SecondService]}>
        <App />
    </InjectableProvider>
)

// react flow usage
const App = () => {

    const [state, counter] = useInjector(TestService)

    return (
        <div onClick={() => counter.increment()}>
            {state.counter}
        </div>
    )
}

// usage in an injectable
class SecondService extends Injectable implements OnInit{
    getDefaultState(){}

    onInit(){
        this.getInjection(TestService)
            .asObservable()
            .pipe(
                take(12)
            )
            .subscribe(console.log)
    }

}

```