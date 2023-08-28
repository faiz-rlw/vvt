/**
 * @description 实现一个类型里指定部分变量可选
 * @access
 * interface User { name: string, id: number,age: number };
 * let user = Optional<User, 'name' | 'age'>;
 * user的类型就是name、age为可选，id为必选;
 */
declare type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
