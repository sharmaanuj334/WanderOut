
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "../styles/Response.css";
import { List, ListItem } from '@mui/material';

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

  const formatItinerary = (itinerary) => {
    const lines = itinerary.split("\n");
    console.log("Lines after splitting: ", lines); // Debugging

    return lines.map((line, index) => {
        if (line.trim() === "") {
            return <br key={index} />; // Add line breaks for empty lines
        } else if (line.startsWith("*")) {
            // Handle bullet points
            return (
                <ListItem key={index} sx={{ padding: '0' }}> {/* Remove default padding */}
                    <Typography
                        variant="body1"
                        component="span"
                        dangerouslySetInnerHTML={{
                            __html: boldify(line.replace("* ", "")),
                        }}
                        sx={{ fontSize: '16px', marginBottom: '8px' }} // Increased font size and margin
                    />
                </ListItem>
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
                    sx={{ fontSize: '14px', marginBottom: '12px' }} // Consistent font size with spacing
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
        sx={{ fontFamily: 'Cursive', fontSize: '50px' }} // Font size for title
      >
        Your Itinerary
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
