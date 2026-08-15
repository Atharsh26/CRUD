# crud — Student Records App

CRUD (Create, Read, Update, Delete) app for managing student records.

## Stack
- Node.js + Express
- MongoDB + Mongoose
- EJS (single view, handles add and edit)
- Bootstrap 5 + Google Fonts
- nodemon for auto-restart during dev

## Requirements
- Node.js installed
- MongoDB running locally on port 27017

## Run it

```bash
npm install
npm run dev
```

Or without auto-restart:
```bash
npm start
```

Then open http://localhost:3000

## Routes

| Route | Does what |
|---|---|
| GET / | list all students, blank add form |
| GET /edit/:id | same page, form pre-filled for that student |
| POST /save | creates a new student, or updates one if an id was passed |
| POST /delete/:id | deletes that student |

## Files

```
crud/
├── app.js
├── models/Student.js
├── views/index.ejs
├── public/css/style.css
└── package.json
```
