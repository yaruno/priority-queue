class Node {
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

interface PriorityQueueItem<T> {
    value: T;
    priority: number;
}

export class PriorityQueue {
    private head: Node | null;
    private tail: Node | null;
    private queueSize: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.queueSize = 0;
    }
    //return queue size for now
    public enqueue(value: any, priority: number): number {
        const newNode = new Node(value, priority);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this.queueSize++;

        } else {

            let pointer: Node | null = this.head

            //if new node has greater priority number than the head of the queue
            //then add it to the beginning of the queue
            if (newNode.getPriority() > pointer.getPriority()) {
                pointer.setPrev(newNode)
                newNode.setNext(pointer)
                this.head = newNode
                this.queueSize++
            }

            //find first priority node that has the same or smaller value
            else {
                while (pointer != null && pointer.getPriority() >= newNode.getPriority()) {
                    if (pointer.getNext() == null) { //we got to end of queue, the rest of priorities had higher values 
                        pointer.setNext(newNode)
                        newNode.setPrev(pointer)
                        this.tail = newNode
                        this.queueSize++;
                        break
                    }

                    //if current node is equal to current priority
                    //add between the nodes in priority queu
                    if (pointer.getPriority() == newNode.getPriority()) {
                        let temp = pointer
                        let prev = pointer.getPrev()
                        prev?.setNext(newNode)
                        temp.setPrev(newNode)
                        newNode.setNext(temp)
                        newNode.setPrev(prev)
                        this.queueSize++;
                        break
                    }

                    let next = pointer.getNext()
                    //if next from pointer has smaller value than the current one, we should place to node between them
                    if (next != null) {
                        if (next.getPriority() < newNode.getPriority()) {
                            let temp = pointer
                            //let next = pointer.getNext()
                            temp.setNext(newNode)
                            next?.setPrev(newNode)
                            newNode.setPrev(temp)
                            newNode.setNext(next)
                            this.queueSize++;
                            break;

                        }
                    }
                    pointer = pointer.getNext()
                }
            }
            return this.queueSize;
        }
    }

    public peek(): PriorityQueueItem<any> | null {
        if (this.tail !== null) {
            return {
                value: this.tail.getValue(),
                priority: this.tail.getPriority()
            }
        }

        return null;
    }

    public size(): number {
        return this.queueSize;
    }

    public dequeue(): PriorityQueueItem<any> | null {
        let temp = null
        if (this.tail != null) {
            temp = this.tail
            this.tail = this.tail.getPrev()
            if (this.tail?.getNext()) {
                this.tail.setNext(null)
            }
            this.queueSize--;
            return {
                value: temp.getValue(),
                priority: temp.getPriority()
            }
        }
        return null;
    }
}