import React from 'react';
import { Button } from 'reactstrap';


const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <Button
      className="float-right" 
      color='primary'
      ref={buttonRef}
      onClick={showModal}
    >
      {triggerText}
    </Button>
  );
};
export default Trigger;
