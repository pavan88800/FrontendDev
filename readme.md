## 🧠 The Developer's Mental Checklist

## 🧑🏻‍💻 Before You Write Any Code

## 1. Understand the Problem First

. What exactly am I trying to solve?

. What are the inputs and expected outputs?

. What edge cases might exist?

. Are there any constraints or requirements I'm missing?

---

## 2. Plan Before Coding

. Break the problem into smaller steps

. Think about the data flow

. Consider what could go wrong

. Sketch out the logic first

## While Writing Code

---

## 3. Input Validation (ALWAYS)

```js
// Always ask: What if the input is...
- null or undefined?
- empty string/array/object?
- wrong data type?
- larger/smaller than expected?
- malformed or corrupted?
```

---

## 4. Error Handling

. Wrap risky operations in try-catch

. Provide meaningful error messages

. Fail gracefully, don't crash

. Log errors for debugging

---

## 5. Naming Rules

. Use descriptive names **(userCount not count)**

. Be consistent **(getUserData and setUserData, not getUserData and updateUser)**

. Avoid abbreviations **(user not usr)**

. Boolean variables should be questions **(isValid, hasData)**

---

## 6. Function Design

. One function, one responsibility

. Keep functions small (under 20-30 lines)

. Minimize side effects

. Return early when possible

---

## Testing Mindset

## 7. Mental Testing

**Before finishing any code, ask:**

Does this work with empty data?

What about maximum/minimum values?

What if the same data appears twice?

What if required data is missing?

---

## 8. Common Edge Cases

Empty arrays/strings/objects

First/last items in arrays

Duplicate data

Very large numbers

Special characters in strings

Network failures (for API calls)

---

## Code Quality

## 9. Readability

Write code like you're explaining it to a friend

Use comments for "why", not "what"

Consistent indentation and formatting

Meaningful variable names

---

## 10. Performance Awareness

Avoid nested loops when possible

Don't repeat expensive operations

Consider time/space complexity for large data

Cache results when appropriate

## Debugging Habits

## 11. Debugging Strategy

Use console.log strategically

Check data at each step

Test with simple inputs first

Isolate the problem area

---

12. Version Control Mindset

Commit working code frequently

Write meaningful commit messages

Test before committing

Keep changes small and focused

---

##Professional Habits

## 13. Documentation

Comment complex logic

Write clear function descriptions

Document API endpoints and data formats

Keep README files updated

## 14. Security Awareness

Never trust user input

Sanitize data before using it

Don't expose sensitive information

Validate on both client and server

---

## 15. Continuous Learning

Read other people's code

Stay updated with best practices

Learn from your mistakes

Ask questions when stuck

---

## The Golden Rules

"Make it work, then make it better" - Get a working solution first

"Code is read more than it's written" - Prioritize clarity

"Fail fast, fail clearly" - Catch errors early with good messages

"Don't repeat yourself (DRY)" - Reuse code instead of copying

"Keep it simple, stupid (KISS)" - Simple solutions are usually better

---

## Daily Checklist

Before you start coding each day, remind yourself:

I will validate all inputs

I will handle errors gracefully

I will use clear, descriptive names

I will test edge cases mentally

I will write code that others can understand

---

## Quick Reference for Common Validations

## String Validation

```js
if (!str || typeof str !== "string" || !str.trim()) {
  // Handle invalid string
}
```

---

Array Validation

```js
if (!Array.isArray(arr) || arr.length === 0) {
  // Handle invalid array
}
```

---

## Number Validation

```js
const num = parseFloat(input);
if (isNaN(num) || num < 0) {
  // Handle invalid number
}
```

## Object Validation

```js
if (!obj || typeof obj !== "object" || Object.keys(obj).length === 0) {
  // Handle invalid object
}
```

## 💡 Pro Tip: Print this out and keep it near your computer. Review it weekly until these habits become automatic.

The difference between junior and senior developers isn't just technical knowledge - it's having these habits so ingrained that you do them without thinking.
