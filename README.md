# Webshop Project

## Description

This project is a simple webshop application with a frontend built using JavaScript and a backend built using .NET Core. The backend uses Entity Framework Core for database operations.

## Setup Instructions

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install the necessary npm packages:
    ```sh
    npm install
    ```

### Backend

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Update the database:
    ```sh
    dotnet ef database update
    ```
    This command will attempt to create the `webshop.db` file in the [`./backend/Database`] folder. If the folder does not exist, you might need to create it manually.

## Running the Program

To run the program, you can open two terminals:

1. In the first terminal, navigate to the [`backend`] directory and run:
    ```sh
    cd backend
    dotnet run
    ```
    or
    ```sh
    dotnet watch run
    ```

2. In the second terminal, navigate to the [`frontend`] directory and run:
    ```sh
    cd frontend
    npm start
    ```

## Database Description

The database consists of the following entities and their relationships:

- **ProductModel**: Represents a product in the webshop.
  - Has a many-to-many relationship with **CategoryModel** through the [`ProductCategories`] table.

- **CategoryModel**: Represents a category to which products can belong.
  - Has a many-to-many relationship with **ProductModel** through the [`ProductCategories`] table.

- **OrderModel**: Represents an order placed by a customer.
  - Has a one-to-many relationship with **OrderItemModel**. When an order is deleted, all associated order items are also deleted (cascade delete).

- **OrderItemModel**: Represents an item in an order.
  - Has a many-to-one relationship with **OrderModel**.
  - Has a many-to-one relationship with **ProductModel**.

## Frontend Details

The frontend of this project is built using React.

### Routing with React Router

To handle routing in the application, we use `react-router-dom`. Here is a basic example of how to set up routing:

Create a `Router` component:
    ```jsx
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
    import Home from './components/Home';
    import About from './components/About';

    function App() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                </Switch>
            </Router>
        );
    }

    export default App;
    ```

For more details, refer to the [React Router documentation](https://reactrouter.com/).

### Using Bootstrap for Responsive Design

To create a responsive site, we use Bootstrap. Here is how you can integrate Bootstrap into your React project:

1. Import Bootstrap CSS in your `index.js` or `App.js`:
    ```jsx
    import 'bootstrap/dist/css/bootstrap.min.css';
    ```

2. Use Bootstrap classes in your components:
    ```jsx
    function Home() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Welcome to the Webshop</h1>
                    </div>
                </div>
            </div>
        );
    }

    export default Home;
    ```

For more details, refer to the [Bootstrap documentation](https://getbootstrap.com/).
