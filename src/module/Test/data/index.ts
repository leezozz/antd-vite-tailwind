import { faker } from "@faker-js/faker"

export const mockItems = () => {
  console.log('模拟数据')
  return {
    key: faker.string.uuid(),
    href: faker.string.uuid(),
    title: faker.internet.userName()
  }
}
