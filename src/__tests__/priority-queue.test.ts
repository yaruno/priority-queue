import { PriorityQueue } from '../index';

describe('PriorityQueue', () => {
    let queue: PriorityQueue;

    beforeEach(() => {
        queue = new PriorityQueue();
    });

    describe('clear', () => {
        test('clearing the queue should make the queue empty', () => {
            queue.enqueue(1, 1);
            queue.clear()
            expect(queue.size()).toBe(0)
            expect(queue.dequeue()).toBeNull()
        })
    })

    describe('iterate', () => {
        //we'll return in order from highest important to lowest important
        test('should be able to iterate the queue', () => {
            queue.enqueue(2, 2);
            queue.enqueue(1, 1);
            const items = [...queue]
            const expect_array = [{ value: 1, priority: 1 }, { value: 2, priority: 2 }]
            expect(items).toStrictEqual(expect_array)
        })

        test('should be able to iterate the queue', () => {
            queue.enqueue(1, 1);
            queue.enqueue(2, 2);
            const items = [...queue]
            const expect_array = [{ value: 1, priority: 1 }, { value: 2, priority: 2 }]
            expect(items).toStrictEqual(expect_array)
        })

        test('should return and remove item from queue while adhering to priority order', () => {
            const expect_array = [{ value: 1, priority: 1 }, { value: 2, priority: 2 }, { value: 3, priority: 3 }]
            queue.enqueue(1, 1);
            queue.enqueue(2, 2);
            queue.enqueue(3, 3);

            const items = []
            for (const item of queue.drain()) {
                items.push(item)
            }
            expect(items).toStrictEqual(expect_array)
            expect(queue.size()).toBe(0)
        })
    })

    describe('add', () => {
        test('queue should have size 0 if empty', () => {
            expect(queue.size()).toBe(0)
        })
        test('should add element to queue', () => {
            queue.enqueue(1, 1);
            expect(queue.size()).toBe(1);
            queue.enqueue(2, 2);
            expect(queue.size()).toBe(2);
            queue.enqueue(3, 3);
            expect(queue.size()).toBe(3);
            queue.enqueue(1337, 2);
            expect(queue.size()).toBe(4);
            queue.enqueue(333, 2);
            expect(queue.size()).toBe(5);
        });
        test('should be able to add any datatype as value to queue', () => {
            queue.enqueue("string data", 1);
            expect(queue.size()).toBe(1);
            queue.enqueue({ json: "data" }, 2);
            expect(queue.size()).toBe(2);
            queue.enqueue(new Uint8Array([0, 1, 2, 3, 4, 5]), 3);
            expect(queue.size()).toBe(3);
        });
        test('should be able to add negative numbered priorities', () => {
            queue.enqueue(1, -1);
            queue.enqueue(2, -2);
            expect(queue.size()).toBe(2);
            const result = queue.peek();
            if (result) {
                const { value, priority } = result;
                expect(priority).toBe(-2);
                expect(value).toBe(2);
            }

            queue.enqueue(1.5, -1.5);
            expect(queue.size()).toBe(3);
        })
    });

    describe('dequeue', () => {
        test('should remove highest priority item', () => {
            queue.enqueue(1, 1);
            const result = queue.dequeue()
            expect(result).not.toBeNull();
            if (result) {
                const { value, priority } = result;
                expect(value).toBe(1);
                expect(priority).toBe(1);
            }
            expect(queue.size()).toBe(0);
        });
    });

    describe('peek', () => {
        test('should return highest priority item without removing the item from queue', () => {
            // TODO: Implement test
            queue.enqueue("string data", 1);
            const result = queue.peek()
            if (result) {
                const { value, priority } = result
                expect(value).toBe("string data")
                expect(priority).toBe(1)
            }
            queue.enqueue({ json: 123 }, 0);
            const result2 = queue.peek();
            if (result2) {
                const { value, priority } = result2
                expect(value.json).toBe(123);
                expect(priority).toBe(0);
            }
        });
    });

    describe('queue size', () => {
        test('should return correct queue size', () => {
            queue.enqueue("string data", 1);
            expect(queue.size()).toBe(1);
            const result = queue.dequeue()
            if (result) {
                const { value, priority } = result
                expect(value).toBe("string data")
                expect(priority).toBe(1)
            }
            expect(queue.size()).toBe(0);
            queue.dequeue()
            expect(queue.size()).toBe(0);
        });
    });

    describe('queue and dequeue', () => {
        test('should return priorities in right order', () => {
            //add, [0, 2, 1, -1, -2 , 0.2, -0.4]
            //enqueue should return in order of [-2, -1, -0.4, 0 , 0.2 , 1, 2]
            const expected_order = [-4, -2, -2, -1, -0.4, 0, 0.2, 1, 2, 5, 10]
            const insertion_order = [0, 2, 1, -1, -2, 5, 0.2, -0.4, -2, 10, -4]
            insertion_order.forEach(item => {
                queue.enqueue(item, item)   // lets just add same priority as value
            })
            const resultArr = []
            while (queue.size() != 0) {
                const result = queue.dequeue()
                if (result) {
                    const { priority } = result
                    resultArr.push(priority)
                }
            }

            expect(resultArr).toEqual(expected_order)

        })
    })
}); 