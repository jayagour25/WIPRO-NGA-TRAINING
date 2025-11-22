import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  return (
    <div>
      <h2>User Details</h2>
      {!user ? <p>Loading...</p> : <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
};

export default UserDetails;
