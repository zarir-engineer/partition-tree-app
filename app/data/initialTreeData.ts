import { SpinnerNode } from "@/types/tree";

// Define the Spinner type
export interface Spinner {
  id: number;
  name: string;
  value: number;
  edited: boolean;
  children: Spinner[];
  isTopLevel?: boolean; // ✅ Add this line
}

export const initialTreeData = [
  {
    id: "sudarshan",
    name: "Sudarshan",
    value: 0.125,
    isTopLevel: true,
    children: [
      { id: "sudarshan-avinash", name: "Avinash", value: 0.03125 },
      { id: "sudarshan-nanda", name: "Nanda", value: 0.03125 },
      { id: "sudarshan-bharti", name: "Bharti", value: 0.03125 },
      { id: "sudarshan-manju", name: "Manju", value: 0.03125 },
    ],
  },
  {
    id: "shripal",
    name: "Shripal",
    value: 0.125,
    isTopLevel: true,
    children: [
      { id: "shripal-kiran", name: "Kiran", value: 0.041666667 },
      { id: "shripal-charu", name: "Charu", value: 0.041666667 },
      { id: "shripal-ajay", name: "Ajay", value: 0.041666667 },
    ],
  },
  {
    id: "ishwar",
    name: "Ishwar",
    value: 0.125,
    isTopLevel: true,
    children: [
      { id: "ishwar-dinesh", name: "Dinesh", value: 0.041666667 },
      { id: "ishwar-kishore", name: "Kishore", value: 0.041666667 },
      { id: "ishwar-vijay", name: "Vijay", value: 0.041666667 },
    ],
  },
  {
    id: "vigyanchand",
    name: "Vigyanchand",
    value: 0.125,
    isTopLevel: true,
    children: [
      { id: "vigyanchand-vikas", name: "Vikas", value: 0.03125 },
      { id: "vigyanchand-pragati", name: "Pragati", value: 0.03125 },
      { id: "vigyanchand-subhash", name: "Subhash", value: 0.03125 },
      { id: "vigyanchand-chandrashekhar", name: "Chandrashekhar", value: 0.03125 },
    ],
  },
  {
    id: "parmeshwar",
    name: "Parmeshwar",
    value: 0.125,
    isTopLevel: true,
    children: [
      { id: "parmeshwar-pradeep", name: "Pradeep", value: 0.013888889 },
      { id: "parmeshwar-sanjay", name: "Sanjay", value: 0.013888889 },
      { id: "parmeshwar-abhijeet", name: "Abhijeet", value: 0.013888889 },
      { id: "parmeshwar-ravi", name: "Ravi", value: 0.013888889 },
      { id: "parmeshwar-mamta", name: "Mamta", value: 0.013888889 },
      { id: "parmeshwar-kiran", name: "Kiran", value: 0.013888889 },
      { id: "parmeshwar-child7", name: "Child 7", value: 0.013888889 },
      { id: "parmeshwar-child8", name: "Child 8", value: 0.013888889 },
      { id: "parmeshwar-child9", name: "Child 9", value: 0.013888889 },
    ],
  },
  {
    id: "pratapchand",
    name: "Pratapchand",
    value: 0.125,
    isTopLevel: true,
    children: [
      { id: "pratapchand-shailendra", name: "Shailendra", value: 0.03125 },
      { id: "pratapchand-smita", name: "Smita", value: 0.03125 },
      { id: "pratapchand-kavita", name: "Kavita", value: 0.03125 },
      { id: "pratapchand-nishith", name: "Nishith", value: 0.03125 },
    ],
  },
  {
    id: "jagdish",
    name: "Jagdish",
    value: 0.125,
    isTopLevel: true,
    children: [
      { id: "jagdish-soutmit", name: "Soutmit", value: 0.0625 },
      { id: "jagdish-satyen", name: "Satyen", value: 0.0625 },
    ],
  },
  {
    id: "aaji",
    name: "Aaji",
    value: 0.125,
    isTopLevel: true,
    children: [
      {
        id: "aaji-sudarshan",
        name: "Sudarshan",
        value: 0.015625,
        children: [
          { id: "aaji-sudarshan-avinash", name: "Avinash", value: 0.00390625 },
          { id: "aaji-sudarshan-nanda", name: "Nanda", value: 0.00390625 },
          { id: "aaji-sudarshan-bharti", name: "Bharti", value: 0.00390625 },
          { id: "aaji-sudarshan-manju", name: "Manju", value: 0.00390625 },
        ],
      },
      {
        id: "aaji-shripal",
        name: "Shripal",
        value: 0.015625,
        children: [
          { id: "aaji-shripal-kiran", name: "Kiran", value: 0.005208333 },
          { id: "aaji-shripal-charu", name: "Charu", value: 0.005208333 },
          { id: "aaji-shripal-ajay", name: "Ajay", value: 0.005208333 },
        ],
      },
      {
        id: "aaji-ishwar",
        name: "Ishwar",
        value: 0.015625,
        children: [
          { id: "aaji-ishwar-dinesh", name: "Dinesh", value: 0.005208333 },
          { id: "aaji-ishwar-kishore", name: "Kishore", value: 0.005208333 },
          { id: "aaji-ishwar-vijay", name: "Vijay", value: 0.005208333 },
        ],
      },
      {
        id: "aaji-vigyanchand",
        name: "Vigyanchand",
        value: 0.015625,
        children: [
          { id: "aaji-vigyanchand-vikas", name: "Vikas", value: 0.00390625 },
          { id: "aaji-vigyanchand-pragati", name: "Pragati", value: 0.00390625 },
          { id: "aaji-vigyanchand-subhash", name: "Subhash", value: 0.00390625 },
          { id: "aaji-vigyanchand-chandrashekhar", name: "Chandrashekhar", value: 0.00390625 },
        ],
      },
      {
        id: "aaji-parmeshwar",
        name: "Parmeshwar",
        value: 0.015625,
        children: [
          { id: "aaji-parmeshwar-pradeep", name: "Pradeep", value: 0.001736111 },
          { id: "aaji-parmeshwar-sanjay", name: "Sanjay", value: 0.001736111 },
          { id: "aaji-parmeshwar-abhijeet", name: "Abhijeet", value: 0.001736111 },
          { id: "aaji-parmeshwar-ravi", name: "Ravi", value: 0.001736111 },
          { id: "aaji-parmeshwar-mamta", name: "Mamta", value: 0.001736111 },
          { id: "aaji-parmeshwar-kiran2", name: "Kiran", value: 0.001736111 },
          { id: "aaji-parmeshwar-child7", name: "Child 7", value: 0.001736111 },
          { id: "aaji-parmeshwar-child8", name: "Child 8", value: 0.001736111 },
          { id: "aaji-parmeshwar-child9", name: "Child 9", value: 0.001736111 },
        ],
      },
      {
        id: "aaji-pratapchand",
        name: "Pratapchand",
        value: 0.015625,
        children: [
          { id: "aaji-pratapchand-shailendra", name: "Shailendra", value: 0.00390625 },
          { id: "aaji-pratapchand-smita", name: "Smita", value: 0.00390625 },
          { id: "aaji-pratapchand-kavita", name: "Kavita", value: 0.00390625 },
          { id: "aaji-pratapchand-nishith", name: "Nishith", value: 0.00390625 },
        ],
      },
      {
        id: "aaji-jagdish",
        name: "Jagdish",
        value: 0.015625,
        children: [
          { id: "aaji-jagdish-soutmit", name: "Soutmit", value: 0.0078125 },
          { id: "aaji-jagdish-satyen", name: "Satyen", value: 0.0078125 },
        ],
      },
      {
        id: "aaji-laxmibai",
        name: "Laxmibai",
        value: 0.015625,
        children: [
          { id: "aaji-laxmibai-arun", name: "Arun", value: 0.00390625 },
          { id: "aaji-laxmibai-snehlata", name: "Snehlata", value: 0.00390625 },
          { id: "aaji-laxmibai-manto", name: "Manto", value: 0.00390625 },
          { id: "aaji-laxmibai-gautam", name: "Gautam", value: 0.00390625 },
        ],
      },
    ],
  },
];
