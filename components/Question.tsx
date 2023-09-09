'use client'

import { QuestionType } from "@custom-types/question-type";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { CustomButton } from "./CustomButton";

export const Question: FC<QuestionType> = ({
  id,
  creator,
  content,
  tags,
  section,
}) => {
  return (
    // <div>
    //   <p>{content}</p>
    //   <p>{tag}</p>
    //   <p>{section}</p>
    // </div>
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {section}
      </Typography>
      <Typography variant="h5" component="div">
      {content}
        
      </Typography>
      {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
       {tags.map}
      </Typography> */}
      
    </CardContent>
    <CardActions>
      <CustomButton>Learn More</CustomButton>
    </CardActions>
  </Card>
  );
};
