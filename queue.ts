import express, { json, urlencoded } from "express";
import cors from "cors"

const app = express();
app.use(json())
app.use(urlencoded({ extended: true }));
app.use(cors("*"));
// TODO: implement auth with middleware

class Queue<T> {
  private items: T[] = [];

  enqueue(...items: T[]): void {
    this.items.push(...items)
  }

  dequeue(): T | undefined {
    return this.isEmpty() ? undefined : this.items.shift()
  }

  size(): number {
    return this.items.length
  }

  isEmpty(): boolean {
    return this.size() === 0
  }
}

let scoutQueue = new Queue<any>
let robotQueue = new Queue<number>

app.get("/joinqueue", (_req, res) => {
  scoutQueue.enqueue(res)
  assignRobotScoutPairs(scoutQueue, robotQueue)
})

app.post("/queuerobots", (req, res) => {
  robotQueue.enqueue(...req.body.robots)
  assignRobotScoutPairs(scoutQueue, robotQueue)

  res.status(200).json({ success: true })
})

app.get("/queue", (req, res) => {
  // TODO: make this more informative using actual scout ids
  res.status(200).send(scoutQueue)
})

app.listen(8080, "127.0.0.1", () => {
  console.log(`Queue running on port 8080`)
})

// TODO: check if the response has been closed/disconnected/destroyed
function assignRobotScoutPairs(scoutQueue, robotQueue) {
  while (true) {
    if (scoutQueue.isEmpty() || robotQueue.isEmpty()) return

    scoutQueue.dequeue().json({ robot: robotQueue.dequeue() })
  }
}
