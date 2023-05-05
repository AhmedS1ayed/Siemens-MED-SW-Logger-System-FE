import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './MetaDataCard.css';

export default function MetaDataCard({ keys, values }) {
  const [expanded, setExpanded] = React.useState(Array(keys.length).fill(false));

  const handleChange = (panel) => (event, isExpanded) => {
    const newExpanded = [...expanded];
    newExpanded[panel] = isExpanded;
    setExpanded(newExpanded);
  };

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {keys &&
        keys.map((key, idx) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={idx}>
              <Accordion
                expanded={expanded === key}
                onChange={handleChange(`${key}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography>{key}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{values[idx]}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
    </Grid>
  );
}