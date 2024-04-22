import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return (
  <section>
    <Heading as="h1">Update hotel settings</Heading>
    <UpdateSettingsForm />
  </section>
  );
}

export default Settings;
