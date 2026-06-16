import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useQueryAll } from "~/lib/api/QueryAll";

interface CustomSelectQueryProps {
  onChange: (value: any) => void;
  labelID?: string;
  label?: string;
  value?: any;
  endpoint?: string;
  labelSelector?: string;
  secondaryLabelSelector?: string;
  valueSelector?: string;
}

export default function CustomeSelectQuery(props: CustomSelectQueryProps) {
  const { onChange, labelID, label, value, endpoint, labelSelector, secondaryLabelSelector, valueSelector } = props;
  const { All } = useQueryAll(endpoint || '');
  const { data } = All;
  const optionValues = (data || []).map((item: any) => String(valueSelector ? item[valueSelector] : item.id));
  const normalizedValue = value == null ? '' : String(value);
  const safeValue = optionValues.includes(normalizedValue) ? normalizedValue : '';
  return(
    <Stack spacing={1} sx={{ width: "100%" }}>
      <InputLabel
        id={labelID}
        sx={{ fontSize: 14, fontWeight: 600, color: 'text.secondary' }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={labelID}
        value={safeValue}
        onChange={onChange}
        size="small"
        fullWidth
        displayEmpty
        sx={{
          bgcolor: 'background.paper',
          '& .MuiSelect-select': { py: 1.1 },
        }}
        MenuProps={{
            sx: {
              borderRadius: 2,
              mt: 1,
              boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
            },
        }}
      >
        <MenuItem value="">
          <em>Seleccionar</em>
        </MenuItem>
        {data?.map((item: any) => (
          <MenuItem
            key={item.id}
            value={valueSelector ? item[valueSelector] : item.id}
            sx={{
              whiteSpace: 'normal',
              alignItems: 'flex-start',
              py: 1,
            }}
          >
            <Stack spacing={0.5} sx={{ lineHeight: 1.2 }}>
              {labelSelector ? (
                <span>
                  <strong>{labelSelector}:</strong> {item[labelSelector]}
                </span>
              ) : (
                "label"
              )}
              {secondaryLabelSelector && (
                <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: 12 }}>
                  {item[secondaryLabelSelector]}
                </span>
              )}
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </Stack>
  )
}