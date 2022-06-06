import { defaultCompare } from "./compare";
import { compare, element, elements, positionType } from "./type";

class DwayHeap {
  branchFactor: number;
  elements: elements;
  positions: positionType;
  compare: compare;

  constructor(
    intialElements: elements = [],
    branchFactor: number = 2,
    compare: compare = defaultCompare
  ) {
    this.branchFactor = branchFactor;
    this.elements = [] as elements;
    this.positions = new Map() as positionType;
    this.compare = compare;

    this.heapify(intialElements);
  }

  // defining functions

  get size() {
    return this.elements.length;
  }

  setElementToPositon(element: element, index: number, oldIndex?: number) {
    if (!this.positions.has(element.priority)) {
      this.positions.set(element.priority, [index]);
    } else {
      if (oldIndex) {
        const prevIndex = this.positions
          .get(element.priority)
          ?.indexOf(oldIndex);
        if (prevIndex && prevIndex >= 0) {
          this.positions.get(element.priority)?.splice(prevIndex, 1);
        }
      }
      this.positions.get(element.priority)?.push(index);
    }
    this.elements[index] = element;
  }

  removeElementPosition(index: number, splice: boolean) {
    const elementToRemove = this.elements[index];

    const i = this.positions.get(elementToRemove.priority)?.indexOf(index);

    if (i && i >= 0) {
      this.positions.get(elementToRemove.priority)?.splice(i, 1);
    }

    if (splice) {
      this.elements.splice(index, 1);
    }

    return elementToRemove;
  }

  getElementFromPosition(element: element) {
    if (
      this.positions.has(element.priority) &&
      this.positions.get(element.priority)!.length > 0
    ) {
      return this.positions.get(element.priority);
    } else return null;
  }

  bubbleUp(index: number) {
    const current = this.elements[index];
    let i = index;

    while (i > 0) {
      const parentIndex = Math.floor((i - 1) / this.branchFactor);
      if (
        this.compare(current.priority, this.elements[parentIndex].priority) < 0
      ) {
        this.setElementToPositon(this.elements[parentIndex], i, parentIndex);
        i = parentIndex;
      } else break;
    }

    if (i !== index) {
      this.setElementToPositon(current, i, index);
    }

    return i;
  }

  pushDown(index: number) {
    const current = this.elements[index];
    let parentIndex = index;
    const len = this.size;

    let smallestChildIndex = index * this.branchFactor + 1;
    while (smallestChildIndex < len) {
      let smallestChild = this.elements[smallestChildIndex];
      const n = Math.min(len, smallestChildIndex + this.branchFactor);

      for (let i = smallestChildIndex + 1; i < n; i++) {
        if (
          this.compare(smallestChild.priority, this.elements[i].priority) > 0
        ) {
          smallestChildIndex = i;
          smallestChild = this.elements[i];
        }

        if (this.compare(smallestChild.priority, current.priority) < 0) {
          this.setElementToPositon(
            smallestChild,
            parentIndex,
            smallestChildIndex
          );
          parentIndex = smallestChildIndex;
          smallestChildIndex = parentIndex * this.branchFactor + 1;
        } else {
          break;
        }
      }
    }

    if (parentIndex !== index) {
      this.setElementToPositon(current, parentIndex, index);
    }
    return parentIndex;
  }

  heapify(intialElements: elements) {
    const len = intialElements.length;

    for (let i = 0; i < len; i++) {
      this.elements.push(intialElements[i]);
    }

    const innerNodeIndex = Math.floor((len - 1) / this.branchFactor);

    for (let i = innerNodeIndex; i >= 0; i--) {
      this.pushDown(i);
    }
  }

  preview() {
    console.log(this.elements);
    console.log(this.positions);
  }

  contains(element: element) {
    const ps = this.positions.get(element.priority);

    if (ps !== undefined && ps.length > 0) {
      return true;
    } else
      throw new Error(
        `item with the task: ${element.task} and priority: ${element.task} not found`
      );
  }

  insert(element: element) {
    const len = this.size;
    this.setElementToPositon(element, len);
    this.bubbleUp(len);
  }

  isEmpty() {
    return this.size === 0;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("No elements in the heap.");
    } else return this.elements[0];
  }

  top() {
    const len = this.size;

    switch (len) {
      case 0:
        throw new Error("No items in the heap");
      case 1:
        return this.removeElementPosition(0, true);
      default:
        const topElement = this.removeElementPosition(0, false);
        let elementLast = this.removeElementPosition(len - 1, true);
        this.setElementToPositon(elementLast, 0, len - 1);
        this.pushDown(0);

        return topElement;
    }
  }

  updatePriority(oldTask: element, newValue: number) {
    const compareResult = this.compare(newValue, oldTask.priority);
    const len = this.size;

    if (!this.contains(oldTask)) {
      throw new RangeError(
        `Buddy you sure you had any item with task: ${oldTask.task} and priority: ${oldTask.priority}`
      );
    }

    let indices = this.getElementFromPosition(oldTask);

    if (indices) {
      for (let i of indices) {
        if (i < 0 || i > len) {
          throw new RangeError("Bruh! out of bound");
        }

        this.setElementToPositon({ task: oldTask.task, priority: newValue }, i);
      }
      if (compareResult < 0) {
        indices = indices.sort((x: number, y: number) => x - y);

        for (let i of indices) {
          this.bubbleUp(i);
        }
      } else if (compareResult > 0) {
        indices = indices.sort((x: number, y: number) => y - x);

        for (let i of indices) {
          this.pushDown(i);
        }
      }
    }
  }
}

export default DwayHeap;
