import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabin").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin: any, id?: any){
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName: any = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  // let query = supabase.from("cabins");
  

const { data, error } : any = await supabase
.from('cabin')
.insert([
  { name: newCabin.name, max_capacity: newCabin.maxCapacity, regular_price: newCabin.regularPrice, discount: newCabin.discount, description: newCabin.description, image: imagePath },
])
.select()

if (error) {
  console.error(error);
  throw new Error("Cabins could not be loaded");
}

const { data: storageData, error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image)

  console.log("Upload ==> ", storageData, storageError)


  if (storageError) {
    await supabase.from("cabin").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

return data

}

export async function deleteCabin(id: string) {
  const { data, error } = await supabase.from("cabin").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}