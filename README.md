
# Task Management System Project

This project is a task management system where users can create tasks, assign them, add comments, and upload files. It is developed using modern web technologies and is designed to be scalable and efficient.

Note: The project is under development.

## **Table of Contents**

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation and Setup](#installation-and-setup)
    -   [Prerequisites](#prerequisites)
    -   [Cloning the Project](#cloning-the-project)
    -   [Setting Up Environment Variables](#setting-up-environment-variables)
    -   [Installing Dependencies](#installing-dependencies)
    -   [Running the Application](#running-the-application)
-   [Usage](#usage)

## **Features**

-   **Task Creation and Editing:**
    -   Create new tasks with titles, descriptions, and assign them to users.
    -   Edit tasks, mark them as completed, or delete them.
-   **File Attachment to Tasks:**
    -   Add file attachments when creating or editing tasks.
    -   Uploaded files are stored on Cloudinary and displayed in task details.
-   **Adding Comments and File Uploads:**
    -   Add comments to tasks and attach files to comments.
    -   Comments are displayed with timestamps and author information.
-   **User and Customer Management:**
    -   Assign tasks to users or customers.
    -   Dynamic loading and selection of user and customer lists.
-   **History Tracking:**
    -   All changes to tasks are logged and viewable through the history module.
-   **Responsive Design:**
    -   The application is responsive and adapts to different screen sizes.
-   **Secure Authentication:**
    -   User login and security are managed using Firebase Authentication.
-   **Dark and Light Mode Support:**
    -   Users can switch between dark and light themes for better visual comfort.
    -   The theme preference is saved and persists across sessions.

## **Technologies Used**

-   **Frontend:**
    -   [React](https://reactjs.org/): For building user interfaces.
    -   Redux: For state management.
    -   [Redux Thunk](https://github.com/reduxjs/redux-thunk): Middleware for handling asynchronous actions.
    -   [Ant Design](https://ant.design/): UI components and design system.
    -   [React Router](https://reactrouter.com/): For client-side routing.
-   **Backend Services:**
    -   Firebase Firestore: Realtime database.
    -   Firebase Authentication: User authentication.
    -   [Cloudinary](https://cloudinary.com/): File upload and storage service.
-   **Other Tools and Libraries:**
    -   [Axios](https://axios-http.com/): For HTTP requests.
    -   React Icons: For icons.
    -   [Formik](https://formik.org/): For form management.
 
## **Installation and Setup**

### **Prerequisites**

-   **Node.js and NPM:** [Node.js](https://nodejs.org/) version 14 or higher.
-   **Firebase Account:** Create a project on Firebase Console.
-   **Cloudinary Account:** Sign up for a free account at Cloudinary.

### **Cloning the Project**

bash

Kodu kopyala

`git clone https://github.com/yourusername/task-management-system-pro.git
cd task-management-system-pro` 

### **Setting Up Environment Variables**

Create a `.env` file in the root directory of the project and add the following configurations:

env

Kodu kopyala

`REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset` 

**Note:** Replace the `your_*` placeholders with your actual Firebase and Cloudinary account details.

### **Installing Dependencies**

bash

Kodu kopyala

`npm install` 

### **Running the Application**

bash

Kodu kopyala

`npm start` 

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## **Usage**

### **1. User Login and Registration**

-   On the homepage, log in if you have an existing account or create a new one.

### **2. Creating a Task**

-   Navigate to the **Tasks** page and click on the **Create New Task** button.
-   Fill in the task title, description, assignees, and file attachments.
-   Click the **Create** button to add the task.

### **3. Task Details**

-   Click on a task from the task list to view its details.
-   You can view, edit, or delete task information.
-   Add comments and upload files within the task details.

### **4. Adding Comments**

-   In the task detail page, use the **Add Comment** section to write your comment.
-   Attach files if needed.
-   Click **Submit** to add your comment.

### **5. Viewing Task History**

-   In the task detail page, click on the history button to view all changes and comments related to the task.
