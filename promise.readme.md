## 📌 Promise (Polished Definition + Internal Notes)

A Promise is an object used to handle asynchronous operations in JavaScript.

A promise can be in one of three states:-

pending → initial state, still running

fulfilled → completed successfully with a value

rejected → failed with a reason (error)

---

When you create a new Promise, a Promise instance is created :

[[PromiseState]] → tracks current state (pending | fulfilled | rejected)

[[PromiseResult]] → stores the value (if fulfilled) or reason (if rejected)

[[PromiseFulfillReactions]] → success callbacks registered via .then

[[PromiseRejectReactions]] → failure callbacks registered via .catch or .then

[[PromiseIsHandled]] → flag to check if rejection has a handler (used for unhandled rejection warnings)

---

## Note:--

If you said “[[PromiseRejectReactions]] is for catch” → that’s not the full picture.

The correct version is:

👉 [[PromiseRejectReactions]] stores all rejection handlers, whether they come from the second argument of .then or from .catch.

So:

.catch(onRejected) ✅ → goes into [[PromiseRejectReactions]]

.then(onFulfilled, onRejected) ✅ → onRejected also goes into [[PromiseRejectReactions]]
