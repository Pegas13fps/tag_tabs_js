export default class Component {
    constructor({ element }) {
        this._element = element;
        this._callbackMap = {};
    }

    on(eventName, selector, callback) {
        this._element.addEventListener(eventName, (event) => {
            const delegatedTarget = event.target.closest(selector);
            if (!delegatedTarget) { return }
            callback(event);
        })
    }

    subscribe(eventName, callback) {
        if (!this._callbackMap[eventName]) {
            this._callbackMap[eventName] = [];
        }
        this._callbackMap[eventName].push(callback);
    }

    emit(eventName, eventData) {
        const callbacks = this._callbackMap[eventName];
        if (!callbacks) {
            return;
        }
        callbacks.forEach((callback) => {
            callback(eventData);
        })
    }
}