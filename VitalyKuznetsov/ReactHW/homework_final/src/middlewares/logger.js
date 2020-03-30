export function loggerMiddleware(store) { //первая функция это обёртка
    return function wrapDispatcher(next) { // next ссылка на слующий middleware или если нет middleware, то вызовет reducer
        return function dispatchAndLog(action) {
            console.log('Log Action', action);
            console.log('prevState', store.getState());
            //calling reducer
            const result = next(action);
            console.log('nextState', store.getState());
            console.log('result', result);
            return result;
        }
    }
}