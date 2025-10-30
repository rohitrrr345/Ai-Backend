# 🚀 Lead Scoring Backend Service

This project is a **Node.js + Express** backend service designed to automate and enhance the lead qualification process. It handles the processing of raw lead data from CSV files, persists the data in a **MongoDB** database, and utilizes the **Gemini AI** (`@google/genai`) to apply advanced analysis for generating highly accurate lead scores and intent labels.

---

## ✨ Features

* **CSV File Upload & Parsing:** Robust handling and parsing of uploaded CSV files containing lead data.
* **Hybrid Lead Scoring:** Combines a deterministic **Rule Layer** (up to 50 points based on role/industry) and an **AI Layer** (up to 50 points based on intent analysis).
* **AI-Based Intent Classification:** Uses **Gemini 2.5 Flash** for deep analysis of lead profiles (e.g., LinkedIn Bio) against specific offer details to classify buying intent (**High/Medium/Low**) and provide reasoning.
* **MongoDB Integration:** Uses **Mongoose** for structured schema design and persistence of lead records and scores.
* **RESTful API:** Provides clear endpoints for file submission and accessing processed lead data.

---

## 🛠️ Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Backend Runtime** | **Node.js** | JavaScript runtime environment. |
| **Web Framework** | **Express.js** | Fast, unopinionated, minimalist web framework for Node.js. |
| **Database** | **MongoDB** | NoSQL database for flexible data storage. |
| **Database ODM** | **Mongoose** | MongoDB object modeling for Node.js. |
| **Artificial Intelligence** | **@google/genai (Gemini AI)** | Used for the Lead Scoring AI Layer. |
| **File Handling** | **Multer** | Middleware for handling `multipart/form-data` (file uploads). |
| **Data Processing** | **CSV Parser** | Utility for efficiently processing uploaded CSV data. |
| **Configuration** | **Dotenv** | Manages environment variables securely. |

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/lead-scoring-backend.git](https://github.com/your-username/lead-scoring-backend.git)
cd lead-scoring-backend



Install dependencies
npm install


Env Variables 

# Application Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/lead_scoring

# Google Gemini API Key
# Get your key from Google AI Studio
GEMINI_API_KEY=your_gemini_api_key_here


RUN THE SERVER

npm start
# The server will start on http://localhost:5000 (or your specified PORT)



Method,Path,Description
POST,/api/v1/leads/upload-score,"Accepts a multipart/form-data request with a CSV file. It processes, scores, and saves leads to MongoDB."