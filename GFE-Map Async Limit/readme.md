## Here’s a clean explanation of your mapAsyncLimit implementation—why it works, why currentIndex is needed, and how the logic flows.

## ✅ What your code does

mapAsyncLimit runs asynchronous tasks with a concurrency limit — meaning:

Only #`size` number of promises run at the same time.

When one promise finishes, the next one starts.

Results stay in the same order as the iterable.

This is similar to how Promise.map from Bluebird works.

---

## 🔍 Why do we need currentIndex = index?

Because index++ moves forward before the async callback resolves.

If you wrote:

```js
results[index] = data;
```

By the time the promise resolves, index has already changed to a higher value → wrong ordering.

---

So:

```js
const currentIndex = index;
const task = iterable[index++];

## captures the correct index at the moment you scheduled the task.
```

---

## 🔁 Why runNextTask is called again after a promise finishes?

Because after:

```js
activePromise--;
```

you now have free "slots" to run more tasks.

---

## Calling:

```js
runNextTask();
```

lets the while-loop start the next pending tasks until the concurrency limit is reached again.

---

## 🧠 Why use a while loop inside runNextTask()?

Because JavaScript is single-threaded.

A typical mistake is using a busy while loop, but your loop runs synchronously only to start tasks, not wait for them.

It’s safe because:

The promise .then() runs asynchronously,

The loop only queues tasks, not blocks the thread.

---

## 🧨 What happens step-by-step

Example: iterable = [1,2,3,4,5], size = 2

Start runNextTask()

activePromise < 2 → start task 1

activePromise < 2 → start task 2

Now running 2 tasks → stop loop.

When task 1 finishes:

activePromise--

runNextTask() starts task 3

When task 2 finishes → start task 4

And so on until all tasks finish.
