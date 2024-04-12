"use client";
import { Grid, Loader } from "@mantine/core";
import { useState, useEffect } from "react";
import { User } from "../types/types";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followingUsers, setFollowingUsers] = useState<number[]>([]);

  const handleDelete = (userId: number) => {
    const filteredUsers = users.filter((item) => item.id !== userId);
    setUsers(filteredUsers);
  };

  const handleFollow = (userId: number) => {
    if (followingUsers.includes(userId)) {
      setFollowingUsers(followingUsers.filter((id) => id !== userId));
    } else {
      setFollowingUsers([...followingUsers, userId]);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader color="cyan" size="xl" />
      ) : (
        <Grid justify="flex-start" align="flex-start" p={"lg"}>
          {users.map((user) => (
            <Grid.Col
              key={user.id}
              span={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
                xl: 3,
              }}
            >
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDelete}
                isFollowing={followingUsers.includes(user.id)}
                onFollow={handleFollow}
              />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default UserList;