import { elements } from "./type";
import DwayHeap from "./heap";
export const KLargetElements = (elements: elements, k: number) => {
  const heap = new DwayHeap();
  let len = heap.size;

  for (const element of elements) {
    if (k === len && heap.peek().priority < element.priority) {
      heap.top();
      console.log(element);
    }
    if (k > len) {
      heap.insert(element);
      len = heap.size;
    }
  }

  heap.preview();
};
