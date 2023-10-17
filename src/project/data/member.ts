import { faker } from "@faker-js/faker";

export interface Member {
  name: string;
  id: string;
  title: string;
  department: string;
  email: string;
}

export const generateMockMembers = (count: number): Member[] => {
  return new Array(count).fill(null).map(() => ({
    name: faker.person.fullName(),
    id: faker.string.hexadecimal({ length: 4, prefix: "BJ" }),
    title: faker.string.fromCharacters(["业务初级", "业务中级", "业务高级"]),
    department: faker.commerce.department(),
    email: faker.internet.email(),
  }));
};
