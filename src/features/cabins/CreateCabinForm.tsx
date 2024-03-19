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
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

type Props = {
  cabinToEdit: any
}

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {} }: Props) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;
  
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, getValues, formState} = useForm()
  
  const { errors } = formState
  const submitForm = (formData: any) => {
    console.log("Form Data ==> ", formData.image)
    const image = typeof formData.image === "string" ? formData.image : formData.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { image, name: formData.name, max_capacity: formData.maxCapacity, regular_price: formData.regularPrice, discount: formData.discount, description: formData.description }, id: editId },
        {
          onSuccess: (formData: any) => {
            reset();
          },
        }
      );
    else
      createCabin(
        { ...formData, image: image },
        {
          onSuccess: (formData: any) => {
            reset();
          },
        }
      );
  }

  const onError = (err: any) => {
    console.log("Error Logging... ")
  }
  return (
    <Form onSubmit={handleSubmit(submitForm, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", { required: "Name is required"})} disabled={isWorking} defaultValue={cabinToEdit.name} />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} defaultValue={cabinToEdit.max_capacity} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice"  {...register("regularPrice")} defaultValue={cabinToEdit.regular_price} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })} defaultValue={cabinToEdit.discount || 0} />
      </FormRow>

      <FormRow label="Description For website" error={errors?.description?.message}>
        <Textarea type="number" id="description" {...register("description")} defaultValue={cabinToEdit.description} />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image", {
            required: isEditSession ? false : "This field is required",
          })} />
      </FormRow>

      <FormRow label="">
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>Submit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
