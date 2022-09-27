export const correctValues: {key: string, value: any, ttl?: number}[] = [{
    key: 'test1',
    value: 'test1'
},{
    key: 'test2',
    value: {foo: 'foo', bar: 123},
    ttl: 100
}]

export const incorrectValues: {key: string, value: any, ttl?: number}[] = [{
    key: 'test3',
    value: 2n
}]