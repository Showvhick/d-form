import { types } from "@proj/static";
import React, { ChangeEvent, ReactElement } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./styles.scss";

interface IProps {
  field: types.fieldTypes.IField;
  value?: types.fieldTypes.TFieldValue;
  isError?: boolean;
  onChange: (val: types.fieldTypes.TFieldValue) => void;
}

interface IFieldContainerProps {
  children: ReactElement;
}

function FieldContainer(props: IFieldContainerProps) {
  return <div className="field-container">{props.children}</div>;
}

export default function Field(props: IProps) {
  let { field } = props;

  const onChange = (value: types.fieldTypes.TFieldValue) => {
    props.onChange(value);
  };

  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string[] = [];
    if (props.value) {
      value =
        typeof props.value === "object" && Array.isArray(props.value)
          ? [...props.value].map((v) => v.toString())
          : [];
    }
    if (value.includes(event.target.value.toString())) {
      let valueIndex = value.findIndex(
        (v) => v === event.target.value.toString()
      );
      if (valueIndex > -1) {
        value.splice(valueIndex, 1);
      }
    } else {
      value.push(event.target.value.toString());
    }
    onChange(value);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      {field.type === types.fieldTypes.EFieldType.TEXT ? (
        <FieldContainer>
          <TextField
            id={field.id}
            label={field.label}
            error={props.isError}
            variant="outlined"
            value={props.value?.toString() || ""}
            required={field.mandatory}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value)
            }
          />
        </FieldContainer>
      ) : field.type === types.fieldTypes.EFieldType.TEXTAREA ? (
        <FieldContainer>
          <TextField
            id={field.id}
            multiline
            label={field.label}
            error={props.isError}
            variant="outlined"
            value={props.value?.toString() || ""}
            required={field.mandatory}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value)
            }
          />
        </FieldContainer>
      ) : field.type === types.fieldTypes.EFieldType.DROPDOWN ? (
        <FieldContainer>
          <FormControl fullWidth>
            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
            <Select
              labelId={`${field.id}-label`}
              id={field.id}
              error={props.isError}
              label={field.label}
              value={props.value?.toString() || ""}
              onChange={(e: SelectChangeEvent<string>) =>
                onChange(e.target.value)
              }
            >
              {field.options?.map((option, i) => {
                return (
                  <MenuItem
                    key={`${field.id}-option-${option.value}-${i}`}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </FieldContainer>
      ) : field.type === types.fieldTypes.EFieldType.SINGLE_CHOICE ? (
        <FieldContainer>
          <FormControl>
            <FormLabel id={`${field.id}-label`}>{field.label}</FormLabel>
            <RadioGroup
              aria-labelledby={`${field.id}-label`}
              name={field.id}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.value)
              }
              value={props.value?.toString() || ""}
            >
              {field.options?.map((option, i) => {
                return (
                  <FormControlLabel
                    key={`${field.id}-option-${option.value}-${i}`}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </FieldContainer>
      ) : field.type === types.fieldTypes.EFieldType.MULTIPLE_CHOICES ? (
        <FieldContainer>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">{field.label}</FormLabel>
            <FormGroup>
              {field.options?.map((option, i) => {
                return (
                  <FormControlLabel
                    key={`${field.id}-checkbox-${option.value}-${i}`}
                    control={
                      <Checkbox
                        checked={
                          props.value &&
                          typeof props.value === "object" &&
                          Array.isArray(props.value)
                            ? props.value.includes(option.value?.toString())
                            : false
                        }
                        value={option.value}
                        onChange={onChangeCheckbox}
                      />
                    }
                    label={option.label}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </FieldContainer>
      ) : null}
    </Box>
  );
}
