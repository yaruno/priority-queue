export class Node {
    private value: any;
    private priority: number;   //the higher the number, the higher the priority
    private next: Node | null;
    private prev: Node | null;

    constructor(value: any, priority: number) {
        this.value = value;
        this.priority = priority;
        this.next = null;
        this.prev = null;
    }

    public setNext(next: Node | null) {
        this.next = next;
    }

    public setPrev(prev: Node | null) {
        this.prev = prev;
    }

    public getNext(): Node | null {
        return this.next;
    }
    public getPrev(): Node | null {
        return this.prev;
    }

    public getValue(): any {
        return this.value;
    }

    public getPriority(): number {
        return this.priority;
    }
}