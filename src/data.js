export const courses = [
  { id: 'html', name: 'HTML & CSS', short: 'HTML', icon: 'layout', color: 'orange', description: 'Structure, styling, layouts and responsive design', level: 'Beginner', duration: '5 questions · 5 min' },
  { id: 'javascript', name: 'JavaScript', short: 'JS', icon: 'code', color: 'yellow', description: 'Core language concepts, functions and DOM', level: 'Beginner', duration: '5 questions · 5 min' },
  { id: 'react', name: 'React JS', short: 'RE', icon: 'atom', color: 'blue', description: 'Components, props, state and React hooks', level: 'Intermediate', duration: '5 questions · 5 min' },
  { id: 'python', name: 'Python', short: 'PY', icon: 'terminal', color: 'green', description: 'Syntax, data types, functions and collections', level: 'Beginner', duration: '5 questions · 5 min' },
  { id: 'java', name: 'Java', short: 'JV', icon: 'coffee', color: 'purple', description: 'OOP, JVM, exceptions and Java fundamentals', level: 'Beginner', duration: '5 questions · 5 min' },
  { id: 'sql', name: 'SQL & DBMS', short: 'SQL', icon: 'database', color: 'pink', description: 'Queries, joins, keys and database concepts', level: 'Beginner', duration: '5 questions · 5 min' }
]

export const questionBank = {
  html: [
    { q: 'What does HTML stand for?', options: ['Hyper Trainer Marking Language', 'HyperText Markup Language', 'HyperText Marketing Language', 'HighText Machine Language'], answer: 1, explanation: 'HTML stands for HyperText Markup Language and defines the structure of web pages.' },
    { q: 'Which HTML element is used to create a hyperlink?', options: ['<link>', '<href>', '<a>', '<url>'], answer: 2, explanation: 'The anchor element <a> creates hyperlinks, commonly using the href attribute.' },
    { q: 'Which CSS property changes text color?', options: ['font-style', 'text-color', 'color', 'foreground'], answer: 2, explanation: 'The CSS color property sets the foreground color of text.' },
    { q: 'Which CSS layout system is designed for one-dimensional layouts?', options: ['Flexbox', 'SQL', 'Canvas only', 'Frameset'], answer: 0, explanation: 'Flexbox is especially useful for laying items out in one row or one column.' },
    { q: 'Which tag is most appropriate for the main page heading?', options: ['<head>', '<h1>', '<title>', '<header1>'], answer: 1, explanation: 'The h1 element represents the highest-level heading in the page content.' }
  ],
  javascript: [
    { q: 'Which keyword declares a block-scoped variable that can be reassigned?', options: ['const', 'let', 'static', 'define'], answer: 1, explanation: 'let is block-scoped and allows reassignment.' },
    { q: 'What does === check in JavaScript?', options: ['Only value after coercion', 'Only data type', 'Value and type without coercion', 'Whether two variables have the same name'], answer: 2, explanation: 'Strict equality compares values without converting their types.' },
    { q: 'Which method adds an item to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 0, explanation: 'push() appends one or more items to the end of an array.' },
    { q: 'What is a function used as an argument to another function called?', options: ['Constructor', 'Callback', 'Selector', 'Prototype'], answer: 1, explanation: 'A callback is a function passed to another function to be called later.' },
    { q: 'Which method converts a JSON string into a JavaScript value?', options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.object()'], answer: 1, explanation: 'JSON.parse() parses a JSON string into a JavaScript value.' }
  ],
  react: [
    { q: 'What is a React component?', options: ['A database table', 'A reusable piece of UI', 'A CSS property', 'A server port'], answer: 1, explanation: 'Components are reusable building blocks that describe parts of a user interface.' },
    { q: 'Which hook is commonly used to manage state in a function component?', options: ['useRoute', 'useFetchOnly', 'useState', 'useClass'], answer: 2, explanation: 'useState adds local state to a function component.' },
    { q: 'How do you pass data from a parent component to a child?', options: ['Props', 'SQL', 'DOM events only', 'Package-lock'], answer: 0, explanation: 'Props are inputs passed from a parent component to its child.' },
    { q: 'What is the purpose of useEffect?', options: ['Style text automatically', 'Synchronize with external systems', 'Create HTML tags only', 'Replace all state'], answer: 1, explanation: 'useEffect is used for side effects such as subscriptions, timers and data fetching.' },
    { q: 'Why should list items have a stable key?', options: ['To encrypt each item', 'To help React identify items between renders', 'To make CSS load', 'To create a route'], answer: 1, explanation: 'Keys help React match list elements across updates.' }
  ],
  python: [
    { q: 'Which symbol starts a single-line comment in Python?', options: ['//', '<!--', '#', '/*'], answer: 2, explanation: 'Python single-line comments begin with #.' },
    { q: 'Which Python type is an ordered, mutable collection?', options: ['tuple', 'list', 'frozenset', 'int'], answer: 1, explanation: 'Lists preserve order and can be modified.' },
    { q: 'Which keyword defines a function?', options: ['func', 'function', 'def', 'lambda only'], answer: 2, explanation: 'The def keyword defines a named function.' },
    { q: 'What is the result of len("code")?', options: ['3', '4', '5', 'Error'], answer: 1, explanation: 'The string "code" contains four characters.' },
    { q: 'Which structure stores key-value pairs?', options: ['Dictionary', 'String', 'Float', 'Range'], answer: 0, explanation: 'A dictionary maps keys to values.' }
  ],
  java: [
    { q: 'Which keyword is used to inherit a class in Java?', options: ['implements', 'inherits', 'extends', 'superclass'], answer: 2, explanation: 'A class uses extends to inherit from another class.' },
    { q: 'Which method is the usual entry point of a Java application?', options: ['start()', 'main()', 'runApp()', 'initJava()'], answer: 1, explanation: 'The standard entry point is public static void main(String[] args).' },
    { q: 'Which concept bundles data and methods in one unit?', options: ['Encapsulation', 'Compilation', 'Iteration', 'Casting'], answer: 0, explanation: 'Encapsulation groups state and behavior and controls access to them.' },
    { q: 'Which keyword creates an object in Java?', options: ['class', 'new', 'this', 'void'], answer: 1, explanation: 'The new keyword creates an object instance.' },
    { q: 'Which block is commonly used to handle an exception?', options: ['if-else', 'switch', 'try-catch', 'for-each'], answer: 2, explanation: 'try-catch handles exceptions that occur in a try block.' }
  ],
  sql: [
    { q: 'Which SQL command retrieves data from a table?', options: ['GET', 'OPEN', 'SELECT', 'FETCH TABLE'], answer: 2, explanation: 'SELECT retrieves rows and columns from one or more tables.' },
    { q: 'Which clause filters rows before grouping?', options: ['HAVING', 'WHERE', 'ORDER BY', 'GROUP'], answer: 1, explanation: 'WHERE filters individual rows before grouping and aggregation.' },
    { q: 'Which key uniquely identifies a row in a table?', options: ['Foreign key', 'Duplicate key', 'Primary key', 'Optional key'], answer: 2, explanation: 'A primary key uniquely identifies each row and cannot contain NULL values.' },
    { q: 'Which JOIN returns only matching rows from both tables?', options: ['LEFT JOIN', 'FULL JOIN', 'CROSS JOIN', 'INNER JOIN'], answer: 3, explanation: 'INNER JOIN returns rows that match the join condition in both tables.' },
    { q: 'Which function counts rows?', options: ['SUM(*)', 'COUNT(*)', 'TOTAL ROWS', 'NUMBER()'], answer: 1, explanation: 'COUNT(*) counts rows in the result set.' }
  ]
}
