# 🧠 Functional Blueprint: Spinner Tree Allocation System

> **Clarity of functionality comes first**, and **code should serve a perfectly defined behavior**, not discover it mid-way.

Here’s a process you can follow to **fully "chisel out" functionality** before even opening your code editor:

---

### 🧱 1. Start with Immutable Rules ("Laws")

These are constraints that **can’t be broken** at any cost. You’ve already defined several:

- Total always equals 1.
- Shripal and Aaji are always locked at 0.125.
- Locked nodes can’t be changed unless reset.
- A node can only be edited once.

> These are your **non-negotiables**. They form the skeleton.

---

### 🧠 2. Define All Corollaries and Edge Behaviors

You're already doing this — for example:

- If user **increases** a top-level node, others **decrease** if unedited.
- If user **decreases**, others **increase** if possible.
- If no rebalancing possible, show alert.

**Corollary principle**: Every action must have an equal opposite system reaction — define what that is.

---

### 🪜 3. Enumerate User Actions & System Reactions

| **User Action**                              | **System Response**                                                                 |
|---------------------------------------------|-------------------------------------------------------------------------------------|
| Edits unedited top-level to 0.2              | Reduce unedited others proportionally to preserve total 1                          |
| Edits locked node (`Shripal`)                | Show “Locked” alert                                                                |
| Edits already-edited node (`Ishwar` again)   | Show “Already edited” alert                                                        |
| Adds child to `Parmeshwar`                   | Equally divide Parmeshwar’s value among children                                   |
| Edits a child (`parmeshwar_abc`)             | Adjust sibling values so all still sum to parent                                   |
| Deletes a child (`vigyanchand_xyz`)          | Redistribute value equally among remaining children                                |
| Presses Reset                                | Revert all to initial state, clear edits, unlock editable top-levels               |

> **Each of these rows** = 1 test case + 1 functional block later in code.

---

### 🧭 4. Draw Functional Flow Diagrams

For tricky logic like rebalancing top-level nodes, make a quick **flowchart**:

