# 🧪 Dynamic Spinner Tree UI — Functional Test Matrix

## 🎯 Objective
Ensure all rules, edge cases, and expected behaviors are captured for the dynamic tree-based spinner UI. Covers hierarchy logic, value constraints, interactivity, and visual clarity.

---

## 📌 Top-Level Rules

| Rule # | Description | Expected Behavior |
|--------|-------------|-------------------|
| T1 | Total of all values must always equal **1** | Dynamically adjusts values to maintain total sum of 1 |
| T2 | Top-level nodes are: `Aaji`, `Sudarshan`, `Shripal`, `Ishwar`, `Vigyanchand`, `Parmeshwar`, `Pratapchand`, `Jagdish` | Rendered in 8-column layout |
| T3 | Only `Shripal` and `Aaji` are **locked** at `0.125` (1/8) | Cannot be edited; show a **locked** icon |
| T4 | All **other top-levels** can be edited unless locked by the user | Once edited, become locked and turn gray |
| T5 | Editing a top-level value adjusts other **unlocked top-level siblings** | Keeps total 1; if adjustment impossible, **alert user** |
| T6 | Clicking **Reset** resets all top-levels to 0.125 and unlocks them | Child values are also recalculated |
| T7 | Top-level nodes cannot have children added (except pre-existing ones) | UI must **disable or hide** `+` button for top-levels |

---

## 🌱 Child Node Behavior

| Rule # | Description | Expected Behavior |
|--------|-------------|-------------------|
| C1 | Each child is assigned `parent_child`-style string ID | e.g., `vigyanchand_vikas_1` |
| C2 | Child values must always sum up to their **parent's value** | Automatically redistributes values |
| C3 | If a child is edited, other siblings adjust to keep total correct | Maintains internal node balance |
| C4 | User can add up to **4 children** per node | Prevent further additions after 4 |
| C5 | On Reset, all child nodes are removed | Only top-levels and hardcoded initial children remain |
| C6 | Children **can be added to any non-top-level node**, including children of `Vigyanchand`, `Parmeshwar`, or other top-levels | e.g., `vigyanchand → vikas → child`, `sudarshan → xyz → abc` |
| C7 | "+" button is shown under all eligible spinners except top-levels | Styled as a thin black underline with no border |

---

## 🎨 UI and Layout

| Rule # | Description | Expected Behavior |
|--------|-------------|-------------------|
| U1 | Spinner layout is a fixed 8-column grid | Scrollable if overflow occurs |
| U2 | Spinner value and name are editable inline | For all nodes |
| U3 | Locked top-level nodes show a **small lock icon** | Instead of turning gray (unless user-edited) |
| U4 | Visual hierarchy lines or indentation help show parent-child structure | Improves clarity in large trees |

---

## 📄 PDF & Export

| Rule # | Description | Expected Behavior |
|--------|-------------|-------------------|
| P1 | PDF export includes full tree structure, values, and names | Matches UI layout |
| P2 | Locked status, indentation, and hierarchy are preserved in export | Clarity is maintained |
| P3 | Export button disables during spinner updates to prevent conflicts | Ensures consistent output |

---

## 🛠 Future Enhancements

- 🎨 **Color Gradients** for showing proportion size visually
- 💾 **Auto-save** tree state to localStorage or cloud
- 🪄 **Undo/Redo** for value or structure changes
- 📊 **Mini Chart View** to summarize spinner distributions
- 🧠 **Smart Suggestions** when tree is unbalanced

---

# Revised Test Matrix (Rounded to 3 Significant Digits, No Trailing Zeroes)

| Original Value     | Rounded Value |
|--------------------|---------------|
| 0.125              | 0.125         |
| 0.041666667        | 0.042         |
| 0.03125            | 0.0313        |
| 0.015625           | 0.0156        |
| 0.005208333        | 0.00521       |
| 0.00390625         | 0.00391       |
| 0.001736111        | 0.00174       |
| 0.0078125          | 0.00781       |
| 0                  | 0             |



cloud-spinner-ui/
│
├── public/                         # Static files like images, favicon
│
├── src/
│   ├── assets/                     # Logos, icons, static images
│   ├── components/                 # Reusable UI components
│   │   ├── SpinnerTree.tsx        # Main tree structure and logic
│   │   ├── SpinnerNode.tsx        # Individual spinner node (Mickey Mouse shape)
│   │   ├── Header.tsx             # Title, legend, Reset, Save to PDF
│   │   └── PDFExporter.tsx        # PDF export logic
│   │
│   ├── hooks/                     # Custom React hooks
│   │   └── useTreeManager.ts      # Add/remove/update logic for tree
│   │
│   ├── utils/                     # Helper utilities
│   │   ├── formatter.ts           # 3-significant-digit formatting
│   │   └── constants.ts           # Shared constants like max children
│   │
│   ├── data/
│   │   └── initialTreeData.ts     # Initial tree structure
│   │
│   ├── styles/                    # Tailwind or custom CSS modules
│   │   └── spinnerStyles.css      # Special spinner styling (if needed)
│   │
│   ├── pages/
│   │   └── index.tsx              # Main app entry
│   │
│   └── types/
│       └── tree.d.ts              # Type definitions for nodes, tree structure
│
├── .env.local                     # Environment variables
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind config (if used)
├── tsconfig.json                  # TypeScript config
├── next.config.js                 # Next.js config
├── README.md                      # Project documentation
└── vercel.json                    # Vercel deployment config (if needed)



## Notes:
- Values are **rounded to three significant digits**.
- **Trailing zeroes are removed**.
- All `value` fields in the data structure should reflect these formats.


## 🧑‍💻 Developer Comments

Every line of code (in final implementation) should include developer-facing comments and layman explanations to aid both collaboration and future debugging.

---

Let me know if you'd like this saved as a `.md` file or added to a repo!
