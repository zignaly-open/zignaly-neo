import React, { useState } from "react";
import { Box, CircularProgress, IconButton, SxProps, useTheme } from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import { LogoContainer } from "./styles";
import { ErrorMessage, ZigTypography } from "../../../index";
import ZigButton from "../ZigButton";
import ZigAlertMessage from "../../display/ZigAlertMessage";

export type ZigImageInputProps = {
  label?: string | JSX.Element;
  buttonLabel?: string | JSX.Element;
  description?: string | JSX.Element;
  info?: string | JSX.Element;
  value: string;
  buttonTooltip?: string;
  disabled?: boolean;
  size?: number;
  error?: string;
  onChange: (image: string) => void;
  renderer?: (image: string) => JSX.Element;
  uploadFn: (file: File) => Promise<string>;
  sx?: SxProps;
  id?: string;
};

const ZigImageInput = ({
  label,
  buttonLabel,
  description,
  value,
  info,
  size,
  onChange,
  renderer,
  disabled,
  buttonTooltip,
  error,
  uploadFn,
  id,
  sx,
}: ZigImageInputProps) => {
  const theme = useTheme();
  const [uploading, setUploading] = useState(false);

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      onChange(await uploadFn(file));
    } finally {
      setUploading(false);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      flexDirection="column"
      gap={1}
      sx={sx}
    >
      <Box>
        {!!label &&
          (typeof label === "string" ? (
            <ZigTypography component="p" variant={"body1"}>
              {label}
            </ZigTypography>
          ) : (
            label
          ))}

        {!!description &&
          (typeof description === "string" ? (
            <ZigTypography component="p" variant={"body2"}>
              {description}
            </ZigTypography>
          ) : (
            description
          ))}
      </Box>

      {!!value && (
        <LogoContainer>
          <Box sx={{ opacity: uploading ? 0.3 : 1 }}>
            {renderer ? renderer(value) : <img width={size} height={size} src={value} alt={""} />}
          </Box>

          {uploading ? (
            <CircularProgress size={24} />
          ) : (
            value && (
              <IconButton
                sx={{
                  transition: "background .25s",
                  background: theme.palette.neutral800,
                  "&:hover": {
                    background: theme.palette.neutral700,
                  },
                }}
                onClick={() => onChange("")}
              >
                <Close />
              </IconButton>
            )
          )}
        </LogoContainer>
      )}

      <Box>
        <ZigButton
          disabled={disabled}
          startIcon={<Edit sx={{ width: "12px", height: "12px" }} />}
          variant="text"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          component="label"
          tooltip={buttonTooltip}
          id={id && `${id}-edit`}
        >
          {buttonLabel}
          <input hidden type="file" onChange={uploadLogo} />
        </ZigButton>

        {error ? (
          <Box alignSelf="flex-start">
            <ErrorMessage text={error} id={id && `${id}-error`} />
          </Box>
        ) : (
          !!info && (typeof info === "string" ? <ZigAlertMessage text={info} /> : info)
        )}
      </Box>
    </Box>
  );
};

export default ZigImageInput;
