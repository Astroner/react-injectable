import * as React from 'react';
import { useInjector } from '../src';
import { TestService } from './services/TestService';
import { TitleService } from './services/TitleService';

export interface IApp {
    
}

const App: React.FC<IApp> = props => {

    const [counter, test] = useInjector(TestService);

    const { service: title } = useInjector(TitleService)

    React.useEffect(() => title.setTitle("HOPE"), [])

    return (
        <div onClick={() => test.increment()}>
            {counter}
        </div>
    )
}

export default App