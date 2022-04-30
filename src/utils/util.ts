
interface itemDto {
    [name: string]: any
}

/**
 * @description 查询数据里的某个值与指定值相同，返回所对应的值（所在的对象）
 * @param key 需要判断的key
 * @param itemArr 需要查询的数组
 * @param searchKey 查询数组里被判断的键名
 * @param searchList 向下查询的数据
 * @returns 
 */
export const findItem = (key: any, itemArr: Array<itemDto>, searchKey: string = 'path', searchList: string = 'children') => {
    let result = {};
    itemArr.some(item => {
        if (key === item[searchKey]) {
            result = item
            return true
        }
        else if (item[searchList]) {
            result = findItem(key, item[searchList])
        }
    })
    return result
}