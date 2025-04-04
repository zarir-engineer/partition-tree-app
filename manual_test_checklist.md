
# ✅ Manual Testing Checklist: Dynamic Tree Spinner UI

## 🔢 General Behavior

- [ ] Initial 8 top-level nodes are rendered:  
  `Aaji`, `Sudarshan`, `Shripal`, `Ishwar`, `Vigyanchand`, `Parmeshwar`, `Pratapchand`, `Jagdish`.

- [ ] Each spinner starts with a default value and shows up to 3 significant digits (e.g., `0.125`, `0.042`, `0.004`).

- [ ] All values are rounded to 3 significant digits and have **no trailing zeroes**.

- [ ] Total displayed at top equals `1.000`.

---

## ➕ Add Child Node

- [ ] Adding a child node divides the parent value **equally** among all children.

- [ ] Child node value updates correctly after every add (check rounding).

- [ ] Add button is not visible for top-level spinners.

- [ ] Add button is disabled/hidden after 4 children are present.

---

## ➖ Remove Child Node

- [ ] Removing a child re-distributes the parent’s value equally among remaining children.

- [ ] Values update correctly and are rounded appropriately.

- [ ] Cannot remove top-level spinners.

---

## ✍️ Name Edit

- [ ] Clicking on the spinner name allows inline editing.

- [ ] Top-level node shows a small “🔒” lock icon when edited.

- [ ] Updated name persists after editing.

---

## 🔁 Reset Functionality

- [ ] Clicking "Reset" returns the entire tree to the initial state.

- [ ] All child nodes are removed.

- [ ] Values are restored to default, correctly rounded.

---

## 📄 PDF Export

- [ ] Clicking "Save to PDF" generates a snapshot of the current tree layout.

- [ ] PDF shows rounded values and current node names.

- [ ] PDF includes legend and title at top.

---

## 🖱️ UI Layout & Usability

- [ ] 8 columns are scrollable horizontally.

- [ ] Top bar (Title, Legend, Reset, PDF buttons) stays fixed during scrolling.

- [ ] Tree indentation/lines show parent-child relationships clearly.

- [ ] "+" buttons are underlined and styled minimally (except top-level nodes).
