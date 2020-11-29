import React from 'react';
import { Button } from 'reactstrap';


const Trigger = ({ triggerText, buttonRef, showResetModal }) => {
  return (
    <Button
      className="float-right" 
      color='primary'
      ref={buttonRef}
      onClick={showResetModal}
    >
      {triggerText}
    </Button>
  );
};
export default Trigger;
