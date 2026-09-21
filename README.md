# Expense Tracker

A simple and responsive Expense Tracker built with HTML, CSS, and JavaScript.

## Features

- Add new expenses
- Validate expense details
- Accept positive numeric amounts
- Select expense categories
- Select expense dates
- Display expenses with newest dates first
- Delete expenses
- Filter expenses by category
- Recalculate total spending after filtering
- Display transaction count
- Display spending by category
- Dynamic category bar chart
- Responsive layout
- Empty-state handling

## Technologies Used

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- JavaScript Array Methods
- JavaScript Date Object

## Project Structure

```text
expense-tracker/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Categories

The application supports these categories:

- Food
- Transport
- Shopping
- Entertainment
- Health
- Bills

## Validation

The application checks for:

- Empty description
- Missing amount
- Non-numeric amount
- Zero amount
- Negative amount
- Missing category
- Missing date

## How It Works

1. Enter an expense description.
2. Enter the amount.
3. Select a category.
4. Select the date.
5. Click **Add Expense**.
6. The expense appears in the list.
7. Total spending and the category chart update automatically.
8. Use the category filter to view specific expenses.
9. Delete an expense using the delete button.

## JavaScript Concepts Demonstrated

```javascript
Array.push()
Array.filter()
Array.reduce()
Array.sort()
Array.find()
Number()
Date
Intl.NumberFormat()
DOM manipulation
Event listeners
Form validation
Dynamic rendering
```

## Example

```text
Description: Lunch
Amount: ₹250
Category: Food
Date: 21-09-2026
```

After adding the expense, the application updates:

- Expense list
- Total spent
- Transaction count
- Category totals
- Category chart

## How to Run

No backend or package installation is required.

1. Download or clone the repository.
2. Open the project folder.
3. Open `index.html` in your browser.

You can also open the project in VS Code and run it with the Live Server extension.

## Author

Pasupula Pavankumar

LinkedIn: https://www.linkedin.com/in/pasupulapavankumar

GitHub: https://github.com/Pavan-93900

## License

This project was created for learning, portfolio, and assessment purposes.
