
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "../styles/Response.css";

const Response = () => {
  const [itinerary, setItinerary] = useState("");

  useEffect(() => {
    const savedItinerary = localStorage.getItem("itinerary");
    console.log("Raw itinerary from storage: ", savedItinerary); // Debug to see the actual format

    // Handle escaped newlines if they exist
    const formattedItinerary = savedItinerary
      ? savedItinerary.replace(/\\n/g, "\n") // Handle possible escaped newlines
      : "No itinerary available.";

    console.log(
      "Formatted itinerary with actual newlines: ",
      formattedItinerary
    );
    setItinerary(formattedItinerary);
  }, []);

  // Function to replace **bold** with HTML <strong> tags
  const boldify = (text) => {
    const boldPattern = /\*\*(.*?)\*\*/g; // Regular expression to match **text**
    return text.replace(boldPattern, "<strong>$1</strong>"); // Replace with <strong> tags
  };

  // Function to format and map each line to appropriate Typography component
  const formatItinerary = (itinerary) => {
    const lines = itinerary.split("\n");
    console.log("Lines after splitting: ", lines); // Debugging

    return lines.map((line, index) => {
      if (line.trim() === "") {
        return <br key={index} />; // Add line breaks for empty lines
      } else if (line.startsWith("*")) {
        // Handle bullet points
        return (
          <Typography
            key={index}
            variant="body1"
            component="li"
            dangerouslySetInnerHTML={{
              __html: boldify(line.replace("* ", "")),
            }}
            gutterBottom
            sx={{ fontSize: '15px' }} // Increased font size for bullet points
          />
        );
      } else {
        // For regular lines
        return (
          <Typography
            key={index}
            variant="body1"
            component="p"
            dangerouslySetInnerHTML={{ __html: boldify(line) }}
            gutterBottom
            sx={{ fontSize: '12px' }} // Increased font size for regular lines
          />
        );
      }
    });
  };

  return (
    <div className="response-container">
      <Typography 
        variant="h4" 
        component="h2" 
        align="center" 
        gutterBottom
        sx={{ fontFamily: 'fantasy', fontSize: '50px' }} // Font size for title
      >
        Your Generated Travel Itinerary
      </Typography>

      <Card className="itinerary-card">
        <CardContent>
          <Box mt={2}>
            <ul>{formatItinerary(itinerary)}</ul>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Response;
