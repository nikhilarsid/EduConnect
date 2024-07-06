# EdTech Backend App
## Features
- User Authentication: Secure login and signup with JWT.
- Course Management: Create, update, delete, and fetch courses.
- Section and Subsection Management: Add, update, and remove sections and subsections within courses.
- OTP Verification: Verify user signups with OTP sent via email.
- File Uploads: Handle file uploads with Cloudinary.
- Profile Management: Manage user profiles including fetching and updating user details.
- Error Handling: Centralized error handling middleware.
## Technologies Used
- Node.js: JavaScript runtime environment.
- Express.js: Web framework for Node.js.
- MongoDB: NoSQL database.
- Mongoose: MongoDB object modeling for Node.js.
- JWT: JSON Web Token for authentication.
- Bcrypt: Password hashing.
- Nodemailer: Sending emails for OTP verification.
- Cloudinary: Image and video upload management.
- dotenv: Environment variables management.
- Express-fileupload: File upload middleware for Express.
## Setup and Installation
1.Clone repository
```bash
git clone https://github.com/nikhilarsid/edtech-backend-app.git
cd edtech-backend-app
```
2.Install dependencies:
```bash
npm install
```
3.Setup environment variables:
Create a .env file in the root directory and add the following variables:
```bash
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
4.Start the server:
```bash
npm start
```
4.API Endpoints
- POST /api/user/signup - User signup
- POST /api/user/login - User login
- POST /api/course - Create a course
- PUT /api/course/:id - Update a course
- DELETE /api/course/:id - Delete a course
- GET /api/course - Fetch all courses
- POST /api/section - Create a section
- PUT /api/section/:id - Update a section
- DELETE /api/section/:id - Delete a section
- POST /api/subsection - Create a subsection
- PUT /api/subsection/:id - Update a subsection
- DELETE /api/subsection/:id - Delete a subsection
- GET /api/profile - Fetch user profile
- PUT /api/profile - Update user profile

## Some screenshots :
 ![Screenshot 2024-07-06 194012](https://github.com/nikhilarsid/edtech-backend-app/assets/128669883/3e79f5e0-a81c-468a-a675-1afda779919d)
![Screenshot 2024-07-06 194051](https://github.com/nikhilarsid/edtech-backend-app/assets/128669883/3cf66939-d612-4b45-bcc2-3c1304788139)
![Screenshot 2024-07-06 194130](https://github.com/nikhilarsid/edtech-backend-app/assets/128669883/512a7928-eacd-46e0-b25c-66d04f9fbf23)
![Screenshot 2024-07-06 194206](https://github.com/nikhilarsid/edtech-backend-app/assets/128669883/c97eed11-d87e-4a87-9087-cf1cd0e3293a)
![Screenshot 2024-07-06 194354](https://github.com/nikhilarsid/edtech-backend-app/assets/128669883/be4de428-cc3e-405c-af84-9b267f03dc94)
![Screenshot 2024-07-06 194416](https://github.com/nikhilarsid/edtech-backend-app/assets/128669883/fba650e4-52fc-494c-93e7-87a20ed49af0)
![Screenshot 2024-07-06 194457](https://github.com/nikhilarsid/edtech-backend-app/assets/128669883/5bdefab6-1cae-4cda-afc3-48d04995f4c8)
![Screenshot 2024-07-06 194518](https://github.com/nikhilarsid/edtech-backend-app/assets/128669883/5ca36c03-5edd-4cf3-9ef2-a2174bcde4bd)
 

