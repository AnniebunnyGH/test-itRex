import { IQueueItem } from "#modules/queue/interfaces/IQueueItem"

export const correctItems: IQueueItem[] = ['test1','test2','test3']
export const incorrrectItems: any[] = [0, '', null, undefined, [], {}, () => {}]