import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSettings';

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings()
  const { isUpdating, updateSetting } = useUpdateSetting();
  
  if(isLoading) return <Spinner />

  const { min_booking_length, max_booking_length, max_guess_per_booking, breakfast_price } = settings;


  if (isUpdating) return <Spinner />;

  function handleUpdate(e: any, field: any) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' 
        defaultValue={min_booking_length} 
        onBlur={e => handleUpdate(e, 'min_booking_length')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights'
        defaultValue={max_booking_length}
        onBlur={e => handleUpdate(e, 'max_booking_length')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests'
        defaultValue={max_guess_per_booking}
        onBlur={e => handleUpdate(e, 'max_guess_per_booking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price'
        defaultValue={breakfast_price}
        onBlur={e => handleUpdate(e, 'breakfast_price')}
         />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
