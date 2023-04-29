import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import './MetaDataCard.css';

export default function MetaDataCard({ keys, values }) {
  const [expanded, setExpanded] = React.useState(Array(keys.length).fill(false));

  const handleChange = (panel) => (event, isExpanded) => {
    const newExpanded = [...expanded];
    newExpanded[panel] = isExpanded;
    setExpanded(newExpanded);
  };

  return (
    <div className="meta-data-card__container">
      {keys &&
        keys.map((key, idx) => {
          return (
            <Accordion
              key={key}
              expanded={expanded[idx]}
              onChange={handleChange(idx)}
              className="meta-data-card__accordion"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className="meta-data-card__accordion-summary"
              >
                <Typography variant="subtitle1" className="meta-data-card__header">
                  {key}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="meta-data-card__accordion-details">
                <Typography variant="body1">{values[idx]}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}