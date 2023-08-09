import React from 'react'
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { TransitionProps } from '@mui/material/transitions'
import useModalState from '@admin/hooks/useModalState'

export interface DialogButtonProps {
  title: string
  buttonProps?: ButtonProps
  actionButtonProps?: ButtonProps
  transitionProps?: TransitionProps
  dialogProps?: Partial<DialogProps>
  children?: React.ReactNode
  disableActions?: boolean
  renderTrigger?: ({ onClick }: { onClick: VoidFunction }) => React.ReactNode
  renderActions?: ({ onClose }: { onClose: VoidFunction }) => React.ReactNode
  onClose?: VoidFunction
}

const DialogButton: React.FC<DialogButtonProps> = (props) => {
  const {
    title,
    buttonProps,
    actionButtonProps,
    transitionProps,
    dialogProps,
    disableActions,
    children,
    renderTrigger,
    renderActions,
    onClose,
  } = props

  const [open, setOpen] = useModalState()
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    onClose?.()
  }

  return (
    <>
      {typeof renderTrigger === 'function' ? (
        renderTrigger({ onClick: handleOpen })
      ) : (
        <Button onClick={handleOpen} {...buttonProps}>
          {buttonProps?.children ?? title}
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Slide}
        TransitionProps={
          { direction: 'up', ...transitionProps } as TransitionProps
        }
        {...dialogProps}
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {title}
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
        {!disableActions && (
          <>
            <Divider />
            <DialogActions>
              {typeof renderActions === 'function' ? (
                renderActions({ onClose: handleClose })
              ) : (
                <>
                  <Button color="inherit" onClick={handleClose}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    {...actionButtonProps}
                    onClick={(event) => {
                      actionButtonProps?.onClick?.(event)
                      handleClose()
                    }}
                  >
                    {actionButtonProps?.children ?? 'Okay'}
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  )
}

export default DialogButton
