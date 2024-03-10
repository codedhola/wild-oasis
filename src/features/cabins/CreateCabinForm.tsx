import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {

  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, getValues, formState} = useForm()
  
  const { errors } = formState

  console.log("Errors ==> ", errors)
  const { mutate, isPending } = useMutation({
    mutationKey: ['cabin'],
    mutationFn: createCabin,
    onSuccess: () => {
      console.log("FETCHED SUCESSFULLY")
      queryClient.invalidateQueries({ queryKey: ["cabin"]});
      reset()
    },
    onError: (err) => {
      console.log("AN ERROR OCCURED ==> ", err)
    }
  })
  const submitForm = (formData: any) => {
    mutate({...formData, image: formData.image[0]})
  }

  const onError = (err: any) => {
    console.log("Error Logging... ")
  }
  return (
    <Form onSubmit={handleSubmit(submitForm, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", { required: "Name is required"})} disabled={isPending} />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice"  {...register("regularPrice")} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })} defaultValue={0} />
      </FormRow>

      <FormRow label="Description For website" error={errors?.description?.message}>
        <Textarea type="number" id="description" {...register("description")} defaultValue="" />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow label="">
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Submit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
