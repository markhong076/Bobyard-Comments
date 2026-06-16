**Bobyard Comments Project**

This is a simple full stack commenting app for the Bobyard take-home assessment.
This app was built with a Ruby on Rails backend, SQLite db for local development, and a ReactJS + Vite frontend. DB data was seeded using comments.json.
This app supports comment add, edit, display, and delete capabilities.

**Prerequisites**

Make sure you have the following installed:
- Ruby (check using ruby -v)
- Rails (check using rails -v)
- Bundler (check using bundle -v
- Node (check using node -v)
- npm (check using npm -v)

**Setup**

Clone the repository:
```
git clone http://github.com/markhong076/Bobyard-Comments/
cd Bobyard-Comments
```

**Backend Setup**

Go into backend directory:
```
cd backend
```

Install Ruby dependencies:
```
bundle install
```

Seed the database:
```
rails db:migrate
rails db:seed
```

Start the Rails server:
```
rails server
```

The backend will run at http://localhost:3000

The comments API will be available at http://localhost:3000/comments

**Frontend Setup**

Go into frontend directory:
```
cd frontend
```

Install Node dependencies:
```
npm install
```

Start the Vite dev server:
```
npm run dev
```

The frontend will run at http://localhost:5173

**Running the App**

In order to run the app, you will need to have two terminals open, one for the frontend and one for the backend.

Terminal 1:
```
cd backend
rails server
```

Terminal 2:
```
cd frontend
npm run dev
```

Then the site will be available at http://localhost:5173

**API Endpoints**

List Comments
```
GET /comments
```

Create Comment
```
POST /comments
```
Request body:
```
{
  "comment: {
    "text": "asdf"
  }
}
```

New comments are automatically created as the Admin user with the current time and 0 likes.

Edit Comment
```
PATCH /comments/:id
```
Request body:
```
{
  "comment": {
    "text": "updated asdf"
  }
}
```

Delete Comment
```
DELETE /comments/:id
```

**Notes**

I used SQLite to keep local setup lightweight and easy for review. In a more scaled app, I'd probably resort to the usage of PostgreSQL, which can easily be done by updating the Rails database configuration.
