/* eslint-disable */
class EventBus {
  constructor() {
    this.subIds = 0;
    this.subscriptions = {};
  }

  subscribe(topic, fn) {
    if (!this.subscriptions[topic]) this.subscriptions[topic] = {};
    const token = ++this.subIds;
    this.subscriptions[topic][token] = fn;

    return () => this.unsubscribe(topic, token);
  }

  publish(topic, ...args) {
    const subs = this.subscriptions[topic];
    if (!subs) return false;
    Object.values(subs).forEach(sub => sub(...args));
  }

  unsubscribe(topic, token) {
    if (!token) delete this.subscriptions[topic];
    this.subscriptions[topic] && (delete this.subscriptions[topic][token]);
  }
}

window.EventBus = new EventBus();
export default window.EventBus;
