import { InputLabel, MenuItem, Select } from "@mui/material";
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
  return(
    <>
    <InputLabel id={labelID}>{label}</InputLabel>
      <Select
        labelId={labelID}
        value={value}
        onChange={onChange}
        
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {data?.map((item: any) => (
          <MenuItem key={item.id} value={valueSelector ? parseInt(item[valueSelector]) : item.id}>
            {labelSelector ? <><strong>{labelSelector}:</strong> {item[labelSelector]} </> : "label"}
            <br/>
            {secondaryLabelSelector && 
              item[secondaryLabelSelector]
            }
          </MenuItem>
        ))}

      </Select>
    </>
  )
}