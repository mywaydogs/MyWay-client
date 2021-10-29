import { observer } from "mobx-react-lite";
import FormField from "../utils/forms/form-field.component";

const DogSelectField = observer(function DogSelectField({
  name,
  ...props
}: {
  name: string;
  placeholder?: string;
}) {
  return (
    <FormField name={name} as="select" {...props}>
      <option value="Low">נמוך/נמוכה</option>
      <option value="Medium">בינוני/ת</option>
      <option value="High">גבוה/ה</option>
    </FormField>
  );
});

export default DogSelectField;
