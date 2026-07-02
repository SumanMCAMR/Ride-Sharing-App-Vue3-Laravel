# 🚗 Ride-Sharing App - Vue 3 & Laravel

A modern, fully-functional ride-sharing application built with Vue 3 and Laravel. This scalable solution provides a complete platform for ride-hailing services with real-time updates, OTP verification, and comprehensive features for both riders and drivers.

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Running the Application](#-running-the-application)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### For Riders
- 📱 **Mobile-First Account Creation** - Sign up using mobile number verification
- 📍 **Real-Time Location** - Pick pickup and drop-off locations with ease
- 🔄 **Automatic Driver Matching** - Get matched with nearby available drivers
- 🔍 **Live Driver Tracking** - Track your driver's location in real-time
- 💳 **Seamless Payment** - Pay directly through the app
- ⭐ **Driver Ratings** - Rate and provide feedback to drivers
- 🔐 **OTP Verification** - Secure two-factor authentication

### For Drivers
- ✅ **Ride Requests** - Accept or reject incoming ride requests
- 📍 **Route Optimization** - Efficient navigation with real-time updates
- 💰 **Earnings Tracking** - Monitor your income
- ⭐ **Rider Feedback** - Build your reputation through ratings

### General
- 🔔 **Real-Time Notifications** - WebSocket-based instant updates
- 🌍 **Scalable Architecture** - Built for growth and high traffic
- 🛡️ **Secure Authentication** - Robust user verification system

---

## 🛠️ Tech Stack

### Frontend (Vue 3 - 17%)
- **Vue 3** - Progressive JavaScript framework with Composition API
- **Vite** - Next-generation frontend build tool
- **Pinia Store** - State management for Vue 3
- **Maska** - Input masking for forms
- **JavaScript** - ES6+ for enhanced functionality
- **Responsive Design** - Mobile-first UI

### Backend (Laravel & PHP - 53.6%)
- **Laravel** - PHP web application framework
- **Blade** - Laravel templating engine (17.3%)
- **MySQL** - Relational database
- **Eloquent ORM** - Object-Relational Mapping
- **RESTful API** - Clean API architecture

### Real-Time Communication
- **Pusher** - WebSocket service for real-time updates
- **Laravel Echo** - Broadcasting library for WebSocket integration

### External Services
- **Twilio** - OTP verification and SMS services

### Additional
- **Composer** - PHP dependency manager
- **npm** - JavaScript package manager

---

## 📁 Project Structure

```
Ride-Sharing-App-Vue3-Laravel/
├── backend/                    # Laravel API Server
│   ├── app/                   # Application logic
│   ├── database/              # Migrations and seeders
│   ├── routes/                # API routes
│   ├── .env.example           # Environment template
│   └── ...
├── frontend/                  # Vue 3 Application
│   ├── src/
│   │   ├── components/        # Vue components
│   │   ├── stores/            # Pinia state management
│   │   ├── views/             # Page views
│   │   └── App.vue            # Root component
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **PHP** (v8.0 or higher) - [Download](https://www.php.net/)
- **Composer** - [Download](https://getcomposer.org/)
- **MySQL** - [Download](https://www.mysql.com/)
- **Pusher Account** - [Sign up](https://pusher.com/) (free tier available)
- **Twilio Account** - [Sign up](https://www.twilio.com/) (free credits included)

### Clone the Repository

```bash
git clone https://github.com/SumanMCAMR/Ride-Sharing-App-Vue3-Laravel.git
cd Ride-Sharing-App-Vue3-Laravel
```

---

## ⚙️ Environment Setup

### 1. Backend Setup

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 2. Frontend Setup

```bash
cd ../frontend

# Install Node dependencies
npm install
```

### 3. Configure Environment Variables

Edit the `.env` file in the backend directory with your configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=rideshare_app
DB_USERNAME=root
DB_PASSWORD=your_password

# Pusher Configuration (Real-Time Broadcasting)
BROADCAST_DRIVER=pusher
PUSHER_APP_ID=your_app_id
PUSHER_APP_KEY=your_app_key
PUSHER_APP_SECRET=your_app_secret
PUSHER_HOST=127.0.0.1
PUSHER_PORT=6001
PUSHER_SCHEME=http
PUSHER_APP_CLUSTER=ap2

# Twilio Configuration (OTP Verification)
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_FROM=your_twilio_phone
TWILIO_PHONE_NUMBER=your_twilio_phone

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4. Database Setup

```bash
# Run migrations
php artisan migrate

# (Optional) Seed sample data
php artisan db:seed
```

---

## ▶️ Running the Application

**You need to run 3 separate terminals:**

### Terminal 1: Backend API Server
```bash
cd backend
php artisan serve
```
Server runs at: `http://localhost:8000`

### Terminal 2: WebSocket Broadcasting Server
```bash
cd backend
php artisan websocket:serve
```
WebSocket server runs at: `http://localhost:6001`

### Terminal 3: Frontend Development Server
```bash
cd frontend
npm run dev
```
Application runs at: `http://localhost:5173`

---

## 📖 Usage

1. **Create an Account**
   - Open `http://localhost:5173`
   - Sign up using your mobile number
   - Verify OTP received via SMS

2. **As a Rider**
   - Enter your pickup location
   - Select your drop-off destination
   - Wait for a driver to accept
   - Track driver in real-time
   - Complete payment
   - Rate your driver

3. **As a Driver**
   - Go online to accept rides
   - Accept or reject incoming requests
   - Navigate to pickup location
   - Complete the ride
   - Collect payment

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Steps to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Ride-Sharing-App-Vue3-Laravel.git
   cd Ride-Sharing-App-Vue3-Laravel
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow Vue.js and Laravel style guides
   - Write clean, well-commented code
   - Add tests for new features

4. **Commit your changes**
   ```bash
   git commit -m "Add: description of your changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to GitHub and create a PR
   - Provide a clear description of changes
   - Reference any related issues

### Guidelines
- Follow the existing code style
- Test your changes thoroughly
- Update documentation as needed
- Be respectful in discussions

### Ways to Contribute
- 🐛 **Report Bugs** - Found an issue? [Open an issue](https://github.com/SumanMCAMR/Ride-Sharing-App-Vue3-Laravel/issues)
- 💡 **Suggest Features** - Have an idea? [Start a discussion](https://github.com/SumanMCAMR/Ride-Sharing-App-Vue3-Laravel/discussions)
- 📝 **Improve Documentation** - Help others understand the project
- 💻 **Write Code** - Implement features or fix bugs
- ✅ **Test** - Help identify and fix issues

---

## 📊 Language Composition

- **PHP** - 53.6% (Backend logic)
- **Blade** - 17.3% (Templates)
- **Vue** - 17% (Frontend)
- **JavaScript** - 11.6% (Utilities & build scripts)
- **Other** - 0.5% (Config files)

---

## 🔒 Security

- OTP-based authentication
- Secure WebSocket connections
- Input validation on both client and server
- Database-agnostic migrations
- API authentication tokens

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## ❤️ Support & Feedback

If you find this project helpful, please consider:
- ⭐ **Starring the repository** - Show your support!
- 🔔 **Watching** - Get updates on new releases
- 💬 **Sharing** - Tell others about this project
- 🐛 **Reporting Issues** - Help improve the quality
- 🤝 **Contributing** - Become a collaborator

---

## 🎯 Roadmap

- [ ] Mobile app (React Native / Flutter)
- [ ] Advanced payment integration
- [ ] Machine learning for optimal matching
- [ ] Surge pricing algorithm
- [ ] Driver safety features
- [ ] Admin dashboard
- [ ] Analytics and reporting

---

## 🙏 Thank You!

Thank you for your interest in the Ride-Sharing App! Your support, contributions, and feedback help make this project better for everyone.

**Happy coding and ride-sharing! 🚗✨**

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/SumanMCAMR">SumanMCAMR</a></sub>
</div>
