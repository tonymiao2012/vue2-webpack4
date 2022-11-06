import { Observable,
         interval,
         take,
         Subject,
         BehaviorSubject,
         ReplaySubject,
         AsyncSubject,
         of,
         connect,
} from 'rxjs';

// main observable
const observable = new Observable(observer => {
    console.log('-------begin------')
    observer.next('get1')
    setTimeout(() => {
        observer.next('get2')
    }, 1000);
    console.log('-------end------')
})

const executeRxSubscription = () => {
    const subscription = observable.subscribe((onNext, onError, onCompleted) => {
        if (onNext) {
            console.log(onNext) // text value
        }
    })
    // 可以取消subscribe
    return { unsubscribe: subscription.unsubscribe }
}

const executeRxSubject = () => {
    // 两个观察者，订阅了同一个源
    const source = interval(1000).pipe(take(3))

    // subject to A
    source.subscribe((value) => console.log('A' + value))

    setTimeout(() => {
        // subject to B
        source.subscribe((value) => console.log('B' + value))
    }, 1000);
}

const executeRxBroadcast = () => {
    const source = interval(1000).pipe(take(3))

    const subject = {
        observers: [],
        subscribe(target) {
            this.observers.push(target)
        },
        next: function(value) {
            this.observers.forEach((next) => next(value))
        }
    }

    source.subscribe(subject)

    subject.subscribe(value => console.log('A ' + value))

    setTimeout(() => {
        // subject to B
        source.subscribe((value) => console.log('B ' + value))
    }, 1000);
}

const executeRxBroadcastWithSubject = () => {
    const source = interval(1000).pipe(take(3))

    const subject = new Subject()

    source.subscribe(subject)

    subject.subscribe((value) => console.log('A ' + value))

    setTimeout(() => {
        subject.subscribe((value) => console.log('B ' + value))
    }, 1000);
}

const executeBehaviorSubject = () => {
    const subject = new BehaviorSubject(0)  // 需要传入初始值

    subject.subscribe(value => console.log('A: ' + value))
    subject.next(1)
    subject.next(2)

    setTimeout(() => {
        subject.subscribe(value => console.log('B: ' + value))
    }, 1000)
}

const executeReplaySubject = () => {
    const subject = new ReplaySubject(2) // 需要传入回放次数

    subject.next(0)
    subject.next(1)
    subject.next(2)

    subject.subscribe(value => console.log('A: ', value))

    subject.next(3)
    subject.next(4)

    setTimeout(() => {
        subject.subscribe(value => console.log('B: ', value))
    }, 1000);
}

const executeAsyncSubject = () => {
    const subject = new AsyncSubject()
    
    subject.next(1)
    subject.subscribe(res => {
        console.log('A:' + res);
    })

    subject.next(2)
    subject.subscribe(res => {
        console.log('B:' + res);
    })

    subject.next(3)
    subject.subscribe(res => {
        console.log('C:' + res);
    })

    subject.complete()
    subject.next(4)
}

// TODO: 此处multicast方法已经弃用。后续例子再补充
const executeHotObservables = () => {
    const source = of(1, 2)
    source.pipe(connect())

    source.subscribe((value) => console.log('A：' + value))
    setTimeout(() => {
        source.subscribe((value) => console.log('B：' + value))
    }, 1000)
}



export default {
    executeRxSubscription,
    executeRxSubject,
    executeRxBroadcast,
    executeRxBroadcastWithSubject,
    executeBehaviorSubject,
    executeReplaySubject,
    executeAsyncSubject,
    executeHotObservables
}




