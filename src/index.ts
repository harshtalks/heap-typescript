import { elements } from "./heap/type";
import "./styles.css";
import DwayHeap from "./heap/heap";
import { KLargetElements } from "./heap/kLargest";

const data: elements = [
  {
    task: "Unencrypted password on DB",
    priority: 10
  },
  {
    task: "UI breaks on browser X",
    priority: 9
  },
  {
    task: "memory leak",
    priority: 8
  },
  {
    task: "jay to die",
    priority: 1
  },
  {
    task: "jay to cry",
    priority: 0
  }
];

KLargetElements(data, 1);
