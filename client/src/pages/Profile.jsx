import { useNavigation, useOutletContext, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 50000) {
    toast.error("image too large");
    return null;
  }
  try {
    await customFetch.patch("users/update-user", formData);
    toast.success("Profile updated");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submiting";
  return (
    <div>
      <Wrapper>
        <Form method="post" className="form" encType="multipart/form-data">
          <h4 className="form-title">profile</h4>
          <div className="form-center">
            <div className="form-row">
              <label htmlFor="avatar" className="form-label">
                Select an image file (max 0.5MB)
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="form-input"
                accept="image/*"
              />
            </div>

            <FormRow type="text" name="name" defaultValue={name} />
            <FormRow type="text" name="lastName" defaultValue={lastName} />
            <FormRow type="email" name="email" defaultValue={email} />
            <FormRow type="text" name="location" defaultValue={location} />

            <button
              className="btn btn-block form-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting" : "submit"}
            </button>
          </div>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Profile;
