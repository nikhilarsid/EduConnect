EdTech Backend App
Features:
  User Authentication: Secure login and signup with JWT.
  Course Management: Create, update, delete, and fetch courses.
  Section and Subsection Management: Add, update, and remove sections and subsections within courses.
  OTP Verification: Verify user signups with OTP sent via email.
  File Uploads: Handle file uploads with Cloudinary.
  Profile Management: Manage user profiles including fetching and updating user details.
  Error Handling: Centralized error handling middleware.

Technologies Used:
  Node.js: JavaScript runtime environment.
  Express.js: Web framework for Node.js.
  MongoDB: NoSQL database.
  Mongoose: MongoDB object modeling for Node.js.
  JWT: JSON Web Token for authentication.
  Bcrypt: Password hashing.
  Nodemailer: Sending emails for OTP verification.
  Cloudinary: Image and video upload management.
  dotenv: Environment variables management.
  Express-fileupload: File upload middleware for Express.

Setup and Installation:
  git clone https://github.com/nikhilarsid/edtech-backend-app.git
  cd edtech-backend-app
  npm install

Api Endpoints:
  POST /api/user/signup - User signup
  POST /api/user/login - User login
  POST /api/course - Create a course
  PUT /api/course/:id - Update a course
  DELETE /api/course/:id - Delete a course
  GET /api/course - Fetch all courses
  POST /api/section - Create a section
  PUT /api/section/:id - Update a section
  DELETE /api/section/:id - Delete a section
  POST /api/subsection - Create a subsection
  PUT /api/subsection/:id - Update a subsection
  DELETE /api/subsection/:id - Delete a subsection
  GET /api/profile - Fetch user profile
  PUT /api/profile - Update user profile
