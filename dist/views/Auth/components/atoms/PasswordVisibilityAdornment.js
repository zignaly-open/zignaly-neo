import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@zignaly-open/ui';
var PasswordVisibilityAdornment = function (_a) {
    var show = _a.show, onToggle = _a.onToggle;
    return (React.createElement(InputAdornment, { position: 'end' },
        React.createElement(IconButton, { "aria-label": 'Toggle password visibility', onClick: onToggle, icon: show ? (React.createElement(Visibility, { sx: { color: 'neutral200' } })) : (React.createElement(VisibilityOff, { sx: { color: 'neutral200' } })), variant: 'flat' })));
};
export default PasswordVisibilityAdornment;
//# sourceMappingURL=PasswordVisibilityAdornment.js.map