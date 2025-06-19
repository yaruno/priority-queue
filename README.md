# Priority Queue Implementation

A TypeScript implementation of a priority queue using a doubly-linked list data structure.

## Overview

This priority queue is implemented as a sorted doubly-linked list where each node contains a value and a priority number. The queue maintains the following ordering:

- **Lower priority numbers** are positioned at the **back** of the queue (processed first)
- **Higher priority numbers** are positioned at the **front** of the queue (processed later)
- Items with the **same priority** are grouped together
- Items added with **same priority** are added to the end of their priority group

## How It Works

### Data Structure

The priority queue consists of:
- **Node**: Each node contains a value, priority number, and references to the next and previous nodes
- **Head**: Points to the item that will be processed **last** (highest priority number, front of queue)
- **Tail**: Points to the item that will be processed **first** (lowest priority number, back of queue)
- **Queue Size**: Tracks the total number of items

### Priority System

- **Lower numbers = Higher priority** (processed first)
- **Higher numbers = Lower priority** (processed later)
- Items with priority 1 will be processed before items with priority 10
- Items with the same priority are grouped together 

### Core Operations

#### 1. Adding Items (`add(value, priority)`)

The `add` method inserts items in the correct position based on priority:

1. **Empty Queue**: If the queue is empty, the new node becomes both head and tail
2. **Lower Priority**: If the new item has lower priority than the head, it's inserted at the front
3. **Higher/Equal Priority**: The method traverses the list to find the correct insertion point:
   - **Same Priority**: Inserts at the end of existing items with the same priority
   - **Higher Priority**: Inserts before items with higher priority
   - **End of Queue**: If all existing items have lower priority, adds to the end

**Example:**
```typescript
// Starting queue: [1, 2, 5, 10] (1 is highest priority, 10 is lowest)
queue.add("task3", 3);  // Result: [1, 2, 3, 5, 10]
queue.add("task0", 0);  // Result: [0, 1, 2, 3, 5, 10]
queue.add("task3b", 3); // Result: [0, 1, 2, 3, 3, 5, 10]
```

#### 2. Removing Items (`pop()`)

The `pop` method removes and returns the **highest priority** item (from the tail):

1. Returns the item at the tail (lowest priority number = highest importance)
2. Updates the tail pointer to the previous node
3. Decrements the queue size
4. Returns `null` if the queue is empty

**Example:**
```typescript
// Queue: [0, 1, 2, 3, 3, 5, 10]
const item = queue.pop(); // Returns item with priority 0 (highest importance)
// Queue: [1, 2, 3, 3, 5, 10]
```

#### 3. Peeking (`peek()`)

The `peek` method returns the highest priority item without removing it:

- Returns the item at the tail (lowest priority number = highest importance)
- Returns `null` if the queue is empty

#### 4. Queue Information (`queueLength()`)

Returns the current number of items in the queue.

## Usage Example

```typescript
import { PriorityQueue } from './src/index';

const queue = new PriorityQueue();

// Add items with different priorities
queue.add("Urgent task", 1);      // Highest priority (processed first)
queue.add("Normal task", 5);      // Medium priority
queue.add("Low priority task", 10); // Lowest priority (processed last)

console.log(queue.queueLength()); // 3

// Peek at the highest priority item
const nextItem = queue.peek(); // { value: "Urgent task", priority: 1 }

// Remove and process the highest priority item
const processed = queue.pop(); // { value: "Urgent task", priority: 1 }
console.log(queue.queueLength()); // 2
```

## Time Complexity

- **Add**: O(n) - May need to traverse the entire list to find insertion point
- **Pop**: O(1) - Direct access to tail
- **Peek**: O(1) - Direct access to tail
- **Queue Length**: O(1) - Stored as a property

## Key Features

- **Type Safety**: Written in TypeScript with proper type definitions
- **Flexible Values**: Supports any data type for values
- **Priority Grouping**: Items with the same priority are grouped together
- **Memory Efficient**: Uses doubly-linked list for O(1) removal operations
- **Simple Interface**: Clean API with intuitive method names

## Implementation Notes

- The queue uses a **min-heap-like** ordering where lower numbers represent higher priority
- Items are removed from the **tail** (lowest priority number = highest importance)
- The implementation maintains proper doubly-linked list connections
- All operations handle edge cases (empty queue, single item, etc.)