import React from 'react';

export default function Spinner(props) {
  return (
    <div className="justify-center">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  );
}
