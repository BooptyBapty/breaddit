import React from 'react';
import { useParams } from 'react-router-dom'

function UserPage() {

    const { account } = useParams()

  return <div>
      {account}
  </div>;
}

export default UserPage;
