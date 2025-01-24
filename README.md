---

# Fashion AI Wardrobe Assistant

## Overview
The **Fashion AI Wardrobe Assistant** is an innovative application designed to help users digitize and manage their wardrobes, generate outfit suggestions, and receive personalized clothing recommendations. It combines **Next.js** for the frontend, **MongoDB** for the database, and the **Gemini API** for AI-driven outfit generation.

---

## Features
1. **Wardrobe Digitization via AI Scanning**
   - Users can upload images or capture photos of their clothing items.
   - Categorizes items (e.g., tops, shoes) and tags them with attributes like color, style, and occasion.

2. **Infinite Outfit Generator**
   - Generates tailored outfit suggestions based on the user’s wardrobe.
   - Uses the **Gemini API** to optimize outfit combinations for various occasions and purposes.


3. **Event & Weather-Based Styling**
   - Suggests outfits based on event types (e.g., casual outing, wedding) and real-time weather conditions.

4. **Sustainability Insights**
   - Encourages sustainable fashion by highlighting underused items and offering reuse suggestions.

---

## Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **API Integration**: [Gemini API](https://gemini.com/) (for outfit generation)
- **Styling**: TailwindCSS (or your preferred CSS framework)
- **Hosting**: Vercel (for Next.js deployment)

---

## Folder Structure

├── public/
│   └── images/         
├── src/
│   ├── components/      
│   ├── pages/           
│   │   ├── api/       
│   │   ├── wardrobe/   
│   │   ├── shop/       
│   │   └── index.js     
│   ├── styles/          
│   ├── utils/           
│   └── hooks/           
├── .env.local         
└── package.json        


---

## Setup Instructions

### 1. Clone the Repository

git clone <repository-url>
cd <repository-folder>


### 2. Install Dependencies

npm install


### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following variables:

MONGODB_URI=<your-mongodb-connection-string>
GEMINI_API_KEY=<your-gemini-api-key>
NEXT_PUBLIC_BASE_URL=http://localhost:3000


### 4. Start the Development Server

npm run dev

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Key Functionalities

### 1. **Wardrobe Digitization**
- **Backend API**: `/api/wardrobe/upload`
  - Accepts images uploaded via the frontend.
  - Stores items in MongoDB with tags (e.g., type: "shirt", color: "blue").
  
### 2. **Outfit Generator**
- **Gemini Integration**:
  - Fetch outfit combinations using the **Gemini API**.
  - API Endpoint: `/api/outfits/generate`
  - Inputs:
    - Event type (e.g., "office", "wedding").
    - Weather conditions (optional).
    - Existing wardrobe items (fetched from MongoDB).

### 3. **Smart Shopping Recommendations**
- **Logic**:
  - Analyze wardrobe data to identify missing categories.
  - Fetch recommendations using shopping APIs (e.g., Amazon or eBay).
- **API Endpoint**: `/api/shop/recommend`

---

## Deployment

### 1. Deploying to Vercel
1. Log in to [Vercel](https://vercel.com/) and import the repository.
2. Set up environment variables in the Vercel dashboard.
3. Deploy the project with one click.

---

## Future Enhancements
- Integration with weather APIs for real-time weather-based styling.
- AI-powered trend analysis and seasonal recommendations.
- Social sharing of outfits and styles.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
- **Next.js** for providing a robust framework for building the frontend.
- **MongoDB** for powering the database.
- **Gemini API** for outfit generation and AI-driven insights.


---
