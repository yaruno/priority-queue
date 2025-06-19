// priority queue is a sorted double linked list with a priority and value
// the priority is the order of the node in the list
// the node with the highest priority is the first node in the list
// the node with the lowest priority is the last node in the list


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
    public add(value: any, priority: number): number {
        const newNode = new Node(value, priority);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this.queueSize++;

        } else {    // one or multiple nodes in queue with same or different priorities
            // go through list find a position where the priority of node is higher than
            // the node we want to add

            let pointer: Node | null = this.head
            //we want to add 3, queue is [10,5,2,1], smallest priority is the most important one
            //we want to add 20, queue is [10,5,3,2,1]
            //queue is now [20,10,3,2,1]
            //we can also have multiple same priority messages in queue
            //we want to add 3, queue is [20,10,3,2,1]
            //queue should be now [20,10,3*,3,2,1] three gets added to 'end' of 3 priority

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
                    pointer = pointer.getNext()
                }
            }

            return this.queueSize;
        }
    }

    public peek(): Node | null {
        return this.tail;
    }

    public queueLength(): number {
        return this.queueSize;
    }
    //removing from the end of the priority queue i.e. the most important message
    //might be better to just get the value and priority when popping here
    //end user will probably not care of the underlying data structure
    public pop(): PriorityQueueItem<any> | null {
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

        //move tail pointer to one backwards
        //return the tail node
        //adjust queue size by 1
        //if queue is empty return null
    }
    // remove
    // peek
    // queue length
    // reset/destroy
}