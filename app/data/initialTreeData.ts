// Define the Spinner type
export interface Spinner {
  id: number;
  name: string;
  value: number;
  edited: boolean;
  children: Spinner[];
  isTopLevel?: boolean; // ✅ Add this line
}

export const initialTreeData: Spinner[] = [
      { id: 1, name: "Sudarshan-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 101, name: "Avinash", value: 0, edited: false, isTopLevel: false, children: [] },
              { id: 102, name: "Nanda", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 103, name: "Bharti", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 104, name: "Manju", value: 0, edited: false, isTopLevel: false,  children: [] },
              ] },
      { id: 2, name: "Shripal-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 201, name: "Kiran", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 202, name: "Charu", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 203, name: "Ajay", value: 0, edited: false, isTopLevel: false,  children: [] },
              ] },
      { id: 3, name: "Ishwar-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 301, name: "Dinesh", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 302, name: "Kishore", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 303, name: "Vijay", value: 0, edited: false, isTopLevel: false,  children: [] },
              ] },
      { id: 4, name: "Vigyanchand-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 401, name: "Vikas", value: 0, edited: false, children: [] },
              { id: 402, name: "Pragati", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 403, name: "Subhash", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 404, name: "Chandrashekhar", value: 0, edited: false, isTopLevel: false,  children: [] },
              ] },
      { id: 5, name: "Parmeshwar-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 501, name: "Pradeep", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 502, name: "Sanjay", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 503, name: "Abhijeet", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 504, name: "Ravi", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 505, name: "Mamta", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 506, name: "Kiran", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 507, name: "child7", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 508, name: "child8", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 509, name: "child9", value: 0, edited: false, isTopLevel: false,  children: [] },
              ] },
      { id: 6, name: "Pratapchand-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 601, name: "Shailendra", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 602, name: "Smita", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 603, name: "Kavita", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 604, name: "Nishith", value: 0, edited: false, isTopLevel: false,  children: [] },
              ] },
      { id: 7, name: "Jagdish-ji", value: 0.125, edited: false, isTopLevel: true,
          children: [
              { id: 701, name: "Soumit", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 702, name: "Satyen", value: 0, edited: false, isTopLevel: false,  children: [] },
              ] },
      {
        id: 8, name: "Aa-ji", value: 0.125, edited: false, isTopLevel: true,
        children: [
          { id: 801, name: "Sudarshan-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8011, name: "Avinash", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8012, name: "Nanda", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8013, name: "Bharti", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8014, name: "Manju", value: 0, edited: false, isTopLevel: false,  children: [] },
                  ] },
          { id: 802, name: "Shripal-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8021, name: "Kiran", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8022, name: "Charu", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8023, name: "Ajay", value: 0, edited: false, isTopLevel: false,  children: [] },
                  ] },
          { id: 803, name: "Ishwar-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8031, name: "Dinesh", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8032, name: "Kishore", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8033, name: "Vijay", value: 0, edited: false, isTopLevel: false,  children: [] },
                  ] },
          { id: 804, name: "Vigyanchand-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8041, name: "Vikas", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8042, name: "Pragati", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8043, name: "Subhash", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8044, name: "Chandrashekhar", value: 0, edited: false, isTopLevel: false,  children: [] },
                  ] },
          { id: 805, name: "Parmeshwar-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8051, name: "Pradeep", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8052, name: "Sanjay", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8053, name: "Abhijeet", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8054, name: "Ravi", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8055, name: "Mamta", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8056, name: "Kiran", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8057, name: "child7", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8058, name: "child8", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8059, name: "child9", value: 0, edited: false, isTopLevel: false,  children: [] },
                  ] },
          { id: 806, name: "Pratapchand-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8061, name: "Shailendra", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8062, name: "Smita", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8063, name: "Kavita", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8064, name: "Nishith", value: 0, edited: false, isTopLevel: false,  children: [] },
                  ] },
          { id: 807, name: "Jagdish-ji", value: 0, edited: false, isTopLevel: true,
              children: [
                  { id: 8071, name: "Soumit", value: 0, edited: false, isTopLevel: false,  children: [] },
                  { id: 8072, name: "Satyen", value: 0, edited: false, isTopLevel: false,  children: [] },
                  ] },
          { id: 808, name: "Laxmibai-ji", value: 0, edited: false, isTopLevel: true,
            children: [
              { id: 8081, name: "Arun", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 8082, name: "Gautam", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 8083, name: "Munni", value: 0, edited: false, isTopLevel: false,  children: [] },
              { id: 8084, name: "Neelima", value: 0, edited: false, isTopLevel: false,  children: [] },
            ],
          },
        ],
      },
];
