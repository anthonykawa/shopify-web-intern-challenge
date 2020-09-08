import React from "react";
import { Typography, Button } from "@material-ui/core";
import styled from "styled-components";

const Nominations = ({ nominations, removeNominee }) => {
  return (
    <div>
      <Typography variant="body1" component="h6">
        Nominations
      </Typography>
      <UL>
        {nominations.map((nomination) => {
          return (
            <li>
              {nomination[1]}
              <StyledButton
                disableElevation
                size="small"
                variant="contained"
              >
                <ButtonText
                  onClick={() =>
                    removeNominee(
                      nomination[0]
                    )
                  }
                  variant="button"
                  component="p"
                >
                  remove
                </ButtonText>
              </StyledButton>
            </li>
          );
        })}
      </UL>
    </div>
  );
};

const UL = styled.ul`
  li {
    margin-bottom: 5px;
  }

  li button {
    margin-left: 5px;
  }
`;

const StyledButton = styled(Button)`
  background-color: #f8f9fa;
  border: 1px solid rgb(73 73 73);
  padding: 0.5px;
`;

const ButtonText = styled(Typography)`
  font-size: 0.6rem;
`;

export default Nominations;
