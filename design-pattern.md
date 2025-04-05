# 🧠 Design Patterns for Dynamic Tree-Based Ratio Allocation UI

Choosing the right design patterns upfront ensures **clarity**, **scalability**, and **extensibility**.

Since we’re building a **dynamic tree-based UI** with real-time value recalculations and visual manipulation, here are the most relevant patterns we will incorporate:

---

## 🌳 1. Composite Pattern (For Tree Structure)

### ✅ Why?
The tree consists of hierarchical parent-child spinner nodes. We want to treat every spinner node uniformly.

### 💡 How It’s Used:
- Each node (spinner) implements the same interface.
- Operations like `addChild`, `removeChild`, `updateValue`, and `recalculate` work recursively.
- Simplifies traversal for recalculation, reset, and PDF export.

---

## 🔔 2. Observer Pattern (For Value Recalculation)

### ✅ Why?
When a parent node's value changes, all its children must **automatically** update.

### 💡 How It’s Used:
- Parent acts as the **subject**.
- Children observe the parent.
- When parent updates, children automatically recalculate their own values based on it.

> Prevents manual propagation of changes.

---

## 🪝 3. Custom Hook Pattern (For Logic Separation)

### ✅ Why?
Separates core logic from UI components for better readability and reuse.

### 💡 How It’s Used:
- `useTreeLogic` hook will manage:
  - Tree data state
  - Add/remove operations
  - Value recalculations
  - Reset and export

---

## 📐 4. Strategy Pattern (For Rounding Logic)

### ✅ Why?
We may want multiple formatting rules (significant digits, fixed decimals, etc.).

### 💡 How It’s Used:
- `formatValue(value, strategy)` function
- Strategy options like `"significant"` or `"fixed"` allow flexibility
- Easily extendable in the future

---

## 📦 5. Module Pattern (Encapsulated Utilities)

### ✅ Why?
Utility logic (like PDF export or value formatting) should be isolated and reusable.

### 💡 How It’s Used:
- Utilities live in `utils/`
- Exported as pure functions:
  - `exportPDF.ts`
  - `rounding.ts`
  - `generateId.ts`

---

## 🧼 6. Container/Presentational Pattern (UI Cleanliness)

### ✅ Why?
Makes the component tree maintainable and testable.

### 💡 How It’s Used:
- Container components (e.g., `TreeGrid`, `TreeColumn`) manage logic and layout.
- Presentational components (e.g., `TreeNode`) are visual only and receive props.

---

## 🚀 Bonus Patterns (Optional in Future)

- **Memento Pattern**: Add undo/redo functionality
- **Command Pattern**: Wrap actions like add + recalc + save as a single operation
- **Visitor Pattern**: Perform uniform operations across all tree nodes (e.g., export)

---

## 🗂️ Summary Table

| Pattern                | Purpose                                 | Implementation Area            |
|------------------------|------------------------------------------|---------------------------------|
| Composite              | Uniform node handling                    | Tree structure (all spinners)   |
| Observer               | Auto-update of children                  | Value recalculations            |
| Custom Hook            | Reusable and readable logic              | `useTreeLogic.ts`               |
| Strategy               | Flexible formatting                      | `rounding.ts`                   |
| Module                 | Utility encapsulation                    | `utils/` folder                 |
| Container/Presentational | UI logic separation                    | `TreeGrid`, `TreeNode`, etc. |
| Memento (optional)     | Undo/Redo                                | Future: history/command stack   |
| Command (optional)     | Grouped state changes                    | Future: batch changes           |
| Visitor (optional)     | Uniform ops on all nodes                 | Future: export, validation      |

---
