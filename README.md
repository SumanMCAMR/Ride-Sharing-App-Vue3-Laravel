# Ride Sharing App Vue.js, Laravel, MySQL

**Ride-sharing App**

This ride-sharing app is built using Vue.js, Laravel, and MySQL. It uses a variety of other frameworks and libraries, including:
* Vue.js
* Pinia Store (Vue 3)
* Laravel
* Pusher and Echo for broadcast
* Twilio for OTP verification
* Maska for input mask

The app allows users to request rides, track their drivers, and pay for their rides using their mobile phones. It also includes features for drivers, such as the ability to accept and reject ride requests, navigate to pickup and drop-off locations, and track their earnings.

To use the app, users simply create an account using mobile number and enter their pickup and drop-off locations. The app will then match them with a driver who is nearby. Once the driver accepts the request, the user can track their progress on the map and see their estimated arrival time.

When the ride is complete, the user can pay the driver using their mobile phone(Needed). The app also allows users to rate their drivers and provide feedback.

This ride-sharing app is a fully functional and scalable solution for providing ride-hailing services. It is easy to use and provides a variety of features for both riders and drivers.

**Instructions**

To install and run the app, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies:

```
//Frontend
npm install
```
```
//Backend
Composer install
```

3. Create a `.env` file and add the following configuration variables:

```
DB_HOST=localhost
DB_DATABASE=rideshare_app
DB_USERNAME=root
DB_PASSWORD=password
BROADCAST_DRIVER=pusher

PUSHER_APP_ID=App_ID
PUSHER_APP_KEY=App_key
PUSHER_APP_SECRET=App_Secret
PUSHER_HOST=127.0.0.1
PUSHER_PORT=Port (mostly 6001)
PUSHER_SCHEME=http
PUSHER_APP_CLUSTER=ap2

TWILIO_AUTH_TOKEN=Auth_Token
TWILIO_ACCOUNT_SID=Account_Sid
TWILIO_FROM=Number From twilio
TWILIO_PHONE_NUMBER=Number From twilio
```

4. Start the development server:
_--You have to start 3 diffrent terminals_
   
**Backend**
```
php artisan serve
```
**Brodcast**
```
php artisan websocket:serve
```
**Frontend**
```
npm run dev
```

5. Open your web browser and navigate to `http://localhost:5173`.

You can now create an account and start using the app.

**Contributing to the Ride-Sharing App**

We welcome contributions to the Ride-Sharing App repository! Here are a few ways to get involved:

* **Report bugs and suggest improvements.** If you find a bug or have an idea for how to improve the app, please open an issue on GitHub.
* **Write code.** If you're a developer, you can fork the repository and submit a pull request with your changes. Please be sure to follow our code style guide and test your changes thoroughly.
* **Contribute to the documentation.** If you have experience with Vue.js, Laravel, or MySQL, you can help us improve the documentation for the Ride-Sharing App.

**Getting Started**

To get started contributing, please fork the repository and create a new branch for your changes. Once you've made your changes, commit them to your branch and push the branch to GitHub. Then, you can create a pull request to submit your changes for review.

**Code Style Guide**

The Ride-Sharing App uses the Vue.js and Laravel style guides. Please follow these guides when writing code for the app.

**Testing**

Please test your changes thoroughly before submitting a pull request. You can use the unit tests, integration tests, and end-to-end tests that are included in the project.

**Thank You❤️!**

Thank you for your interest in contributing to the Ride-Sharing App! We appreciate your help in making the app better for everyone.

**Happy coding and ride-sharing! 🚗🚲🛴**

