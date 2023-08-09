import React from 'react'
import {
  ButtonBase,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
} from '@mui/material'
import { StorageAvatar } from '@gravis-os/storage'
import { Box, Stack, Typography } from '@gravis-os/ui'
import useUser from '@warehouse/app/useUser'
import NextLink from 'next/link'
import LogoutIcon from '@mui/icons-material/Logout'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { routes } from '@warehouse/app/routes'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

export interface DashboardLayoutAccountPopoverProps {}

const DashboardLayoutAccountPopover: React.FC<
  DashboardLayoutAccountPopoverProps
> = (props) => {
  const { user, logout } = useUser()

  const router = useRouter()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose()
      await logout()
      router.push('/').catch(console.error)
    } catch (err) {
      console.error(err)
      toast.error('Unable to logout.')
    }
  }

  const open = Boolean(anchorEl)
  const id = open ? 'dashboard-layout-account-popover' : undefined

  return (
    <>
      <ButtonBase
        onClick={handleClick}
        sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ textAlign: 'left' }}
        >
          <StorageAvatar
            size={40}
            src={user?.avatar_src}
            alt={user?.avatar_alt}
          />
          <div>
            <Typography variant="subtitle2" color="inherit">
              {user?.full_name || user?.email}
            </Typography>
            <Typography
              variant="caption"
              color="inherit"
              sx={{ lineHeight: 1, opacity: 0.75 }}
            >
              {user?.role?.title}
            </Typography>
          </div>
        </Stack>
      </ButtonBase>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <StorageAvatar
            src={user?.avatar_src}
            alt={user?.avatar_alt}
            size={40}
          >
            <AccountCircleOutlinedIcon fontSize="small" />
          </StorageAvatar>
          <Box sx={{ ml: 1 }}>
            <Typography variant="body1">
              {user?.full_name || user?.email}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user?.role?.title}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ my: 1 }}>
          <NextLink href={routes.HOME} passHref>
            <MenuItem component="a">
              <ListItemIcon>
                <SettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body1">Settings</Typography>}
              />
            </MenuItem>
          </NextLink>

          <Divider />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Logout</Typography>}
            />
          </MenuItem>
        </Box>
      </Popover>
    </>
  )
}

export default DashboardLayoutAccountPopover
