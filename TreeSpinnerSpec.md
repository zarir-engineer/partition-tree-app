
# 🌳 Tree Spinner Specification

This document outlines the full specification for the dynamic spinner-based tree UI, with editable values and names, hierarchical child addition, value locking, and real-time value redistribution.

---

## 📌 Feature Overview

- 8-column dynamic tree UI based on spinner widgets.
- Each node shows a Mickey Mouse–style cloud with plus/minus ears.
- Editable names and values (except locked top-level nodes).
- Real-time value distribution (total always equals 1).
- PDF export, reset functionality, and scrollable layout.
- Editable layout using diagrams.net.

---

## 📐 Tree Structure Rules

- Top-level nodes: `Aaji`, `Sudarshan`, `Shripal`, `Ishwar`, `Vigyanchand`, `Parmeshwar`, `Pratapchand`, `Jagdish`
- Each top-level node is a column in the 8-column layout.
- Children are named with `parent_child` ID format (e.g., `shripal_ajay`).
- Each node (except top-level) can have up to 4 children.
- Tree is nested vertically beneath each spinner.

### 🔐 Locked Nodes

- Only `Shripal` and `Aaji` are permanently locked at value **0.125 (1/8)**.
- Others can be user-edited, and if edited, become locked until reset.
- Locked spinners show a small **🔒 icon**.

---

## 🔄 Value Adjustment Rules

### Top-Level

- All start at `0.125` (1/8).
- When one is changed:
  - Unedited siblings adjust to maintain total = 1.
  - If none can adjust, user is alerted.
  - Edited top-levels are **locked** and not recalculated.

### Children

- During reset: children are recalculated based on parent ÷ num_children.
- When a child is edited:
  - Siblings adjust to maintain parent sum.
  - Recalculations ensure overall total remains 1.

---

## ➕ Adding Children

- Children can be added **only to children of** `Vigyanchand` and `Parmeshwar`, or to **any other child node** of any top-level node.
- Top-levels that already have children cannot have more (e.g., Vigyanchand → Vikas, Parmeshwar → Parag).

---

## 📄 PDF Export

- Triggered by a button.
- Exports current tree view and values into a clean, printable PDF.

---

## ✏️ Inline Editing

- Names are editable directly in place.
- Top-level values only editable if not locked.
- Children values are always editable.

---

## 🌈 UI Notes

- “+ Add Child” is a **borderless button** with a **thin black underline**.
- Hierarchy is visualized using indentation or vertical lines.
- Grid layout is clean 8-column scrollable.
- Spinners are Mickey Mouse–style (cloud + ears).

---

## 🔬 Functional Test Matrix

| Scenario                                              | Expected Outcome                                                                 |
|-------------------------------------------------------|----------------------------------------------------------------------------------|
| Initial load                                          | All top-level spinners at 0.125, names editable, total = 1                      |
| Edit Sudarshan to 0.2                                 | Other top-levels (except Shripal, Aaji) adjust; edited ones lock                |
| Edit Shripal                                          | No change; locked at 0.125                                                      |
| Add child to Vikas (child of Vigyanchand)             | New spinner added with ID `vikas_childX`, value recalculated                    |
| Add child to Vigyanchand (already has child)          | Not allowed; button hidden                                                      |
| Reset triggered                                       | Values of children recalculated, locked flags cleared                           |
| PDF Export                                            | Clean snapshot with values, layout preserved                                    |
| Edit child spinner value                              | Sibling child values adjust to maintain parent sum                              |
| Try edit top-level when all others locked             | Alert triggered                                                                 |
| UI layout in mobile                                   | Scrollable 8-column UI preserved                                                |

---

## 💬 Developer Comments (Layman-Friendly)

- Each spinner uses controlled state (value + name).
- Top-level spinner lock logic = `if edited or in lockedList`.
- Add-child logic checks: `if parent is top-level and has children, disallow`.
- Rebalancing happens recursively during changes.
- Total is recalculated and always checked against 1.

---

## 🔮 Future Enhancements

- 🎨 Color gradients to show tree depth
- 💾 Auto-save to local storage or cloud
- 🔍 Search and filter spinners by name
- 📊 Live chart of value distribution

---

## 🗺️ Flowchart

Diagram.net editable flowchart file included in project.

![Flowchart](./A_flowchart_outlines_requirements_and_interactions.png)

---

> **Status:** ✅ Specification complete. Ready for component planning and code scaffolding.
