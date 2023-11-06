import React, { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule,
} from "devextreme-react/form";
import notify from "devextreme/ui/notify";
import LoadIndicator from "devextreme-react/load-indicator";

import "./CreateAccountForm.scss";
import { register } from "../../services/auth";
import { SingleCard } from "../../layouts";

export default function CreateAccountForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formData = useRef({
    // username: "Test ",
    // email: "test@gmail.com",
    // password: "12345678",
    // confirmedPassword: "12345678",
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const usernameEditorOptions = {
    stylingMode: "filled",
    placeholder: "Username",
    mode: "text",
  };
  const emailEditorOptions = {
    stylingMode: "filled",
    placeholder: "Email",
    mode: "email",
  };
  const passwordEditorOptions = {
    stylingMode: "filled",
    placeholder: "Password",
    mode: "password",
  };
  const confirmedPasswordEditorOptions = {
    stylingMode: "filled",
    placeholder: "Confirm Password",
    mode: "password",
  };

  const onSubmit = useCallback(
    async (e) => {
      setLoading(true);
      try {
        e.preventDefault();
        const { username, email, password } = formData.current;
        const data = {
          email,
          password,
          name: username,
        };
        const result = await register(data);
        setLoading(false);
        if (result.isOk) {
          notify(result.message, "success", 2000);
          navigate("/login");
        } else {
          notify(result.message, "error", 2000);
        }
      } catch (err) {
        setLoading(false);
        notify(err?.message, "error", 2000);
      }
    },
    [navigate]
  );

  const confirmPassword = useCallback(
    ({ value }) => value === formData.current.password,
    []
  );

  return (
    <SingleCard title="Sign Up">
      <form className={"create-account-form"} onSubmit={onSubmit}>
        <Form formData={formData.current} disabled={loading}>
          <Item
            dataField={"username"}
            editorType={"dxTextBox"}
            editorOptions={usernameEditorOptions}
          >
            <RequiredRule message="Username is required" />
            <Label visible={false} />
          </Item>
          <Item
            dataField={"email"}
            editorType={"dxTextBox"}
            editorOptions={emailEditorOptions}
          >
            <RequiredRule message="Email is required" />
            <EmailRule message="Email is invalid" />
            <Label visible={false} />
          </Item>
          <Item
            dataField={"password"}
            editorType={"dxTextBox"}
            editorOptions={passwordEditorOptions}
          >
            <RequiredRule message="Password is required" />
            <Label visible={false} />
          </Item>
          <Item
            dataField={"confirmedPassword"}
            editorType={"dxTextBox"}
            editorOptions={confirmedPasswordEditorOptions}
          >
            <RequiredRule message="Password is required" />
            <CustomRule
              message={"Passwords do not match"}
              validationCallback={confirmPassword}
            />
            <Label visible={false} />
          </Item>
          <Item>
            <div className="policy-info">
              By creating an account, you agree to the{" "}
              <Link
                target="_blank"
                to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                target="_blank"
                to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              >
                Privacy Policy
              </Link>
            </div>
          </Item>
          <ButtonItem>
            <ButtonOptions
              width={"100%"}
              type={"default"}
              useSubmitBehavior={true}
            >
              <span className="dx-button-text">
                {loading ? (
                  <LoadIndicator
                    width={"24px"}
                    height={"24px"}
                    visible={true}
                  />
                ) : (
                  "Create a new account"
                )}
              </span>
            </ButtonOptions>
          </ButtonItem>
          <Item>
            <div className={"login-link"}>
              Have an account? <Link to={"/login"}>Sign In</Link>
            </div>
          </Item>
        </Form>
      </form>
    </SingleCard>
  );
}
