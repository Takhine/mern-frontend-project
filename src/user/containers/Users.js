import React from "react";
import UsersList from "../components/UsersList";

export default function Users() {
  const USERS = [
      {
          id: 'u1',
          name: 'Aniketh',
          image: 'https://images.pexels.com/photos/13313434/pexels-photo-13313434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          places: 3
      }
  ]; // dummy content

  return <UsersList items={USERS} />;
}
