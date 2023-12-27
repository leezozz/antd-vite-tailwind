import { useEffect } from 'react'

/**
 * 事件总线 跨组件调用
 */
export const useEventBusSubscription = (eventName: string, callback: (...args: any[]) => any) => {
  useEffect(() => {
    // 组件挂载时订阅
    window.EventBus.subscribe(eventName, callback)

    // 组件销毁时取消订阅
    return () => {
      window.EventBus.unsubscribe(eventName, callback)
    }
  }, [eventName, callback])
}