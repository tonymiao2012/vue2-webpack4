import { Observable, interval, take, Subject } from 'rxjs';

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


export default {
    executeRxSubscription,
    executeRxSubject,
    executeRxBroadcast,
    executeRxBroadcastWithSubject
}




