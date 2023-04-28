import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { key } from "localforage";

export default function MetaDataCard({ keys, values }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {keys &&
        keys.map((key, idx) => {
          return (
            <Accordion
              expanded={expanded === key}
              onChange={handleChange(`${key}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {key}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{values[idx]}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}
