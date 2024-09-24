# Travel Planning Application

## Overview
The Travel Planning Application is a cutting-edge platform designed to create personalized travel itineraries tailored to users' preferences. By leveraging the power of the MERN stack and machine learning, this application offers a seamless experience for planning your next adventure.

## Features
- **Personalized itinerary generation** based on user inputs
- **User-friendly interface** with responsive design
- **AI-powered recommendations** without reliance on third-party APIs
- **Scalable architecture** for future enhancements

## Technology Stack
- **Frontend**: React with Material UI
- **Backend**: Node.js and Express
- **Database**: MongoDB (infrastructure in place for future integration)
- **Machine Learning**: Custom internal model for itinerary generation

## Key Decisions
- **MERN Stack**: Chosen for its full JavaScript workflow and flexibility in handling various data types.
- **Internal Machine Learning Model**: Provides greater control over recommendations and eliminates dependency on external APIs.

## Challenges and Solutions

### Machine Learning Integration
- **Challenge**: Suboptimal results with AI21 Python library due to token limitations.
- **Solution**: Transitioned to Gemini API with fine-tuned prompts.

### Form Responsiveness
- **Challenge**: Poor rendering on larger screens.
- **Solution**: Implemented max-width and utilized Material UI's grid system with CSS media queries.

### Horizontal Scroll Issue
- **Challenge**: Longer text outputs caused horizontal scrolling.
- **Solution**: Applied CSS properties like word-wrap and white-space: pre-wrap.

### User Experience
- **Challenge**: Separate scroll bar in output section.
- **Solution**: Merged form and output into a single container with one vertical scroll bar.

### Deployment Complexity
- **Challenge**: Difficulties in integrating Python backend with React frontend.
- **Solution**: Streamlined deployment strategies for smoother integration.

## Potential Enhancements
- Customizable itineraries
- MongoDB integration for data persistence
- Advanced NLP improvements
- Offline access functionality
- Reference-Aided Generation (RAG)
- Live map integration

## Screenshots
### Homepage
![Homepage](frontend/src/assets/frontend1.png)

### Itinerary Response
![Response](frontend/src/assets/frontend2.png)

## Links
- **Live Site**: [Travel Planning Application](https://steady-treacle-ba6c03.netlify.app/)
- **Backend**: [Render Backend](https://wanderout.onrender.com/)

## Getting Started
(Instructions for setting up the project locally would go here)

## Contributing
(Guidelines for contributing to the project would go here)

## License
(License information would go here)

## Contact
(Contact information for the project maintainers would go here)
