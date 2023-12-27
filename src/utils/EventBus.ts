function PubSub(){
  this.subs = {}
}

PubSub.prototype.subscribe = function (type: string | number, callback: any) {
  if (!this.subs[type]) {
    this.subs[type] = []
  }

  if (!this.subs[type].includes(callback)) {
    this.subs[type].push(callback)
  }
}

PubSub.prototype.unsubscribe = function (type: string | number, callback: any) {
  // 恢复置空
  const index = this.subs[type].indexOf(callback)
  if (index > -1) {
    this.subs[type].splice(index, 1)
  }
}

PubSub.prototype.publish = function (type: string | number, ...messages: any[]) {
  const callbackList = this.subs[type]

  callbackList?.forEach((callback: (...args: any[]) => void) => {
    callback(...messages)
  })
}

export default PubSub