Cam TODO:

- Eventually update all of the Common Core standards data (friendly titles and descriptions)
- Reach out MSU people (http://csc.educ.msu.edu/Nav/)

Josh/Kevin TODO:

- Refactor existing code as needed
- Upgrade the current page to show Khan Academy content for each standard
- Build a new page with the following requirements:
  - The user can select:
    - Their textbook
    - Their chapter
    - Their lesson
  - After selection, the user sees:
    - The related Common Core standards
    - The related Khan Academy content

Here's some fake data that could be used for that second page:

{
  "Josh's awesome textbook": {
    [
      {
        title: "Chapter 1"
        lessons: [
          {
            title: "Lesson 1",
            objective: "blah blah",
            standards: ["K.OA.5", "K.OA.4"]
          },
          {
            title: "Lesson 2",
            objective: "blah blah blah",
            standards: ["K.OA.2", "K.OA.3"]
          }
        ]
      },
      {
        title: "Chapter 2"
        lessons: [
          {
            title: "Lesson 1",
            objective: "blah blah",
            standards: ["K.OA.5", "K.OA.4"]
          },
          {
            title: "Lesson 2",
            objective: "blah blah blah",
            standards: ["K.OA.2", "K.OA.3"]
          }
        ]
      }
    ]
  },
  "Kevin's awesome textbook": {
    [
      {
        title: "Chapter 1"
        lessons: [
          {
            title: "Lesson 1",
            objective: "blah blah",
            standards: ["K.OA.5", "K.OA.4"]
          },
          {
            title: "Lesson 2",
            objective: "blah blah blah",
            standards: ["K.OA.2", "K.OA.3"]
          }
        ]
      },
      {
        title: "Chapter 2"
        lessons: [
          {
            title: "Lesson 1",
            objective: "blah blah",
            standards: ["K.OA.5", "K.OA.4"]
          },
          {
            title: "Lesson 2",
            objective: "blah blah blah",
            standards: ["K.OA.2", "K.OA.3"]
          }
        ]
      }
    ]
  }
}
