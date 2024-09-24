from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import google.generativeai as genai  # Import Gemini API classes
from dotenv import load_dotenv  # Import load_dotenv to load environment variables

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is missing. Please add it to your environment variables.")

os.environ["GEMINI_API_KEY"] = api_key
# Set up API key for Gemini
app = Flask(__name__)

# CORS settings to allow requests only from the Netlify frontend
CORS(app, resources={r"/*": {"origins": "https://celebrated-tiramisu-9dcf29.netlify.app/"}})

# Function to call Gemini API with the generated prompt
def suggest_product_title(prompt):
    model = genai.GenerativeModel('gemini-1.5-flash')  # Use the appropriate model
    response = model.generate_content(prompt)
    return response.text

@app.route('/')
def home():
    return "Welcome to the Itinerary Generator API"

@app.route('/generate-itinerary', methods=['POST', 'OPTIONS'])
def generate_itinerary():
    
    if request.method == 'OPTIONS':
        # Extracting JSON data from the request
        data = request.json

        # Updated fields according to the new form data
        destination_country = data.get('destination_country')
        budget = data.get('budget')
        include_home_travel = data.get('include_home_travel')  # 'Yes' or 'No'
        state = data.get('state') if include_home_travel == 'Yes' else None
        district = data.get('district') if include_home_travel == 'Yes' else None
        number_of_people = data.get('number_of_people')
        number_of_days = data.get('number_of_days')
        travel_companions = data.get('travel_companions')  # 'Friends', 'Family', or 'Solo'
        trip_description = data.get('trip_description')
        travel_style = data.get('travel_style')  # 'Adventure', 'Religious', 'Scenery'
        travel_mode = data.get('travel_mode')  # 'Bus', 'Car', 'Bike', 'Train'
        additional_key_points = data.get('additional_key_points')

        # Constructing the dynamic prompt string
        prompt = f"""
                You are a highly experienced travel planner. Create a short but complete, day-by-day itinerary for a {number_of_days}-day trip to {destination_country}. 
                The total budget is {budget} USD, and the number of travelers is {number_of_people}. The group consists of {travel_companions}.

                If home-to-destination travel is included in the budget ({include_home_travel}), the starting point is from {state}, {district}. 
                Provide a seamless experience from the starting point to the destination and back if needed.

                The trip should be focused on a {travel_style} travel style, with transportation primarily via {travel_mode}. 
                Here's a brief description of the trip goal: "{trip_description}". 

                Incorporate the following additional key points: {additional_key_points}. 
                Ensure the trip is enjoyable, well-paced, and highlights the important experiences in {destination_country}. 
                Also try to incorporate activities to be done in that day if you feel so.
                But the output should strictly follow the example's pattern.
                
                Example - If they wish to visit beaches in madras for 3 days and budget is 600:
                Day1: 
                    Route : Hotel => Tiruvanmiur beach (10am) => Marina beach (2pm) => Night market (6pm) => Hotel (8pm)
                    Things to take care : Do not drink salt water of beach, also take care of tides
                    Expense breakdown: 170 expected
                        Food : 50
                        Accommodation : 100
                        Travel : 20
                Day 2:
                    Route: Hotel => Kapaleeshwarar Temple (8am) => Marina Beach (10am) => Muttukadu Boat House (12pm) => OMR Food Street (2pm) => Hotel (6pm)
                    Things to take care: Stay hydrated, apply sunscreen, and be cautious of your belongings at crowded places.
                    Expense breakdown: 200 expected
                        Food: 70
                        Accommodation: 100
                        Travel: 30
                Day 3:
                    Route: Hotel => San Thome Cathedral (8am) => Elliot's Beach (10am) => Dakshinachitra Art Village (1pm) => Shopping at Marina Mall (4pm) => Hotel (7pm)
                    Things to take care: Respect local customs at religious sites, and ensure to keep an eye on your time for activities.
                    Expense breakdown: 230 expected
                        Food: 80
                        Accommodation: 100
                        Travel: 50
                """

        # Call the Gemini API with the generated prompt
        ai_response = suggest_product_title(prompt)

        corrected_prompt = f"""
                        You are an expert travel advisor and language editor. I have an itinerary that was generated for a {number_of_days}-day trip to {destination_country}. 
                        Your task is to review and improve this itinerary. Please ensure that:

                        Here is the itinerary to review and refine:
                        {ai_response}

                        Please make the necessary changes and provide the refined version with all the above improvements.
                        """
        
        next_response = suggest_product_title(corrected_prompt)

        # Return the AI-generated result as JSON
        return jsonify({"itinerary": next_response})
    else:
        return jsonify({"itinerary": next_response})

if __name__ == '__main__':
    # The PORT environment variable is set by Render
    # We provide a default of 5000 for local development
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
