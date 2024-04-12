import {
    Card,
    Avatar,
    Text,
    Group,
    Stack,
    Button,
    Anchor,
    Tooltip,
  } from "@mantine/core";
  import { IconTrash, IconStar, IconUserPlus } from "@tabler/icons-react";
  import { User } from "../types/types";
  
  import { IconAt } from "@tabler/icons-react";
  import { IconWorld } from "@tabler/icons-react";
  import { IconPhoneCall } from "@tabler/icons-react";
  import { IconUserMinus } from "@tabler/icons-react";
  
  interface UserCardProps {
    user: User;
    onDelete: (userId: number) => void;
    isFollowing: boolean;
    onFollow: (userId: number) => void;
  }
  
  const UserCard = ({ user, onDelete, isFollowing, onFollow }: UserCardProps) => {
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;
    const iconColor = "grey";
  
    return (
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group justify="center" align="center">
          <Anchor href={`http://${user.website}`} target="_blank">
            <Tooltip label={user.name} withArrow>
              <Avatar
                src={avatarUrl}
                alt={user.name}
                size="xl"
                style={{ width: "120px", height: "120px" }}
              />
            </Tooltip>
          </Anchor>
        </Group>
  
        <Text size={"18px"} fw={500} align="center" mt={"20px"}>
          {user.name} {isFollowing && <IconStar size={16} />}
        </Text>
  
        <Stack gap={"5px"} mt={"10px"}>
          <Group>
            <IconAt size={14} color={iconColor} style={{ marginRight: "0px" }} />
            <Anchor
              size="md"
              target="_blank"
              href={`mailto:${user.email}`}
              style={{ color: iconColor }}
            >
              {user.email}
            </Anchor>
          </Group>
          <Group>
            <IconPhoneCall size={14} color={iconColor} />
            <Anchor
              size="md"
              target="_blank"
              href={`tel:${user.phone}`}
              style={{ color: iconColor }}
            >
              {user.phone}
            </Anchor>
          </Group>
          <Group>
            <IconWorld size={14} color={iconColor} />
            <Anchor
              size="md"
              href={`http://${user.website}`}
              target="_blank"
              style={{ color: iconColor }}
            >
              {user.website}
            </Anchor>
          </Group>
        </Stack>
  
        <Group mt="md" justify="center" align="center" grow>
          <Button
            variant={isFollowing ? "outline" : "filled"}
            color={isFollowing ? "black" : "blue"}
            leftSection={
              isFollowing ? (
                <IconUserMinus size={16} />
              ) : (
                <IconUserPlus size={16} />
              )
            }
            onClick={() => onFollow(user.id)}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          <Button
            variant="outline"
            leftSection={<IconTrash size={16} />}
            onClick={() => onDelete(user.id)}
          >
            Delete
          </Button>
        </Group>
      </Card>
    );
  };
  
  export default UserCard;