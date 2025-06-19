import { PriorityQueue } from '../index';

describe('PriorityQueue', () => {
    let queue: PriorityQueue;

    beforeEach(() => {
        queue = new PriorityQueue();
    });

    describe('add', () => {
        test('should add element to queue', () => {
            queue.add(1, 1);
            expect(queue.queueLength()).toBe(1);
            queue.add(2, 2);
            expect(queue.queueLength()).toBe(2);
            queue.add(3, 3);
            expect(queue.queueLength()).toBe(3);
            queue.add(1337, 2);
            expect(queue.queueLength()).toBe(4);
            queue.add(333, 2);
            expect(queue.queueLength()).toBe(5);
        });
        test('should be able to add any datatype as value to queue', () => {
            queue.add("string data", 1);
            expect(queue.queueLength()).toBe(1);
            queue.add({ json: "data" }, 2);
            expect(queue.queueLength()).toBe(2);
            queue.add(new Uint8Array([0, 1, 2, 3, 4, 5]), 3);
            expect(queue.queueLength()).toBe(3);
        });
    });

    describe('pop', () => {
        test('should remove highest priority element', () => {
            queue.add(1, 1);
            const result = queue.pop()
            expect(result).not.toBeNull();
            if (result) {
                const { value, priority } = result;
                expect(value).toBe(1);
                expect(priority).toBe(1);
            }
            expect(queue.queueLength()).toBe(0);
        });
    });

    describe('peek', () => {
        test('should return highest priority element without removing', () => {
            // TODO: Implement test
        });
    });

    describe('size', () => {
        test('should return correct queue size', () => {
            queue.add("string data", 1);
            expect(queue.queueLength()).toBe(1);
            queue.pop()
            expect(queue.queueLength()).toBe(0);
            queue.pop()
            expect(queue.queueLength()).toBe(0);
        });
    });
}); 