import { PriorityQueue } from '../index';

describe('PriorityQueue', () => {
    let queue: PriorityQueue;

    beforeEach(() => {
        queue = new PriorityQueue();
    });

    describe('add', () => {
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
}); 