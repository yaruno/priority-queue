# Priority Queue with Explicit Priority Control
- Custom priority numbers - not just object properties
- Priority Queue That You Control - Not the library

A TypeScript implementation of a priority queue using a doubly-linked list data structure.

## Installation

```bash
npm install priority-queue
```

## Overview

This priority queue is implemented as a sorted doubly-linked list where each node contains a value of **any type** and a **priority number**. The queue maintains the following ordering:

- **Lower priority numbers** are positioned at the **back** of the queue (processed first)
- **Higher priority numbers** are positioned at the **front** of the queue (processed later)
- Items are removed from the back of the queue i.e. at the order of lowest priority number first
- Items with the **same priority** are grouped together following FIFO principle

## How It Works

### Core Operations

#### 1. Adding Items To Queue (`enqueue(value, priority)`)

The `enqueue` method inserts items in the correct position based on priority:

1. **Empty Queue**: If the queue is empty, the new item becomes the first item in queue
2. **Lower Priority**: If the new item has lower priority number than the last item in queue , it's inserted at the back of the queue
3. **Higher/Equal Priority**: The method traverses the list to find the correct insertion point:
   - **Same Priority**: Inserts at the end of existing items with the same priority
   - **Higher Priority**: Inserts before items with higher priority
   - **End of Queue**: If all existing items have lower priority, adds to the end

**Example:**
```typescript
// Starting queue: [10, 5, 2, 1] (1 is lowest priority number, 10 is highest priority number)
queue.enqueue("task3", 3);  // Queue state: [10, 5, 3, 2, 1] 
queue.enqueue("task0", 0);  // Queue state: [10, 5, 3, 2, 1, 0]
queue.enqueue("task3b", 3); // Queue state: [10, 5, 3*, 3, 2, 1, 0] 
```

#### 2. Removing Items (`dequeue()`)

The `pop` method removes and returns the **highest priority** item i.e. item with lowest priority number (from the tail):

1. Returns the value and proproty at the tail
2. Removes item from tail, updates queue size
4. Returns `null` if the queue is empty

**Example:**
```typescript
// Queue state: [10, 5, 3*, 3, 2, 1, 0]
const item = queue.dequeue(); // Returns item with priority 0 (highest importance)
// Queue: [1, 2, 3, 3, 5, 10]
```

#### 3. Peeking (`peek()`)

The `peek` method returns the highest priority item without removing it:

- Returns the item at the tail (lowest priority number = highest importance)
- Returns `null` if the queue is empty

#### 4. Queue Information (`size()`)

Returns the current number of items in the queue. Returns 0 if queue is empty.

## Usage Example

### CommonJS
```javascript
const { PriorityQueue } = require('priority-queue');

const queue = new PriorityQueue();

// Add items with different priorities
// Items can have any type, string, number, Uint8Array etc.
queue.enqueue("Urgent task", 1);              // Highest priority (processed first)
queue.enqueue({task: "Normal task"}, 5);      // Medium priority
queue.enqueue(new Uint8Array([0,1,2,3]), 10); // Lowest priority (processed last)

console.log(queue.size()); // 3

// Peek at the highest priority item
const nextItem = queue.peek(); // { value: "Urgent task", priority: 1 }

// Remove and process the highest priority item
const processed = queue.dequeue(); // { value: "Urgent task", priority: 1 }
console.log(queue.size()); // 2
```

### ES Modules
```javascript
import { PriorityQueue } from 'priority-queue';

const queue = new PriorityQueue();

// Add items with different priorities
queue.enqueue("Urgent task", 1);
queue.enqueue("Normal task", 5);
queue.enqueue("Low priority task", 10);

console.log(queue.size()); // 3
console.log(queue.peek()); // { value: "Urgent task", priority: 1 }
console.log(queue.dequeue()); // { value: "Urgent task", priority: 1 }
```

### TypeScript
```typescript
import { PriorityQueue, PriorityQueueItem } from 'priority-queue';

const queue = new PriorityQueue();

// Add items with different priorities
queue.enqueue("Urgent task", 1);
queue.enqueue("Normal task", 5);
queue.enqueue("Low priority task", 10);

// Type-safe operations
const nextItem: PriorityQueueItem<string> | null = queue.peek();
const processed: PriorityQueueItem<string> | null = queue.dequeue();
```

## Time Complexity

- **Add**: O(n) - May need to traverse the entire list to find insertion point
- **Pop**: O(1) - Direct access to tail
- **Peek**: O(1) - Direct access to tail
- **Queue Length**: O(1) - Stored as a property

## How This Compares to Other Priority Queues

Most popular npm priority queues (like `tinyqueue`, `fastpriorityqueue`, etc.) use **binary heaps**, where:

- You push values into a queue
- You can optionally provide a comparator
- The internal structure is a heap
- Items with the same priority may be returned in **any order**

### This Library Gives You More Control:

| Feature                          | This Library                        | Heap-Based Queues (e.g. TinyQueue) |
|----------------------------------|-------------------------------------|-------------------------------------|
| Data Structure                   | Doubly-linked list (sorted)         | Binary heap                         |
| Priority Assignment              | Explicit `priority` argument        | Comparator-based                    |
| Order Within Same Priority       | FIFO (insertion order preserved)    | Unpredictable                       |
| Sorting Behavior                 | Fully sorted internally             | Not sorted (heap structure only)    |
| Peek / Pop Complexity            | O(1)                                | O(log n)                            |
| Use Case                         | When exact ordering matters         | When only performance matters       |
