import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { BasicMenuProps } from './model';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const BasicMenu = ({
  handleClickOpenDialog,
  handleClickOpenUpdate,
  setIsHovering,
}: BasicMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setIsHovering(false);
    setAnchorEl(null);
  };

  const handleTouch = (event: React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleUpdate = () => {
    handleClickOpenUpdate();
    handleClose();
  };

  const handleDelete = () => {
    handleClickOpenDialog();
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        onTouchEnd={handleTouch}
        aria-label="open"
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          zIndex: 2,
          transform: 'translateY(-50%)',
        }}
      >
        <MenuIcon fontSize="small" />
      </IconButton>
      {openMenu && (
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '10px',
              boxShadow: '0 0 20px #d4d4d4',
            },
          }}
        >
          <MenuItem>
            <IconButton onClick={handleUpdate} aria-label="edit">
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton onClick={handleDelete} aria-label="delete">
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default BasicMenu;
