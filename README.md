
# Task Management Pro

This project is an application called **Task Management Pro**, built on React and Firebase technologies. It includes features such as role-based permission management, project and task tracking, adding comments/files, and analytics screens.

## Table of Contents

1.  [Overview](#overview)
    
2.  [Features and Screens](#features-and-screens)
    
    -   [Task Screens](#task-screens)
        
    -   [Project Screens](#project-screens)
        
    -   [Analysis Screen](#analysis-screen)
        
    -   [Profile Screen](#profile-screen)
        
    -   [Dashboard Screen](#dashboard-screen)
        
    -   [Admin Panel](#admin-panel)
        
3.  [Role and Permission Management](#role-and-permission-management)
    
4.  [Design and User Experience](#design-and-user-experience)
    
5.  [Used Technologies and Dependencies](#used-technologies-and-dependencies)
    
6.  [Installation](#installation)
    
7.  [Environment Variables](#environment-variables)
    
8.  [Usage](#usage)
9. [License](#license)
    


## Overview

This project is designed to facilitate task and project tracking within a team or in environments where there is a customer-employee relationship. Users can access different screens and use different permissions (creating, editing, deleting, assigning projects/tasks, etc.) depending on the role they have.

**Main Goals:**

-   Manage tasks and projects in a central structure
    
-   Organize user access with a role-based permission system
    
-   Facilitate collaboration with interactive features such as file uploading and adding comments
    
-   Reflect changes quickly with a real-time database (Firebase)
    
-   Visualize project status with analysis screens showing statistical data and charts
    


## Features and Screens

### Task Screens

1.  **Task List Screen**
    
    -   List tasks in a specific date range
        
    -   List tasks assigned to the selected users
        
    -   A button for creating a new task (request)
        
    -   The list shows the title, description, assigned person, creator, creation date, and completion status
        
    -   Each customer can only see their own tasks
        
2.  **Task Creation Screen**
    
    -   Title, description, file upload, customer, priority level, category, project (optional), assigning a user
        
    -   If the priority is “urgent,” the end date is automatically set to 1 day later; if it is “soon,” 3 days later; and if it can “wait,” 6 months later
        
    -   If a task is created from the project screen, the project selection is automatically made, and the customer becomes the customer of that project
        
3.  **Task Editing Screen**
    
    -   Title, description, file upload, priority level, category, project (optional), and user assignment can be edited
        
    -   If a task is linked to a project, the project and customer cannot be changed
        
4.  **Task Detail Screen**
    
    -   Title, description, category, customer, completion status, priority, start-end dates, the linked project (if any), file attachments, assigned users, and comments
        
    -   Adding comments, uploading files
        
    -   Viewing the task’s history
        
    -   Depending on permission, the task can be edited, deleted, or completed
        

### Project Screens

1.  **Project List Screen**
    
    -   List projects in a specific date range
        
    -   List projects assigned to the selected users
        
    -   A button for creating a new project
        
    -   The list shows the title, description, assigned person, creator, creation date, and completion status
        
    -   Each customer can only see their own projects
        
2.  **Project Creation Screen**
    
    -   Title, description, file upload, customer, priority level, category, user assignment, task assignment (optional), selection of start and end dates
        
    -   Task assignment is only done from the list of tasks linked to that customer
        
3.  **Project Editing Screen**
    
    -   Title, description, file upload, priority level, category, user assignment, selection of start and end dates, task assignment (optional)
        
    -   When the customer changes, previously assigned tasks are automatically removed, and a list of tasks linked to the new customer is displayed
        
4.  **Project Detail Screen**
    
    -   Title, description, category, customer, completion status, priority, start-end dates, assigned tasks (if any), file attachments, assigned users, and comments
        
    -   Adding comments, uploading files
        
    -   Viewing the project’s history
        
    -   Depending on permission, the project can be edited, deleted, or completed
        
    -   Assigning tasks belonging to that customer to the project and creating a new task linked to the project
        

### Analysis Screen

-   Accessible to all roles except the customer
    
-   Statistical distributions of projects and tasks (numbers of completed/ongoing, etc.)
    
-   Total number of users (excluding the Customer role)
    
-   Distributions of task and project statuses (Pie Chart)
    
-   User performances (Bar Chart)
    
-   A list of all tasks: completion status, start and end dates, with an option to filter by assigned users
    

### Profile Screen

-   Displays the user’s name, email, and role information
    
-   Users can change their password
    

### Dashboard Screen

-   Total number of tasks (if the user has the Customer role, only their own tasks)
    
-   Number of completed tasks (if the user has the Customer role, only their own tasks)
    
-   Number of projects (if the user has the Customer role, only their own projects)
    
-   Total number of users (viewable by roles other than customer)
    
-   Distributions of task and project statuses (Pie Chart)
    
-   A list of tasks with approaching end dates (if the user has the Customer role, only their own tasks)
    
-   Recently added tasks (if the user has the Customer role, only their own tasks)
    
-   Recently added projects (if the user has the Customer role, only their own projects)
    
-   Buttons to create tasks and projects
    
-   Button to go to the analysis screen (excluding the customer)
    

### Admin Panel

-   **User List**
    
    -   Filtering by role
        
    -   Deleting a user (only in Firestore)
        
    -   Editing user information (only in Firestore)
        
    -   Changing the user’s role: when the role changes, the user’s data is moved to the relevant Firestore collection
        
    -   Creating a user
        
-   **Project List**
    
    -   The project name, customer, and buttons that perform actions (editing or deleting the project)
        
    -   Creating a new project
        
    -   Filtering projects by customer
        
-   **Task List**
    
    -   The task name, assigned employee, and buttons that perform actions (editing or deleting the task)
        
    -   Creating a new task
        
    -   Filtering tasks by employee
        

> Deletion and editing operations occur on Firestore.  
> To make changes on Firebase Authentication, the `firebase-admin` feature is required.

----------

## Role and Permission Management

1.  **Admin**
    
    -   User: Creating, editing, listing
        
    -   Project: Listing, creating, editing, deleting, completing, assigning tasks, assigning people, commenting, uploading files, viewing history
        
    -   Task: Listing, creating, editing, deleting, completing, assigning people, commenting, uploading files, viewing history
        
    -   Access to the admin panel
        
    -   Access to the analysis screen
        
    -   Change password
        
2.  **Manager**
    
    -   User: Creating, editing
        
    -   Project: Listing, creating, editing, deleting, completing, assigning tasks, assigning people, commenting, uploading files, viewing history
        
    -   Task: Listing, creating, editing, deleting, completing, assigning people, commenting, uploading files, viewing history
        
    -   Access to the analysis screen
        
    -   Change password
        
3.  **Employee**
    
    -   Project: Listing, assigning tasks, commenting, uploading files, assigning people, completing, viewing history
        
    -   Task: Listing, commenting, uploading files, assigning people, completing, viewing history
        
    -   Access to the analysis screen
        
    -   Change password
        
4.  **Customer**
    
    -   Project: Listing, creating, editing, deleting, completing, assigning tasks, assigning people, commenting, uploading files, viewing history
        
    -   Task: Listing, creating, editing, deleting, completing, assigning people, commenting, uploading files, viewing history
        
    -   Access to the analysis screen
        
    -   Change password
        

----------

## Design and User Experience

The design and user experience of this application have been addressed with the following approaches:

1.  **Ant Design Components**
    
    -   **Ant Design** library is used in the application interface. Forms, tables (Table), buttons (Button), and other UI elements provide a standard look and consistency.
        
    -   A **responsive** design has been implemented using Ant Design’s grid system and ready-made design elements.
        
2.  **Dark/Light Mode**
    
    -   Users can switch between **dark or light themes** based on their preference. The themes update design elements (background, text colors, etc.) instantly.
        
3.  **Responsive Design**
    
    -   **Media queries** and Ant Design’s grid system are used to ensure an optimal view on desktop, tablet, and mobile devices.
        
    -   Tables, cards, and charts adapt to the screen size.
        
4.  **User-Friendly Forms and Validation**
    
    -   **Ant Design**’s `Form` component and `rules` prop are used for validation in task and project creation/edit forms.
        
    -   Real-time feedback is provided for incorrect or missing fields.
        
5.  **Data Visualization with Charts**
    
    -   **Chart.js** and **react-chartjs-2** are used to visually track the status of tasks and projects, as well as user performance, through pie charts and bar charts.
        
6.  **Clear and Consistent Navigation**
    
    -   Through a side or top menu bar, **menu items** (Tasks, Projects, Analysis, Admin Panel, etc.) are shown dynamically based on the user’s role, ensuring comfortable navigation.
        
7.  **Notifications and Feedback**
    
    -   By using Ant Design’s `notification` or `message` components, the user is instantly informed of the results of actions (successful operation, error, warning, etc.).
        
8.  **Performance-Focused Approach**
    
    -   Asynchronous operations are managed with Redux Thunk, avoiding unnecessary re-renders.
        
    -   Real-time updates with Firebase provide **fast data changes**.
        

Thus, the user interface is both **visually satisfactory** and provides a **comfortable experience** across different device sizes.

----------

## Used Technologies and Dependencies


-   **Frontend:**
    -   [React](https://reactjs.org/): For building user interfaces.
    -   [Redux](https://react-redux.js.org/): For state management.
    -   [Chart.js](https://www.chartjs.org/) and [react-chartjs-2](https://react-chartjs-2.js.org/): For charts.
    -   [Redux Thunk](https://github.com/reduxjs/redux-thunk): Middleware for handling asynchronous actions.
    -   [Ant Design](https://ant.design/): UI components and design system.
    -   [React Router](https://reactrouter.com/): For client-side routing.
-   **Backend Services:**
    -   [Firebase Firestore](https://firebase.google.com/): Realtime database.
    -   [Firebase Authentication](https://firebase.google.com/): User authentication.
    -   [Cloudinary](https://cloudinary.com/): File upload and storage service.
-   **Other Tools and Libraries:**
    -   [Axios](https://axios-http.com/): For HTTP requests.
    -   [React Icons](https://react-icons.github.io/react-icons/): For icons.
    -   [Formik](https://formik.org/): For form management.

## Installation

1.  **Clone the source:**
    
    git clone https://github.com/kullanici/task-management-pro.git
    
2.  **Go to the directory:**
    
    cd task-management-pro
    
3.  **Install the dependencies:**
    
    npm install
    
4.  **Edit the environment variables (.env)** (See the Environment Variables section below).
    
5.  **Start the development environment:**
    
    npm start
    
    By default, the project will run at `http://localhost:3000`.
    

## Environment Variables

In this project, environment variables are used for Firebase and Cloudinary service credentials, defined in a `.env` file. An example `.env` template might look like this:

```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...

REACT_APP_CLOUDINARY_CLOUD_NAME=...
REACT_APP_CLOUDINARY_UPLOAD_PRESET=...
```

> **Note**: The service account file or token information used by `firebase-admin` should not be shared within the project for security reasons. It is recommended to keep it on the server side or in a secure environment.

## Usage

1.  **Log in to the application** (you can register or create a user through the admin panel).
    
2.  The **menus and permissions** you see will vary according to your role.
    
3.  Go to the relevant menu to **create a Task or Project** and click the “Create” button.
    
4.  To **edit**, select the relevant record from the list screen and click the edit button.
    
5.  Actions such as **completion** or **deletion** are also displayed based on your role.
    
6.  In the **Admin Panel**, you can manage users, projects, and tasks (create a user, change roles, delete, etc.).
    
7.  Through the **Analysis Screen**, you can view statistics of projects and tasks with charts (only users other than the customer role).
    
8.  You can **switch between Dark/Light mode** by pressing the relevant button.
    
9.  For a **responsive** experience, you can test the application on mobile or different screen sizes.

## License

For detailed information about this project’s license, please see the LICENSE file (if not available, adding one is recommended).
