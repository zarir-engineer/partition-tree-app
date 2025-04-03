This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

> If a child’s value increases → Other children decrease proportionally, unless they have been manually edited by the user. 
> If a top-level spinner’s value increases → Other top-level spinners decrease proportionally, unless edited already. 
> Changes in a top-level spinner propagate down → Adjust its children accordingly, unless the child is manually edited.
 
> How It Works
Increasing a widget's value:
If total remains ≤ 1, no issue.
If total exceeds 1:
Find unedited siblings (same level).
Reduce their values proportionally to maintain total = 1.
If no unedited siblings exist, prevent further increase.
If top-level values are adjusted:
If a top-level value increases:
Other top-level values decrease (unless edited).
Their children adjust accordingly.