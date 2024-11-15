import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Deactivate access</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch("http://34.116.129.117:8000/profiles");
      const data = await response.json();

      // Transform the profiles data to match the listItems structure
      const transformedData = data.map((profile) => ({
        id: `INV-${Math.floor(Math.random() * 10000)}`,
        date: "Feb 3, 2023",
        status: "Active",
        customer: {
          initial: profile.first_name.charAt(0),
          name: `${profile.first_name} ${profile.last_name}`,
          email: profile.email || "no-email@provided.com",
        },
      }));

      setProfiles(transformedData);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {profiles.map((listItem) => (
        <List key={listItem.id} size="sm" sx={{ "--ListItem-paddingX": 0 }}>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <ListItemContent
              sx={{ display: "flex", gap: 2, alignItems: "start" }}
            >
              <ListItemDecorator>
                <Avatar size="sm">{listItem.customer.initial}</Avatar>
              </ListItemDecorator>
              <div>
                <Typography gutterBottom sx={{ fontWeight: 600 }}>
                  {listItem.customer.name}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  {listItem.customer.email}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">{listItem.date}</Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{listItem.id}</Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Link level="body-sm" component="button">
                    Download
                  </Link>
                  <RowMenu />
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  Active: <CheckRoundedIcon />,
                  Refunded: <AutorenewRoundedIcon />,
                  Cancelled: <BlockIcon />,
                }[listItem.status]
              }
              color={
                {
                  Active: "success",
                  Refunded: "neutral",
                  Cancelled: "danger",
                }[listItem.status]
              }
            >
              {listItem.status}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          py: 2,
        }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" sx={{ mx: "auto" }}>
          Page 1 of 10
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
