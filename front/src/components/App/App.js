import React from 'react';
import Btn from '../Btn/Btn';
const App = () => {
  const handleBtn = () => {
    console.log('from parent component');
  };

  return (
    <div>
      <Btn text='Valider' clicked={handleBtn} />
    </div>
  );
};

export default App;
