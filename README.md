"# CitizenConnect - Citizen-Politician Interaction Platform

## 🚀 Quick Start

**See [SETUP_GUIDE.md](SETUP_GUIDE.md) for complete setup and deployment instructions.**

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Git

### Local Development
```bash
# Backend
cd backend && ./mvnw.cmd spring-boot:run

# Frontend (in new terminal)
cd frontend && npm install && npm run dev
```

**Backend**: http://localhost:8080  
**Frontend**: http://localhost:5174

### Testing Registration
1. Go to http://localhost:5174/register
2. Fill in the form and submit
3. Login with your credentials
4. Explore the dashboard

## 📋 Features

✅ User Registration (4 roles)  
✅ JWT Authentication  
✅ Issue Management  
✅ Politician Updates  
✅ Feedback System  
✅ Admin Dashboard  
✅ File Upload  
✅ Email Notifications  
✅ Swagger API Docs  

## 📁 Project Structure

```
Citizen_Connect/
├── backend/          # Spring Boot API
├── frontend/         # React + Vite
├── Dockerfile        # Docker configuration
├── vercel.json       # Vercel deployment
└── SETUP_GUIDE.md    # Detailed setup guide
```

## 🔗 Useful Links

- **Setup Guide**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **API Docs**: [Backend Endpoints](backend/CITIZEN_POLITICIAN_ENDPOINTS.md)
- **Integration**: [Frontend Integration Guide](backend/FRONTEND_INTEGRATION_GUIDE.md)

## 🛠️ Troubleshooting

See [SETUP_GUIDE.md - Troubleshooting Section](SETUP_GUIDE.md#troubleshooting)

## 📦 Deployment

### Docker
```bash
docker build -t citizen-connect .
docker run -p 8080:10000 citizen-connect
```

### Production
See [SETUP_GUIDE.md - Production Deployment](SETUP_GUIDE.md#production-deployment)

---
**Created with ❤️ for Citizen-Politician Interaction**" 
