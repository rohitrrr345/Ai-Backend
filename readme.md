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



## 🧠 API Endpoints

---

### 📩 **POST** `/offer/createOffer`

**Description:**  
Creates a new offer and returns the unique `offerId` that will be linked to subsequent lead uploads.

#### **Request Example**

```json
{
  "name": "AI Outreach Automation Suite",
  "value_props": ["Automate lead outreach", "Boost conversion rates"],
  "ideal_use_cases": ["B2B SaaS", "Marketing teams", "Sales automation"]
}




Response Example
{
  "message": "Offer created successfully",
  "offerId": "6724af8b9123cd47d8a1f9e5"
}





📤 POST /leads/upload/:offerId

Description:
Uploads a CSV file containing lead data associated with a specific offer.
The backend parses the CSV, processes each lead, and uses Gemini AI to calculate reasoning, intent, and lead scores.

Request

Content-Type: multipart/form-data

Body: file (CSV file)

Params: offerId (from /offer/createOffer response)

Response Example
[
  {
    "name": "Ava Patel",
    "role": "Head of Growth",
    "company": "FlowMetrics",
    "aiPoints": 50,
    "intent": "High",
    "score": 80,
    "reasoning": "The lead is a Head of Growth at a B2B SaaS company, an ideal target for AI outreach automation. Her LinkedIn bio explicitly states a focus on scaling through automation, directly aligning with the offer's core value."
  },
  {
    "name": "Liam Johnson",
    "role": "Marketing Director",
    "company": "AdNova",
    "aiPoints": 42,
    "intent": "Medium",
    "score": 67,
    "reasoning": "The lead manages marketing operations at a mid-sized firm. While relevant, there's limited evidence of AI adoption in their recent activities."
  }
]

⚙️ Processing Flow

Upload CSV file → Backend parses rows into JSON objects.

Each lead is analyzed using Gemini 2.5 Flash AI (@google/genai).

The AI model assigns:

intent → High | Medium | Low

score → Numeric value (0–100)

reasoning → Short AI-generated explanation

Processed leads are stored in MongoDB under their corresponding offerId.

The server responds with a structured JSON containing scored leads.
